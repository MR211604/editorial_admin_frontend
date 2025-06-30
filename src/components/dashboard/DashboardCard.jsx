import CardButton from "./CardButton";

export default function DashboardCard({ 
  className, 
  title, 
  count, 
  buttonText, 
  children, 
  icon,
  buttonComponent 
}) {
  const ButtonComponent = buttonComponent || CardButton;
  
  return (
    <div className={`card ${className}`} style={{ width: "18rem" }}>
      <div className="card-body d-flex flex-column justify-content-between">
        <div className='d-flex flex-row justify-content-between align-items-center mb-3'>
          {icon}
          <div className='d-flex flex-column align-items-center'>
            <h1 className="card-title">{count}</h1>
            <p className="card-text">{title}</p>
          </div>
        </div>
        {/* Si se proporciona buttonComponent, renderizarlo con children, sino usar el botón por defecto */}
        {buttonComponent ? (
          children
        ) : (
          <ButtonComponent className="btn-primary" href="#">
            {`${buttonText || "Ver más"}`}
          </ButtonComponent>
        )}
      </div>
    </div>
  )
}
