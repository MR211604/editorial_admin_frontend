import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { AuthContext } from "../context/authContext";
import CustomLink from "./ui/CustomLink";

export default function Sidebar() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="sidebar-inner">
      <Nav className="flex-column text-left lh-lg">
        <CustomLink to="/dashboard" icon="bi-house-door" data-tooltip="Inicio">
          Inicio
        </CustomLink>

        <CustomLink to="/dashboard/books" icon="bi-book" data-tooltip="Libros">
          Libros
        </CustomLink>

        <CustomLink
          to="/dashboard/magazines"
          icon="bi-journal"
          data-tooltip="Revistas"
        >
          Revistas
        </CustomLink>

        <CustomLink
          to="/dashboard/authors"
          icon="bi-person"
          data-tooltip="Autores"
        >
          Autores
        </CustomLink>

        {auth.rol === "Editor de Publicaciones" ? null : (
          <CustomLink
            to="/dashboard/categories"
            icon="bi-list-check"
            data-tooltip="Categorías"
          >
            Categorías
          </CustomLink>
        )}

        {auth.rol === "Gestor de Publicaciones" ||
        auth.rol === "Editor de Publicaciones" ? null : (
          <>
            <CustomLink
              to="/dashboard/userAccounts"
              icon="bi-person-circle"
              data-tooltip="Cuentas de usuario"
            >
              Usuarios
            </CustomLink>

            <CustomLink
              to="/dashboard/rol"
              icon="bi-menu-app"
              data-tooltip="Roles"
            >
              Roles
            </CustomLink>

            <CustomLink
              to="/dashboard/emails"
              icon="bi bi-envelope"
              data-tooltip="Correos"
            >
              Correos
            </CustomLink>

            <CustomLink
              to="/dashboard/banner"
              icon="bi-card-image"
              data-tooltip="Libros"
            >
              Banner
            </CustomLink>
          </>
        )}
      </Nav>
    </div>
  );
}
