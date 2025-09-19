import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await blogService.commentBlog(blog.id, comment)
    dispatch(updateBlog(result))
    setComment('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment here"
      />
      <Button type="submit">add comment</Button>
    </Form>
  )
}

export default CommentForm
