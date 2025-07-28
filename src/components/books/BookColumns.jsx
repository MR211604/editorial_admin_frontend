import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const BookColumns = (onEdit, onDelete) => [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Titulo',
    accessorKey: 'title',
  },
  {
    header: 'Autor(es)',
    accessorKey: 'author',
  },
  {
    header: 'ISBN',
    accessorKey: 'publish_code',
  },
  {
    header: 'Año y Pag',
    accessorKey: 'year_and_pages',
  },
  {
    header: 'Operaciones',
    accessorKey: 'operations',
    cell: ({ row }) => (
      <div className="d-flex gap-2 align-items-center justify-content-center">

        <button
          className="btn btn-primary btn-sm"
          onClick={() => onEdit(row)}
        >
          <i className="bi bi-pencil-square"></i>
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(row)}
        >
          <i className="bi bi-trash"></i>
        </button>

      </div>
    ),
    enableSorting: false,
  }
]