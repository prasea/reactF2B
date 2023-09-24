import { useContext, useEffect } from 'react'
import GithubContext from '../../context/github/GithubContext'
import { useParams } from 'react-router-dom'
function User() {
  const { user } = useContext(GithubContext)
  const params = useParams();
  const { fetchUser } = useContext(GithubContext)
  useEffect(() => {
    fetchUser(params.login)
  }, [])
  return (
    <>
      {user.login}
    </>
  )
}

export default User