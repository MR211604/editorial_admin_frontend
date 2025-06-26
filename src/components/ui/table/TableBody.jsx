import { flexRender } from '@tanstack/react-table'
import React from 'react'
import TableHeader from './TableHeader'

export default function TableBody({ table }) {

  return (
    <>
      {/* Table header */}
      <TableHeader table={table} />

      {/* Table rows */}
      <tbody>
        {table.getRowModel().rows.length === 0 ? (
          <tr>
            <td colSpan={table.getAllColumns().length} className="text-center">
              No hay datos disponibles
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </>
  )
}
