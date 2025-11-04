export const UserColumns = (onEdit, onDelete) => [
  {
    header: "ID",
    accessorKey: "id",
    enableSorting: true,
  },
  {
    header: "Nombre",
    accessorKey: "name",
    enableSorting: true,
  },
  {
    header: "Token/Usuario",
    accessorKey: "token",
    enableSorting: true,
  },
  {
    header: "Rol",
    accessorKey: "rol.name",
    enableSorting: true,
  },
  {
    header: "Estado",
    accessorKey: "active",
    enableSorting: false,
    cell: ({ row }) => (
      <div id={row.id} className="d-flex gap-2">
        {row.original?.active === 1 ? (
          <span className="badge bg-success">Activo</span>
        ) : (
          <span className="badge bg-danger">Inactivo</span>
        )}
      </div>
    ),
  },
  {
    header: "Ultimo acceso",
    accessorKey: "last_login_date",
    enableSorting: true,
  },
  {
    header: "Operaciones",
    accessor: "operations",
    cell: ({ row }) => (
      <div id={row.id} className="d-flex gap-2">
        <button className="btn btn-primary btn-sm" onClick={() => onEdit(row)}>
          <i className="bi bi-pencil-square"></i>
        </button>
        {row.original?.active === 1 ? (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(row)}
          >
            <i className="bi bi-x-circle"></i>
          </button>
        ) : (
          <button
            className="btn btn-success btn-sm"
            onClick={() => onDelete(row)}
          >
            <i className="bi bi-check-circle"></i>
          </button>
        )}
      </div>
    ),
  },
];
