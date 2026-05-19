import { Navigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"
import Spinner from "../components/ui/Spinner"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Spinner fullScreen/>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute