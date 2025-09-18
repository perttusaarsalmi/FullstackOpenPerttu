const Notification = ({ notification }) => {
  console.log('Notification:', notification)
  if (!notification || notification.message === '') return null
  return (
    <div className={notification.isError ? "notification errorMessage" : "notification successMessage"}>
      {notification.message}
    </div>
  )
}
export default Notification
