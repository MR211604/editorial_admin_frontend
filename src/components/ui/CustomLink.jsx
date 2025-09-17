import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function CustomLink({ to, children, icon, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const exactRoutes = ["/dashboard"];
  const shouldBeExact = exactRoutes.includes(to);

  const isActive = useMatch({
    path: shouldBeExact ? resolvedPath.pathname : `${resolvedPath.pathname}/*`,
    end: shouldBeExact,
  });

  const { "data-tooltip": tooltip, ...linkProps } = props;

  return (
    <Nav.Item
      className="nav-item"
      id={`link-${to.replace("/", "-")}`}
      data-tooltip={tooltip}
      style={{ position: "relative" }}
    >
      <Nav.Link
        as={Link}
        to={to}
        {...linkProps}
        className={isActive ? "active-link" : ""}
      >
        <i className={`bi ${icon} me-2`}></i>
        {children}
      </Nav.Link>
    </Nav.Item>
  );
}
