
export default function BooksPage() {
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
              <option selected>Todas las categorias</option>
              <optgroup label="Coleccion institucional">
                <option value="1">One</option>
                <option value="2">Two</option>
              </optgroup>
              <option value="3">Four</option>
            </select>
            <input type="text" className="form-control form-control-md mx-2" placeholder="Buscar libro..." />
            <button className="btn btn-primary ms-auto">Buscar</button>
          </div>

          <table className="table table-hover table-bordered table-striped">
            <thead>
              <tr className='table-primary'>
                <th scope="col">ID</th>
                <th scope="col">Titulo</th>
                <th scope="col">Autor</th>
                <th scope="col">ISBN</th>
                <th scope="col">Año y Pag</th>
                <th scope="col">Operaciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td className="d-flex justify-content-center">
                  <button className="btn btn-sm btn-primary me-2">Editar</button>
                  <button className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td className="d-flex justify-content-center">
                  <button className="btn btn-sm btn-primary me-2">Editar</button>
                  <button className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td className="d-flex justify-content-center">
                  <button className="btn btn-sm btn-primary me-2">Editar</button>
                  <button className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td className="d-flex justify-content-center">
                  <button className="btn btn-sm btn-primary me-2">Editar</button>
                  <button className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className='table-primary'>
                <th scope="col">ID</th>
                <th scope="col">Titulo</th>
                <th scope="col">Autor</th>
                <th scope="col">ISBN</th>
                <th scope="col">Año y Pag</th>
                <th scope="col">Operaciones</th>
              </tr>
              <td colSpan="1" className="p-0 border-0">
                <div className="d-flex justify-content-left align-items-center h-100">
                  <span className="text-muted">Mostrando 1-4 de 4 resultados</span>
                </div>
              </td>
              <td colSpan="6" className="p-0 border-0">
                <nav aria-label="Page navigation example" className="d-flex justify-content-end p-3">
                  <ul className="pagination mb-0">
                    <li className="page-item disabled">
                      <a className="page-link">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </td>
            </tfoot>
          </table>
        </div>


      </div>
    </>
  )
}
