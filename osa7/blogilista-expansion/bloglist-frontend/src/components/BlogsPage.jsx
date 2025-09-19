import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { addNewBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogsPage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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
      <Togglable buttonLabel="create new blog">
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default BlogsPage
