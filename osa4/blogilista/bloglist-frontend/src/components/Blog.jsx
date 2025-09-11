import Button from './Button'
import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateBlogLikes = () => {
    const updatedBlog = { ...blog, likes: likes + 1 } // Create a new object with updated likes
    blogService.update(updatedBlog).then(() => {
      setLikes(likes + 1) // Update the local state to trigger re-render
    })
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}{' '}
        <Button onClick={() => toggleVisibility()} text={'view'}></Button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}{' '}
          <Button onClick={toggleVisibility} text={'hide'}></Button>
        </div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <div>
          {likes} <Button onClick={updateBlogLikes} text={'like'}></Button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
