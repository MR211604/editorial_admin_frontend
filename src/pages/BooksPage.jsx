import { BookColumns } from "../components/books/BookColumns";
import Table from "../components/ui/table/Table";
import { usePublishingsPage } from "./hooks/usePublishingsPage";

export default function BooksPage() {

  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,

    // Datos
    allPublishings,
    isAllPublishingsLoading,
    // selectedPublishing,

    // Modal handlers
    // isModalOpen,
    // closeModal,

    // Handlers específicos
    searchHandler,
  } = usePublishingsPage(1)


  const bookColumns = BookColumns()

  return (
    <>
      <h1>Libros</h1>
      <hr />
      <p>Aqui puedes encontrar una lista de todos los libros disponibles.</p>

      <div className="card">
        <div className="card-header">
          Listado de Libros
        </div>

        <div className="card-body">

          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-success">Agregar nuevo Libro</button>
          </div>

          <div className="d-flex align-items-center pb-3">
            <span className="fs-5 fw-bold">Categoria</span>
            <select className="form-select form-select-md w-50 ms-2">
              <option value={""}>Todas las categorias</option>
              <optgroup label="Coleccion institucional">
                <option value="1">One</option>
                <option value="2">Two</option>
              </optgroup>
              <option value="3">Four</option>
            </select>
            <input type="text" className="form-control form-control-md mx-2" placeholder="Buscar libro..." value={search} onChange={searchHandler} />
            {/* <button className="btn btn-primary ms-auto">Buscar</button> */}
          </div>

          <Table paginatedTableData={allPublishings} columns={bookColumns} pagination={pagination} setPagination={setPagination} isTableDataLoading={isAllPublishingsLoading} sorting={sorting} setSorting={setSorting} setSearch={setSearch} />
        </div>


      </div>
    </>
  )
}
