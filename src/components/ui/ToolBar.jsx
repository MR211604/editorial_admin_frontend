export default function ToolBar({
  onCreateClick,
  search,
  onSearchChange,
  createButtonText = "Agregar nuevo",
  searchPlaceholder = "Buscar...",
  hasSelect = false,
  selectName = "Categoria",
  children
}) {
  return (
    <>
      {
        hasSelect ? (
          <>
            <div className="d-flex align-items-center mb-3">
              <button className="btn btn-success" onClick={() => onCreateClick()}>{createButtonText}</button>
            </div>
            <div className="d-flex align-items-center pb-3">
              <span className="fs-5 fw-bold">{selectName}</span>
              {children}
              <input
                type="text"
                className="form-control form-control-md mx-2"
                placeholder={searchPlaceholder}
                value={search}
                onChange={onSearchChange}
              />
            </div>
          </>
        ) : (
          <div className="d-flex flex-row pb-4">
            <button className='btn btn-success' onClick={() => onCreateClick()}>
              {createButtonText}
            </button>
            <input
              type="text"
              className="d-flex justify-content-end w-50 form-control form-control-md ms-auto"
              placeholder={searchPlaceholder}
              value={search}
              onChange={onSearchChange}
            />
          </div>
        )
      }
    </>
  );
}