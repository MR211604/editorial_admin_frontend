export const UserPrivilegeColumns = (onEdit, onDelete) => [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Privilegio',
    accessorKey: 'privilege_name',
  },
  {
    header: 'Activo',
    accessorKey: 'is_active',
    cell: ({ row }) => (
      <span className={`badge ${row.original.is_active ? 'bg-success' : 'bg-danger'}`}>
        {row.original.is_active ? 'Activo' : 'Inactivo'}
      </span>
    ),
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