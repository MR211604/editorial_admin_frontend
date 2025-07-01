import { useReactTable} from '@tanstack/react-table'
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table'
import TablePagination from './TablePagination';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

export default function Table({ paginatedTableData, columns, pagination, setPagination, isTableDataLoading, setSorting, sorting }) {

  const table = useReactTable({
    data: paginatedTableData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Sort configuration
    onSortingChange: setSorting,
    enableSorting: true,
    enableMultiSort: true,
    manualSorting: true,
    sortDescFirst: true,
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
      sorting,
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
          <TableHeader table={table} />
          <tfoot className="table-footer">
            <td colSpan="1" className='p-0'>
              <div className="d-flex align-content-center align-items-center justify-content-start">
                <span className="form-label">Mostrando</span>
                <select
                  name='pageSize'
                  className="form-select w-auto mx-2"
                  value={pagination.pageSize}
                  onChange={(e) => setPagination((prev) => ({ ...prev, pageSize: Number(e.target.value) }))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="form-label">Entradas</span>
              </div>
            </td>
            <td colSpan="6" className="p-0">
              <TablePagination table={table} />
            </td>
          </tfoot>
        </>
      )}
    </table>
  )
}
