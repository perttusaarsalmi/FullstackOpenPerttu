import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  if (!notification || notification.message === '') return null

  const variant = notification.isError ? 'danger' : 'success'

  return (
    <Alert variant={variant}>{notification.message}</Alert>
  )
}

export default Notification
