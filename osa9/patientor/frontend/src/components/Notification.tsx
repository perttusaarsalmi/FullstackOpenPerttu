const notificationStyle = {
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
  color: 'red',
};

const Notification = (props: { notification: { text: string | null } }) => {
  if (props.notification.text === null) {
    return null;
  }
  return (
    <div style={notificationStyle} className="notification errorMessage">{props.notification.text}</div>
  );
};

export default Notification;
