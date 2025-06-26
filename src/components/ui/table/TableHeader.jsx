import { flexRender } from '@tanstack/react-table'
import React from 'react'

export default function TableHeader({ table }) {
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
