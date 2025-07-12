export default function ToolBar({
  onCreateClick,
  search,
  onSearchChange,
  createButtonText = "Agregar nuevo",
  searchPlaceholder = "Buscar..."
}) {
  return (
    <div className="d-flex flex-row pb-4">
      <button className='btn btn-success' onClick={onCreateClick}>
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
  );
}