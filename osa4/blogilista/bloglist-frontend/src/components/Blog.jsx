import Button from './Button'
import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
        <div>{blog.url}</div>
        <div>{blog.likes} <Button text={'like'}></Button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
