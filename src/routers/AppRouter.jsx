import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import AuthorsPage from '../pages/AuthorsPage';
import BooksPage from '../pages/BooksPage';
import Dashboard from '../pages/Dashboard';
import RolPage from '../pages/RolPage';
import UserAccountsPage from '../pages/UserAccountsPage';
import LoginPage from '../pages/auth/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import CreateAuthor from '../pages/authors/CreateAuthor';

export default function AppRouter() {

  const { auth, verifyToken } = useContext(AuthContext)

  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  if (auth.checking) {
    return (
      <div className="d-flex items-center justify-center min-h-screen">
        <div></div>
      </div>
    )
  }
  console.log("Auth Context:", auth)
  const isAuthenticated = auth.logged

  return (
    <Routes>
      <Route
        path='/*'
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
      <Route path='/login' element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path='/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated} redirectPath='/login' />}>
        <Route index element={<Dashboard />} />
        <Route path='authors' element={<AuthorsPage />}>
          <Route path='create' element={<CreateAuthor />} />
          <Route path='edit/:id' element={<div>Editar Autor</div>} />
        </Route>
        <Route path='books' element={<BooksPage />} />
        <Route path='magazines' element={<BooksPage />} />
        <Route path='userAccounts' element={<UserAccountsPage />} />
        <Route path='categories' element={<BooksPage />} />
        <Route path='rol' element={<RolPage />} />
        <Route path='privileges' element={<BooksPage />} />
      </Route>


    </Routes>
  )
}
