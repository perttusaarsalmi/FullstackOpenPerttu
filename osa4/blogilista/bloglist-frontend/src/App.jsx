import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Button from './components/Button'
import Notification from './components/Notification'
import LoginForm from './components/Loginform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notification, setNotification] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotificationMessage('wrong credentials', true)
    }
  }

  const logoutUser = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload()
  }

  const setNotificationMessage = (message, isError) => {
    setNotification({ text: message, isError: isError })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
          notification={notification}
        />
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          {notification && <Notification notification={notification} />}
          <div>
            {`${user.name} logged in`}{' '}
            <Button
              id="logoutButton"
              text={'logout'}
              onClick={() => logoutUser()}
            ></Button>
            <Togglable buttonLabel="create new blog">
              <BlogForm
                setBlogs={setBlogs}
                useState={useState}
                setNotificationMessage={setNotificationMessage}
              ></BlogForm>
            </Togglable>
          </div>
          {blogs
            .filter((blog) => blog.user.username === user.username)
            .sort((a, b) => b.likes - a.likes) // Sort blogs by likes in descending order
            .map((blog) => (
              <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
            ))}
        </div>
      )}
    </div>
  )
}

export default App
