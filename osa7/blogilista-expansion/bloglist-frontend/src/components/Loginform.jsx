import Notification from './Notification'
import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {

  const notification = useSelector(state => state.notifications)
  return (
    <Form onSubmit={handleLogin}>
      <h2>Log into application</h2>
      {notification && <Notification notification={notification} />}
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <Button type="submit">login</Button>
    </Form>
  )
}

export default LoginForm
