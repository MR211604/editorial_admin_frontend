import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function CustomLink({ to, children, icon, ...props }) {

  const resolvedPath = useResolvedPath(to);
  const exactRoutes = ['/dashboard'];
  const shouldBeExact = exactRoutes.includes(to);

  const isActive = useMatch({
    path: shouldBeExact ? resolvedPath.pathname : `${resolvedPath.pathname}/*`,
    end: shouldBeExact
  });
  return (
    <li className='nav-item' id={`link-${to.replace('/', '-')}`} {...props}>
      <Link className={`nav-link ${isActive ? 'bg-primary text-white' : ''}`} to={to} {...props}>
        <i className={`bi ${icon} me-2`}></i>
        {children}
      </Link>
    </li>
  )
}
