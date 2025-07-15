import { useReactTable } from '@tanstack/react-table'
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table'
import TablePagination from './TablePagination';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

export default function Table({ paginatedTableData, columns, pagination, setPagination, isTableDataLoading, setSorting, sorting, setSearch, categoryFilter }) {

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
    onColumnFiltersChange: setSearch,
    manualFiltering: true,

    // Pagination configuration
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: Number(paginatedTableData?.pagination.total),
    pageCount: Math.ceil((paginatedTableData?.pagination.total || 0) / (Number(paginatedTableData?.pagination.per_page) || 1)),
    manualPagination: true,
    state: {
      pagination,
      sorting: sorting ? sorting : [],
      columnFilters: categoryFilter ? [{ id: 'category_id', value: categoryFilter }] : [],
    },
  });

  return (

    <table className="table table-responsive table-hover table-bordered table-striped">
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
            <tr>
              <td colSpan={columns.length} className='pt-3 pb-3'>
                <div className="d-flex align-items-center justify-content-between">
                  <div className='d-flex align-items-center'>
                    <span className="form-label me-2">Mostrando</span>
                    <select
                      name='pageSize'
                      className="form-select w-auto me-2"
                      value={pagination.pageSize}
                      onChange={(e) => setPagination((prev) => ({ ...prev, pageSize: Number(e.target.value) }))}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="form-label">Entradas</span>
                  </div>
                  <TablePagination table={table} />
                </div>
              </td>
            </tr>
          </tfoot>
        </>
      )}
    </table>
  )
}
