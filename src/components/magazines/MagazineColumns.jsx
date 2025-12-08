import { Badge } from "react-bootstrap";

export const MagazineColumns = (
  onEdit,
  onArchive,
  onDelete,
  onEditArticles
) => [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Titulo",
    accessorKey: "title",
  },
  {
    header: "Autor(es)",
    accessorKey: "authors",
    cell: ({ row }) => {
      const authors = row.original.authors;
      if (!authors || !Array.isArray(authors)) return "-";
      return authors
        .map((author) => author.name + " " + author.lastname || author)
        .join(", ");
    },
  },
  {
    header: "ISSN",
    accessorKey: "publish_code",
  },
  {
    header: "Año",
    accessorKey: "publish_date",
    cell: ({ row }) => {
      if (!row.original.publish_date) return "-";
      const date = new Date(row.original.publish_date);
      return date.getFullYear();
    },
  },
  {
    header: "Páginas",
    accessorKey: "pages",
  },
  {
    header: "Estado",
    accessorKey: "is_archive",
    cell: ({ row }) => {
      return row.original.is_archived ? (
        <Badge bg="secondary">Archivado</Badge>
      ) : (
        <Badge bg="success">Activo</Badge>
      );
    },
    enableSorting: false,
  },
  {
    header: "Operaciones",
    accessorKey: "operations",
    cell: ({ row }) => (
      <div className="d-flex gap-2 align-items-center justify-content-center">
        <button className="btn btn-primary btn-sm" onClick={() => onEdit(row)}>
          <i className="bi bi-pencil-square"></i>
        </button>

        {row.original.is_archived === 1 ? (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(row)}
          >
            <i className="bi bi-trash"></i>
          </button>
        ) : null}
        <button className="btn btn-info btn-sm" onClick={() => onArchive(row)}>
          <i className="bi bi-archive"></i>
        </button>

        <button
          className="btn btn-success btn-sm"
          onClick={() => onEditArticles(row)}
        >
          <i className="bi bi-file-earmark-ruled"></i>
        </button>
      </div>
    ),
    enableSorting: false,
  },
];
