import { AuthorColumns } from "../components/authors/AuthorColumns";
import AuthorCreate from "../components/authors/AuthorCreate";
import AuthorUpdate from "../components/authors/AuthorUpdate";
import ModalDelete from "../components/ui/modal/ModalDelete";
import Table from "../components/ui/table/Table";
import ToolBar from "../components/ui/ToolBar";
import { useAuthors, useDeleteAuthor } from "../hooks/useAuthors";
import { useDebounce } from "../hooks/utils/useDebounce";
import { usePage } from "./hooks/usePage";
import UserManualButton from "../components/ui/UserManualButton";

export default function AuthorsPage() {
  const {
    // Estados básicos
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    selectedValue,

    // Modal handlers
    isModalOpen,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreateValue,
    handleEditValue,
    handleDeleteValue,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess,
  } = usePage();

  //Logica para mantener un debounce
  const debouncedSearch = useDebounce(search, 300);

  // Data
  const { allAuthors, isAllAuthorsLoading } = useAuthors(
    pagination.pageIndex + 1,
    pagination.pageSize,
    sorting,
    debouncedSearch,
  );

  const { deleteAuthor } = useDeleteAuthor(selectedValue?.original.idAuthor);

  const authorColumns = AuthorColumns(handleEditValue, handleDeleteValue);

  return (
    <div>
      <h1>Autores</h1>
      <hr />
      <p>
        Bienvenido a la sección de autores. Aquí puedes encontrar información
        sobre los autores.
      </p>
      <UserManualButton fileName="AUTORES.pdf" moduleName="Autores" />

      <div className="card">
        <div className="card-header">Listado de autores</div>
        <div className="card-body">
          <ToolBar
            onCreateClick={handleCreateValue}
            search={search}
            onSearchChange={searchHandler}
            createButtonText="Agregar nuevo autor"
            searchPlaceholder="Buscar autor..."
          />

          <Table
            paginatedTableData={allAuthors}
            columns={authorColumns}
            pagination={pagination}
            setPagination={setPagination}
            isTableDataLoading={isAllAuthorsLoading}
            sorting={sorting}
            setSorting={setSorting}
            setSearch={setSearch}
          />
        </div>
      </div>

      {/* Modales separados */}
      {isModalOpen("create") && (
        <AuthorCreate
          isOpen={isModalOpen("create")}
          onClose={() => closeModal("create")}
          onSuccess={onCreateSuccess}
        />
      )}

      {isModalOpen("edit") && selectedValue && (
        <AuthorUpdate
          isOpen={isModalOpen("edit")}
          onClose={() => closeModal("edit")}
          onSuccess={onEditSuccess}
          author={selectedValue}
        />
      )}

      {isModalOpen("delete") && selectedValue && (
        <ModalDelete
          isOpen={isModalOpen("delete")}
          onClose={() => closeModal("delete")}
          onSuccess={onDeleteSuccess}
          deleteMutationFn={deleteAuthor}
          title={selectedValue?.original.name}
        />
      )}
    </div>
  );
}
