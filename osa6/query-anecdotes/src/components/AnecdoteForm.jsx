import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import axios from 'axios'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notification, setNotification } = useContext(NotificationContext)

  const createAnecdote = async (newAnecdote) => {
    if (newAnecdote.content.trim().length < 5) {
      throw new Error('too short anecdote, must have length 5 or more')
    }

    const response = await axios.post(
      'http://localhost:3002/anecdotes',
      newAnecdote
    )
    return response.data
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`Anecdote "${data.content}" created`)
    },
    onError: (error) => {
      setNotification(error.message)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
