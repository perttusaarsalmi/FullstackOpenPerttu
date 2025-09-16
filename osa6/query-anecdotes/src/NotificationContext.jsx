import { createContext, useReducer } from 'react'

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, '')

const setNotification = (message, seconds = 5) => {
    notificationDispatch({ type: 'SET', payload: message })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
