import { useState } from "react";
import { useUserRoles } from "../hooks/useUserRoles";
import Table from "../components/ui/table/Table";

export default function RolPage() {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const { allRoles, isAllRolesLoading } = useUserRoles(pagination.pageIndex + 1, pagination.pageSize);

  const rolesColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
    },
    {
      header: 'Descripcion',
      accessorKey: 'description',
    },
  ]


  return (
    <>
      <h1>Roles</h1>
      <hr />
      <p>Aqui puedes encontrar una lista de todos los roles dentro de la plataforma.</p>

      <div className="card">
        <div className="card-header">
          Listado de roles
        </div>

        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-success">Agregar nuevo rol</button>
          </div>
          <Table paginatedTableData={allRoles} columns={rolesColumns} pagination={pagination} setPagination={setPagination} isTableDataLoading={isAllRolesLoading} />
        </div>
      </div>
    </>
  )
}
