import { useEffect, useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import UserItem from './UserItem'

function UserResults() {
  const { users, loading } = useContext(GithubContext)

  useEffect(() => {

  }, [])
  if (loading)
    return <h1>Loading . . . </h1>
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg_grid-cols-3 md:grid-cols-2">
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserResults