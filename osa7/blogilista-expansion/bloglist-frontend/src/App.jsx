import { useDispatch, useSelector } from 'react-redux'
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
import { setNotificationWithTimeout } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notifications)

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
      const decodedToken = JSON.parse(atob(user.token.split('.')[1]))
      const userWithId = { ...user, id: decodedToken.id }

      window.localStorage.setItem(
        'loggedNoteappUser',
        JSON.stringify(userWithId)
      )
      blogService.setToken(user.token)
      setUser(userWithId)
      setUsername('')
      setPassword('')
    } catch {
      dispatch(setNotificationWithTimeout('wrong credentials', true, 5))
    }
  }

  const logoutUser = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload()
  }

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.updateBlog(updatedBlog)
    const updatedBlogs = blogs.map((b) =>
      b.id === updatedBlog.id ? updatedBlog : b
    )
    setBlogs(updatedBlogs)
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
      .then(() => {
        blogService.getAll().then((updatedBlogs) => {
          setBlogs(updatedBlogs)
          dispatch(
            setNotificationWithTimeout(
              `a new blog ${newBlogTitle} by ${newBlogAuthor} added`,
              false,
              5
            )
          )
        })
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
              <BlogForm addBlog={addBlog}></BlogForm>
            </Togglable>
          </div>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                user={user}
                onLike={handleLike}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
