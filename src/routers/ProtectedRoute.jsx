import { Navigate, Outlet } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"

// Verificando que el usuario este autenticado
export default function ProtectedRoute({ isAuthenticated, redirectPath = '/' }) {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
