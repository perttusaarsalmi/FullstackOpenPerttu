import blogService from '../services/blogs'

const BlogForm = ({

  setBlogs,
  useState,
  setNotificationMessage
}) => {
      const [newBlogTitle, setNewBlogTitle] = useState('')
      const [newBlogAuthor, setNewBlogAuthor] = useState('')
      const [newBlogUrl, setNewBlogUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }

    blogService
      .create(blogObject)
      .then(() => {
        blogService.getAll().then((updatedBlogs) => {
          setBlogs(updatedBlogs) // Refresh the blogs list
          setNotificationMessage(
            `a new blog ${newBlogTitle} by ${newBlogAuthor} added`
          )
          setNewBlogTitle('')
          setNewBlogAuthor('')
          setNewBlogUrl('')
        })
      })
      .catch((error) => {
        setNotificationMessage(
          error.response.data.error || error.response.data,
          true
        )
      })
  }

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title: <input value={newBlogTitle} onChange={handleBlogTitleChange} />
        </div>
        <div>
          author:{' '}
          <input value={newBlogAuthor} onChange={handleBlogAuthorChange} />
        </div>
        <div>
          url: <input value={newBlogUrl} onChange={handleBlogUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
