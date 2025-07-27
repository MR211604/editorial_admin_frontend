import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const AuthorColumns = (onEdit, onDelete) => [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Nombre',
    accessorKey: 'name',
  },
  {
    header: 'Apellido',
    accessorKey: 'lastname',
  },
  {
    header: 'Operaciones',
    accessorKey: 'operations',
    cell: ({ row }) => (
      <div className="d-flex gap-2 align-items-center justify-content-center">
        <OverlayTrigger
          placement="top"
          key={`tooltip-edit-key-${row.original.id}`}
          overlay={<Tooltip id={`tooltip-edit-${row.original.id}`}>Editar</Tooltip>}
        >
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onEdit(row)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          key={`tooltip-delete-key-${row.original.id}`}
          overlay={<Tooltip id={`tooltip-delete-${row.original.id}`}>Eliminar</Tooltip>}
        >
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(row)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </OverlayTrigger>

      </div>
    ),
    enableSorting: false,
  }
];