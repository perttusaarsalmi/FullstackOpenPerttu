import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'VOTE', payload: id })
  }

  const addAnecdote = (content) => {
    dispatch({ type: 'NEW_ANECDOTE', payload: content })
  }

  const handleCreateAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    addAnecdote(content)
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
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

export default App
