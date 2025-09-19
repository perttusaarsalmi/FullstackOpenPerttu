import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import blogService from '../services/blogs'

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
    <form onSubmit={handleSubmit}>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment here"
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
