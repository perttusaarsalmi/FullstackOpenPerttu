import axios from 'axios'

const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (anecdote) => {
  const object = { ...anecdote, votes: anecdote.votes }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, object)
  return response.data
}

export default { createNew, getAll, update }