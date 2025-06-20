import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import AuthorsPage from '../pages/AuthorsPage';
import BooksPage from '../pages/BooksPage';

export default function AppRouter() {

  const user = 'authenticated';

  return (
    <Routes>
      <Route path='/dashboard' element={<ProtectedRoute user={user} />}>
        <Route index element={<Dashboard />} />
        <Route path='authors' element={<AuthorsPage />} />
        <Route path='books' element={<BooksPage />} />
      </Route>

    </Routes>
  )
}
