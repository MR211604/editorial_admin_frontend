import { useContext } from "react";
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { env } from "../config/env";

export default function Navbar() {
  const {
    auth: { name },
    logout,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <BootstrapNavbar
      expand="lg"
      className="custom-navbar shadow-lg"
      sticky="top"
    >
      <Container fluid>
        <BootstrapNavbar.Brand
          href={`${env.BASE_URL}dashboard`}
          className="fw-bold text-white"
        >
          <img
            src="https://i.imgur.com/Cm2nr2f.png"
            alt="logo editorial udb"
            className="me-2"
          />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          className="bg-light"
        />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              align="end"
              title={
                <span className="d-inline-flex align-items-center">
                  <i className="bi bi-person-circle pe-2"></i>
                  {name}
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={handleLogout}
                className="logout-btn"
                style={{ background: "none", color: "#000" }}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
