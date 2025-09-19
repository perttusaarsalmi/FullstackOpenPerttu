import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import userService from '../services/users'

const UsersPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

return (
  <div>
    <h2>Users</h2>
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)
}

export default UsersPage
