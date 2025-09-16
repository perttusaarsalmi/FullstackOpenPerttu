import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  const getResult = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () =>
      axios.get('http://localhost:3002/anecdotes').then((res) => res.data),
    retry: false,
  })

  const voteMutation = useMutation({
    mutationFn: (anecdote) =>
      axios
        .put(`http://localhost:3002/anecdotes/${anecdote.id}`, {
          ...anecdote,
          votes: anecdote.votes + 1,
        })
        .then((res) => res.data),
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) =>
        oldData.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
      )
    },
  })

  if (getResult.isLoading) {
    return <div>loading data...</div>
  }

  if (getResult.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = getResult.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
