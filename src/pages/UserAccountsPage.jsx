import Table from "../components/ui/table/Table";
import ToolBar from "../components/ui/ToolBar";
import { UserColumns } from "../components/users/UserColumns";
import UserCreate from "../components/users/UserCreate";
import { useUsers } from "../hooks/useUsers";
import { useDebounce } from "../hooks/utils/useDebounce";
import { usePage } from "./hooks/usePage";

export default function UserAccountsPage() {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    // selectedValue,

    // Modal handlers
    isModalOpen,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreateValue,
    handleEditValue,
    // handleDeleteValue,

    // Callbacks de éxito
    onCreateSuccess,
    // onEditSuccess,
  } = usePage();

  const onDelete = (id) => {
    console.log("id a eliminar", id);
  };

  const debouncedSearch = useDebounce(search, 300);

  const { allUsers, isAllUsersLoading } = useUsers(
    pagination.pageIndex + 1,
    pagination.pageSize,
    sorting,
    debouncedSearch
  );

  console.log("allUsers", allUsers);

  const userColumns = UserColumns(handleEditValue, onDelete);

  return (
    <>
      <h1>Usuarios</h1>
      <hr />
      <p>
        Aqui puedes encontrar una lista de todos los usuarios registrados dentro
        de esta plataforma.
      </p>

      <div className="card">
        <div className="card-header">Listado de usuarios</div>
        <div className="card-body">
          <ToolBar
            onCreateClick={handleCreateValue}
            search={search}
            onSearchChange={searchHandler}
            createButtonText="Agregar nuevo usuario"
            searchPlaceholder="Buscar usuario..."
          />

          <Table
            paginatedTableData={allUsers}
            columns={userColumns}
            pagination={pagination}
            setPagination={setPagination}
            isTableDataLoading={isAllUsersLoading}
            sorting={sorting}
            setSorting={setSorting}
            setSearch={setSearch}
          />
        </div>
      </div>

      {isModalOpen("create") && (
        <UserCreate
          isOpen={isModalOpen("create")}
          onClose={() => closeModal("create")}
          onSuccess={onCreateSuccess}
        />
      )}
    </>
  );
}
