import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hoooks/useAuthStatus';
import Spinner from './Spinner'
export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />
  }
  return loggedIn ? <Outlet /> : < Navigate to={'/sign-in'} />
}
