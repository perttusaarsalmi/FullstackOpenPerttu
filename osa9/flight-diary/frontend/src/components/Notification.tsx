const Notification = (props: { notification: { text: string | null } }) => {
  if (props.notification.text === null) {
    return null;
  }
  return <div className="notification errorMessage">{props.notification.text}</div>;
};

export default Notification;