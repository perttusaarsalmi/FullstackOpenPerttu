import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', isError: false },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
       return { message: '', isError: false }
    },
  },
})

let timeoutId

export const setNotificationWithTimeout = (message, isError, seconds) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotification({ message, isError }))
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer


