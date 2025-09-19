import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

    const blogStyle = {
      marginTop: 10,
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }

  // const handleLike = async (blog) => {
  //   const updatedBlog = { ...blog, likes: blog.likes + 1 }
  //   await blogService.updateBlog(updatedBlog)
  //   dispatch(updateBlog(updatedBlog))
  // }

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          // <Blog key={blog.id} blog={blog} onLike={handleLike} />
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
