import Table from "../components/ui/table/Table";
import ToolBar from "../components/ui/ToolBar";
import { UserPrivilegeColumns } from "../components/users/userPrivileges/UserPrivilegeColumns";
import { useUserPrivilegesPage } from "./hooks/useUserPrivilegesPage"

export default function UserPrivileges() {

  const {
    allUserPrivileges,
    isAllUserPrivilegesLoading,
    // selectedUserPrivilege,
    // handleCreateUserPrivilege,
    handleEditUserPrivilege,
    handleDeleteUserPrivilege,
    // onCreateSuccess,
    // onEditSuccess,
    // onDeleteSuccess,
    pagination,
    setPagination,
  } = useUserPrivilegesPage();

  const userPrivilegeColumns = UserPrivilegeColumns(handleEditUserPrivilege, handleDeleteUserPrivilege);


  return (

    <>
      <h1>Privilegios</h1>
      <hr />
      <p>Aqui puedes encontrar una lista de todos los privilegios de usuario disponibles.</p>

      <div className="card">
        <div className="card-header">
          Listado de privilegios de usuario
        </div>

        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-success">Agregar nuevo privilegio</button>
          </div>

          <Table paginatedTableData={allUserPrivileges} columns={userPrivilegeColumns} pagination={pagination} setPagination={setPagination} isTableDataLoading={isAllUserPrivilegesLoading} />
        </div>

      </div>
    </>

  )
}
