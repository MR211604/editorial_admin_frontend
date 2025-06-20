import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function CustomLink({ to, children, icon, activeIcon, ...props }) {

  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className='nav-item' {...props}>
      <Link className={`nav-link ${isActive ? 'bg-primary text-white' : ''}`} to={to} {...props}>
        <i className={`bi ${isActive ? activeIcon : icon} me-2`}></i>
        {children}
      </Link>
    </li>
  )
}
