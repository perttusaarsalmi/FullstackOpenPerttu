import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'
import BlogsPage from './components/BlogsPage'
import UsersPage from './components/UsersPage'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import User from './components/User'
import { setUsers } from './reducers/userListReducer'
import userService from './services/users'
import Blog from './components/Blog'
import { Button, Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notifications)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService.getAll().then((users) => {
      dispatch(setUsers(users))
    })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      const decodedToken = JSON.parse(atob(user.token.split('.')[1]))
      const userWithId = {
        ...user,
        id: decodedToken.id,
        blogs: user.blogs || [],
      }

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(userWithId)
      )
      blogService.setToken(user.token)
      dispatch(setUser(userWithId))
      setUsername('')
      setPassword('')
    } catch {
      dispatch(setNotificationWithTimeout('wrong credentials', true, 5))
    }
  }

  const logoutUser = async () => {
    dispatch(clearUser())
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload()
  }

  return (
    <Router>
      <div className="container">
        {!user && (
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        )}
        {user && (
          <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginLeft: '8px' }}  />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/">
                    blogs
                  </Nav.Link>
                  <Nav.Link as={Link} to="/users">
                    users
                  </Nav.Link>
                  <Nav.Link
                    as="span"
                    style={{ color: 'white', marginRight: '10px' }}
                  >
                    {user.name} logged in
                  </Nav.Link>
                  <Button
                    id="logoutButton"
                    className="logout-button"
                    variant="secondary"
                    onClick={() => logoutUser()}
                  >
                    logout
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <h1>blog app</h1>
            {notification && <Notification />}
            <Routes>
              <Route path="/" element={<BlogsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />}></Route>
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
