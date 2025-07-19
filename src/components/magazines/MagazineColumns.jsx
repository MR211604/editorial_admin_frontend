export const MagazineColumns = (onEdit, onDelete) => [
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
    accessorKey: 'authors',
    cell: ({ row }) => {
      const authors = row.original.authors;
      if (!authors || !Array.isArray(authors)) return '-';
      return authors.map(author => author.name || author).join(', ');
    }
  },
  {
    header: 'ISBN',
    accessorKey: 'publish_code',
  },
  {
    header: 'Año',
    accessorKey: 'publish_date',
    cell: ({ row }) => {
      if (!row.original.publish_date) return '-';
      const date = new Date(row.original.publish_date);
      return date.getFullYear();
    }
  },
  {
    header: 'Páginas',
    accessorKey: 'details.pages',
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