import { Navigate, Outlet } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"

// Verificando que el usuario este autenticado
export default function ProtectedRoute({ user, redirectPath = '/' }) {
  if (user != 'authenticated') {
    return <Navigate to={redirectPath} replace />
  }
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
