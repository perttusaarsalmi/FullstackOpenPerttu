import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find((a) => a.id === id)
      if (anecdote) {
        anecdote.votes += 1
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    replaceAnecdote(state, action) {
      const updated = action.payload
      return state.map((a) => (a.id === updated.id ? updated : a))
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.update(anecdote)
    dispatch(voteAnecdote(updated))
    dispatch(replaceAnecdote(updated))
  }
}

export const { appendAnecdote, replaceAnecdote, setAnecdotes, voteAnecdote } =
  anecdoteSlice.actions

export default anecdoteSlice.reducer
