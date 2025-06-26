import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import AuthorsPage from '../pages/AuthorsPage';
import BooksPage from '../pages/BooksPage';
import LoginPage from '../pages/LoginPage';

export default function AppRouter() {

  const user = 'authenticated';

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/dashboard' element={<ProtectedRoute user={user} redirectPath='/login' />}>
        <Route index element={<Dashboard />} />
        <Route path='authors' element={<AuthorsPage />} />
        <Route path='books' element={<BooksPage />} />
      </Route>
    </Routes>
  )
}
