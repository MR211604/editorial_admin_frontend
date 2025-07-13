
export default function CardButton({ className, href, children, ...props }) {
  return (
    <a href={href} className={`btn ${className}`} {...props}>{children}</a>
  )
}
