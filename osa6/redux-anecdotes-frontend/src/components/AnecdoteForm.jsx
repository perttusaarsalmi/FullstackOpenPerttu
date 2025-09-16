import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (content) => {
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created "${content}"`))
    setTimeout(() => {
      dispatch(clearNotification(''))
    }, 5000)
  }

  const handleCreateAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)
    addAnecdote(newAnecdote.content)
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input name="anecdote" placeholder="create new anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
