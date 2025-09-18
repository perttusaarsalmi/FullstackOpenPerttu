import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => state.notifications)
  if (!notification || notification.message === '') return null
  return (
    <div className={notification.isError ? "notification errorMessage" : "notification successMessage"}>
      {notification.message}
    </div>
  )
}
export default Notification
