import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import AuthorsPage from "../pages/AuthorsPage";
import BooksPage from "../pages/BooksPage";
import CategoriesPage from "../pages/CategoriesPage";
import Dashboard from "../pages/Dashboard";
import MagazinesPage from "../pages/MagazinesPage";
import RolPage from "../pages/RolPage";
import UserAccountsPage from "../pages/UserAccountsPage";
import LoginPage from "../pages/auth/LoginPage";
import BookUpdate from "../pages/books/BookUpdate";
import CategoryUpdate from "../pages/categories/CategoryUpdate";
import MagazineArticles from "../pages/magazines/MagazineArticles";
import MagazineUpdate from "../pages/magazines/MagazineUpdate";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  const { auth, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (auth.checking) {
    return (
      <div className="d-flex items-center justify-center min-h-screen">
        <div></div>
      </div>
    );
  }
  console.log("Auth Context:", auth);
  const isAuthenticated = auth.logged;

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="authors" element={<AuthorsPage />} />

        <Route path="books">
          <Route index element={<BooksPage />} />
          <Route path="edit/:id" element={<BookUpdate />} />
        </Route>
        <Route path="magazines">
          <Route index element={<MagazinesPage />} />
          <Route path="edit/:id" element={<MagazineUpdate />} />
          <Route path="articles/:id" element={<MagazineArticles />} />
        </Route>

        {/* Los editores de publicaciones no pueden entrar a la seccion de categorias */}
        {auth.rol === "Editor de publicaciones" ? null : (
          <Route path="categories">
            <Route index element={<CategoriesPage />} />
            <Route path="edit/:id" element={<CategoryUpdate />} />
          </Route>
        )}

        {/* Los gestores y editores no pueden entrar a estas rutas */}
        {auth.rol === "Gestor de Publicaciones" ||
        auth.rol === "Editor de Publicaciones" ? null : (
          <>
            <Route path="userAccounts" element={<UserAccountsPage />} />
            <Route path="rol" element={<RolPage />} />
          </>
        )}
      </Route>
    </Routes>
  );
}
