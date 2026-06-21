export const UserColumns = (onEdit, onDelete) => [
  {
    header: "ID",
    accessorKey: "idUser",
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
    header: "Rol(es)",
    accessorKey: "user_roles",
    enableSorting: true,
    cell: ({ row }) => {
      const roles = row.original?.user_roles ?? [];
      if (!roles.length) return <span className="text-muted">—</span>;
      return (
        <div key={row.original?.name} className="d-flex flex-wrap gap-1">
          {roles.map((r) => (
            <span className="badge bg-secondary">{r.name}</span>
          ))}
        </div>
      );
    },
  },
  {
    header: "Estado",
    accessorKey: "active",
    enableSorting: false,
    cell: ({ row }) => (
      <div id={row.original?.idUser} className="d-flex gap-2">
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
      <div id={row.original?.idUser} className="d-flex gap-2">
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
