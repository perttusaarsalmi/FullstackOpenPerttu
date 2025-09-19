import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Button from './components/Button'
import Notification from './components/Notification'
import LoginForm from './components/Loginform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { setBlogs, addNewBlog } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'
import BlogList from './components/BlogList'

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      const decodedToken = JSON.parse(atob(user.token.split('.')[1]))
      const userWithId = { ...user, id: decodedToken.id }

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



  const addBlog = (event, newBlogTitle, newBlogAuthor, newBlogUrl) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }

    blogService
      .createBlog(blogObject)
      .then((createdBlog) => {
        dispatch(addNewBlog({ ...createdBlog, user }))
        dispatch(
          setNotificationWithTimeout(
            `a new blog ${newBlogTitle} by ${newBlogAuthor} added`,
            false,
            5
          )
        )
      })
      .catch((error) => {
        dispatch(
          setNotificationWithTimeout(
            error.response.data.error || error.response.data,
            true,
            5
          )
        )
      })
  }

  return (
    <div>
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
          <h2>blogs</h2>
          {notification && <Notification/>}
          <div>
            {`${user.name} logged in`}{' '}
            <Button
              id="logoutButton"
              text={'logout'}
              onClick={() => logoutUser()}
            ></Button>
            <Togglable buttonLabel="create new blog">
              <BlogForm addBlog={addBlog}></BlogForm>
            </Togglable>
          </div>
          <BlogList></BlogList>
        </div>
      )}
    </div>
  )
}

export default App
