import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import blogService from '../services/blogs'
import { updateBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.updateBlog(updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} onLike={handleLike} />
        ))}
    </div>
  )
}

export default BlogList
