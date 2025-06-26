import { useReactTable } from '@tanstack/react-table'
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table'
import TablePagination from './TablePagination';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

export default function Table({ paginatedTableData, columns, pagination, setPagination, isTableDataLoading }) {

  const table = useReactTable({
    data: paginatedTableData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Sort configuration
    // onSortingChange: setSorting,
    // enableMultiSort: true,
    // manualSorting: true,
    // sortDescFirst: true,

    // Filter configuration
    // onColumnFiltersChange: setColumnFilters,
    // manualFiltering: true,

    // Pagination configuration
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: Number(paginatedTableData?.pagination.total),
    pageCount: Math.ceil((paginatedTableData?.pagination.total || 0) / (Number(paginatedTableData?.pagination.per_page) || 1)),
    manualPagination: true,
    state: {
      pagination,
    },
  });

  return (
    <table className="table table-hover table-bordered table-striped">
      {isTableDataLoading ? (
        <thead>
          <tr>
            <th colSpan="6" className="text-center">Cargando datos...</th>
          </tr>
        </thead>
      ) : (
        <>
          <TableBody table={table} />
          <tfoot>
            <tr>
              <td colSpan="6" className="p-0 border-0">
                <TablePagination table={table} />
              </td>
            </tr>
          </tfoot>
        </>
      )}
    </table>
  )
}
