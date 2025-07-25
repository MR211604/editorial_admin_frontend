import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function MagazineArticlesTable({ publishing, handleEdit }) {

  return (
    <div className="table-responsive table-bordered">
      <table className="table table-striped">
        <thead className='table-dark'>
          <tr className='text-center'>
            <th>No.</th>
            <th>Titulo</th>
            <th>Inspecccionar</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {
            publishing?.data.details.map((article, index) => (
              <tr key={article.id} className="align-middle text-center">
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Inspeccionar</Tooltip>}
                  >
                    <button className="btn btn-info btn-sm">
                      <i className="bi bi-search"></i>
                    </button>
                  </OverlayTrigger>
                </td>
                <td>
                  <div className='d-flex gap-2 justify-content-center'>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Editar</Tooltip>}
                    >
                      <button className="btn btn-success btn-sm" onClick={() => handleEdit(article)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Eliminar</Tooltip>}
                    >
                      <button className="btn btn-danger btn-sm">
                        <i className="bi bi-trash"></i>
                      </button>
                    </OverlayTrigger>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
