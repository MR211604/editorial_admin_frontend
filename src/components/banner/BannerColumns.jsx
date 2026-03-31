import { Badge } from "react-bootstrap";

export const BannerColumns = (onEdit, onToggleState) => [
  {
    header: "ID",
    accessorKey: "idBanner",
  },
  {
    header: "Titulo",
    accessorKey: "title",
  },
  {
    header: "URL del recurso",
    accessorKey: "resourceURL",
  },
  {
    header: "Estado",
    accessorKey: "state",
    enableSorting: false,
    cell: ({ row }) => {
      return row.original.state ? (
        <Badge bg="success">Activo</Badge>
      ) : (
        <Badge bg="secondary">Inactivo</Badge>
      );
    },
  },
  {
    header: "Operaciones",
    accessor: "operations",
    cell: ({ row }) => (
      <div id={row.original?.idBanner} className="d-flex gap-2">
        <button className="btn btn-primary btn-sm" onClick={() => onEdit(row)}>
          <i className="bi bi-pencil-square"></i>
        </button>
        {row.original?.state === 1 ? (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onToggleState(row)}
          >
            <i className="bi bi-x-circle"></i>
          </button>
        ) : (
          <button
            className="btn btn-success btn-sm"
            onClick={() => onToggleState(row)}
          >
            <i className="bi bi-check-circle"></i>
          </button>
        )}
      </div>
    ),
  },
];
