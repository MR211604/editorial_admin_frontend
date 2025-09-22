import { Badge } from "react-bootstrap";

export const BookColumns = (onEdit, onArchive, onDelete) => [
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
      return authors.map((author) => author.name || author).join(", ");
    },
  },
  {
    header: "ISBN",
    accessorKey: "publish_code",
  },
  {
    header: "Año y Pag",
    accessorKey: "publish_date",
    cell: ({ row }) => (
      <>
        {row.original.publish_date
          ? new Date(row.original.publish_date).getFullYear()
          : "-"}{" "}
        / {row.original.pages || "-"}
      </>
    ),
  },
  {
    header: "Estado",
    accessorKey: "is_archived",
    cell: ({ row }) => {
      return row.original.is_archived ? (
        <Badge bg="secondary">Archivado</Badge>
      ) : (
        <Badge bg="success">Activo</Badge>
      );
    },
  },
  {
    header: "Operaciones",
    accessorKey: "operations",
    cell: ({ row }) => (
      <div className="d-flex gap-2 align-items-center justify-content-center">
        <button className="btn btn-primary btn-sm" onClick={() => onEdit(row)}>
          <i className="bi bi-pencil-square"></i>
        </button>

        {row.original.is_archive ? (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(row)}
          >
            <i className="bi bi-trash"></i>
          </button>
        ) : (
          <button
            className="btn btn-info btn-sm"
            onClick={() => onArchive(row)}
          >
            <i className="bi bi-archive"></i>
          </button>
        )}
      </div>
    ),
    enableSorting: false,
  },
];
