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
      <div className="d-flex gap-2">
        <button 
          className="btn btn-primary btn-sm" 
          onClick={() => onEdit(row)}
        >
          Editar
        </button>
        <button 
          className="btn btn-danger btn-sm" 
          onClick={() => onDelete(row)}
        >
          Eliminar
        </button>
      </div>
    ),
    enableSorting: false,
  }
];