import {useNavigate, Outlet, Navigate} from 'react-router-dom'
import {auth} from '../firebase.js'

const ProtectedRoute = ({user, children}) => {
  if (user === null) {
    return <Navigate to='/login' replace />
  }

  return children ? children : <Outlet />


}

export default ProtectedRoute
