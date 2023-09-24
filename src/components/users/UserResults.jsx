import { useEffect, useState } from 'react'
import UserItem from './UserItem'

function UserResults() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
        headers: {
          Authorization: 'token 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'
        }
      });
      const data = await response.json();
      setUsers(data)
      setLoading(false)
    }
    fetchUsers();
  }, [])
  if (loading)
    return <h1>Loading . . . </h1>
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg_grid-cols-3 md:grid-cols-2">
      {users.map(user => (
        <UserItem user={user} />
      ))}
    </div>
  )
}

export default UserResults