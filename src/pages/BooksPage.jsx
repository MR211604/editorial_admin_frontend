import { useState } from "react";
import Table from "../components/ui/table/Table";
import { usePublishings } from "../hooks/usePublishings";
import { useDebounce } from "../hooks/utils/useDebounce";

export default function BooksPage() {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000) // You can implement a debounce hook if needed

  const { allPublishings, isAllPublishingsLoading } = usePublishings(pagination.pageIndex + 1, pagination.pageSize, 2, sorting, debouncedSearch);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  const booksColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Titulo',
      accessorKey: 'title',
    },
    {
      header: 'Autor',
      accessorKey: 'author',
    },
    {
      header: 'ISBN',
      accessorKey: 'isbn',
    },
    {
      header: 'Año y Pag',
      accessorKey: 'year_and_pages',
    },
    {
      header: 'Operaciones',
      accessorKey: 'operations',
      cell: ({ row }) => (
        <div id={row.id} className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => console.log(row)}>Editar</button>
          <button className="btn btn-danger btn-sm">Eliminar</button>
        </div>
      ),
      enableSorting: false,
    }
  ]

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

          <Table paginatedTableData={allPublishings} columns={booksColumns} pagination={pagination} setPagination={setPagination} isTableDataLoading={isAllPublishingsLoading} sorting={sorting} setSorting={setSorting} setSearch={setSearch} />
        </div>


      </div>
    </>
  )
}
