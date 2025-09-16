import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

let timeoutId

export const setNotificationWithTimeout = (message, seconds) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotification(message))
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer


