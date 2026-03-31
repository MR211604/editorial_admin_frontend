export const AuthorColumns = (onEdit, onDelete) => [
  {
    header: "ID",
    accessorKey: "idAuthor",
    enableSorting: true,
  },
  {
    header: "Nombre",
    accessorKey: "name",
    enableSorting: true,
  },
  {
    header: "Apellido",
    accessorKey: "lastname",
    enableSorting: true,
  },
  {
    header: "Operaciones",
    accessorKey: "operations",
    cell: ({ row }) => (
      <div className="d-flex gap-2 align-items-center justify-content-center">
        <button className="btn btn-primary btn-sm" onClick={() => onEdit(row)}>
          <i className="bi bi-pencil-square"></i>
        </button>

        <button className="btn btn-danger btn-sm" onClick={() => onDelete(row)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    ),
    enableSorting: false,
  },
];
