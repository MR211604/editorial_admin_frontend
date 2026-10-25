import { useUserRoles } from "../hooks/useUserRoles";
import Table from "../components/ui/table/Table";
import { usePage } from "./hooks/usePage";
import ToolBar from "../components/ui/ToolBar";
import { useDebounce } from "../hooks/utils/useDebounce";
import RolCreate from "../components/rol/RolCreate";
import UserManualButton from "../components/ui/UserManualButton";

export default function RolPage() {
  const {
    pagination,
    setPagination,
    search,
    setSearch,

    // Modal handlers
    isModalOpen,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreateValue,

    // Callbacks de éxito
    onCreateSuccess,
  } = usePage();

  const debouncedSearch = useDebounce(search, 300);

  const { allRoles, isAllRolesLoading } = useUserRoles(
    pagination.pageIndex + 1,
    pagination.pageSize,
    debouncedSearch,
  );

  const rolesColumns = [
    {
      header: "ID",
      accessorKey: "idRol",
      enableSorting: false,
    },
    {
      header: "Nombre",
      accessorKey: "name",
      enableSorting: false,
    },
    {
      header: "Descripcion",
      accessorKey: "description",
      enableSorting: false,
    },
  ];

  return (
    <>
      <h1>Roles</h1>
      <hr />
      <p>
        Aqui puedes encontrar una lista de todos los roles dentro de la
        plataforma.
      </p>
      <UserManualButton fileName="ROLES.pdf" moduleName="Roles" />

      <div className="card">
        <div className="card-header">Listado de roles</div>

        <div className="card-body">
          <ToolBar
            onCreateClick={handleCreateValue}
            search={search}
            onSearchChange={searchHandler}
            createButtonText="Agregar nuevo rol"
            searchPlaceholder="Buscar rol..."
          />
          <Table
            paginatedTableData={allRoles}
            columns={rolesColumns}
            pagination={pagination}
            setPagination={setPagination}
            isTableDataLoading={isAllRolesLoading}
            setSearch={setSearch}
          />
        </div>
      </div>

      {isModalOpen("create") && (
        <RolCreate
          isOpen={isModalOpen("create")}
          onClose={() => closeModal("create")}
          onSuccess={onCreateSuccess}
        />
      )}
    </>
  );
}
