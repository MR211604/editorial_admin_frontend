import React from 'react'
import { useState } from 'react'
import { useGetUsers } from '../hooks/useGetUsers'
import Table from '../components/ui/table/Table'

export default function UserAccountsPage() {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const { allUsers, isAllUsersLoading } = useGetUsers(pagination.pageIndex + 1, pagination.pageSize)

  const usersColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
      enableSorting: true
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
      enableSorting: true
    },
    {
      header: 'Token/Usuario',
      accessorKey: 'token',
      enableSorting: true
    },
    {
      header: 'Rol',
      accessorKey: 'rol.name',
      enableSorting: true
    },
    {
      header: 'Ultimo acceso',
      accessorKey: 'last_login_date',
      enableSorting: true
    },
    // {
    //   Header: 'Operaciones',
    //   accessor: 'operations',
    //   Cell: ({ row }) => (
    //     <div id={row.id} className="d-flex gap-2">
    //       <button className="btn btn-primary btn-sm" onClick={() => console.log(row)}>Editar</button>
    //       <button className="btn btn-danger btn-sm">Eliminar</button>
    //     </div>
    //   )
    // }
  ]

  return (
    <>
      <h1>Usuarios</h1>
      <hr />
      <p>Aqui puedes encontrar una lista de todos los usuarios registrados dentro de esta plataforma.</p>

      <div className="card">
        <div className="card-header">
          Listado de Usuarios
        </div>

        <div className="card-body">
          <div className='d-flex align-items-center mb-3'>
            <button className='btn btn-success'>Agregar Usuario</button>
          </div>
          <Table paginatedTableData={allUsers} columns={usersColumns} pagination={pagination} setPagination={setPagination} isTableDataLoading={isAllUsersLoading} />
        </div>
      </div>
    </>

  )
}
