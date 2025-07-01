import { flexRender } from '@tanstack/react-table'

//TODO: Agregar sorting desde el server para que ordenemos todos los datos y no solo los visibles

const getSortIcon = (sortDirection) => {
  const iconMap = {
    'desc': <i className="bi bi-sort-alpha-down-alt" />,
    'asc': <i className="bi bi-sort-alpha-up" />,
    false: <i className="bi bi-filter" />
  }
  return iconMap[sortDirection] || <i className="bi bi-filter" />
}

export default function TableHeader({ table }) {

  const sortToggler = (header) => {
    if (header.column.getCanSort()) {
      header.column.toggleSorting(undefined, true);     
    }
  }

  return (
    <thead>
      {
        table.getHeaderGroups().map(header => (
          <tr className='table-primary' key={header.id}>
            {header.headers.map(header => (
              <th key={header.id} scope="col">
                {
                  header.isPlaceholder ? null : (
                    <div className="d-flex justify-content-between align-items-center">
                      {
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                      {
                        header.column.getCanSort() ? (
                          <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => sortToggler(header)}
                          >
                            {getSortIcon(header.column.getIsSorted())}
                          </div>
                        ) : null
                      }
                    </div>
                  )
                }
              </th>
            ))}
          </tr>
        ))
      }
    </thead>
  )
}
