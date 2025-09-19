import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Button from './Button'
import blogService from '../services/blogs'
import { setBlogs, updateBlog } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((n) => n.id === id)

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.updateBlog(updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      blogService.deleteBlog(blog.id).then(() => {
        const updatedBlogs = blogs.filter((b) => b.id !== blog.id) // Remove the deleted blog
        dispatch(setBlogs(updatedBlogs))
        navigate('/')
      })
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}{' '}
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <div>
          likes {blog.likes}{' '}
          <Button onClick={() => handleLike(blog)} text="like" />
        </div>
        <div>added by {blog.user.name}</div>
        {blog.user.id === user.id && (
          <Button onClick={deleteBlog} text="remove" />
        )}
      </div>
    </div>
  )
}

export default Blog
