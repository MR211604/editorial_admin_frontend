import { AuthorColumns } from "../components/authors/AuthorColumns";
import CreateAuthor from "../components/authors/CreateAuthor";
import Table from "../components/ui/table/Table";
import ToolBar from "../components/ui/ToolBar";
import { useAuthorsPage } from "./hooks/useAuthorsPage";

export default function AuthorsPage() {

  const {
    // Estados básicos
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,

    // Datos
    allAuthors,
    isAllAuthorsLoading,
    // selectedAuthor,

    // Modal handlers
    isModalOpen,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreateAuthor,
    handleEditAuthor,
    handleDeleteAuthor,

    // Callbacks de éxito
    onCreateSuccess,
    // onEditSuccess,
    // onDeleteSuccess
  } = useAuthorsPage();

  const authorColumns = AuthorColumns(handleEditAuthor, handleDeleteAuthor);

  return (
    <div>
      <h1>Autores</h1>
      <hr />
      <p>Bienvenido a la sección de autores. Aquí puedes encontrar información sobre los autores.</p>

      <div className='card'>
        <div className="card-header">
          Listado de autores
        </div>
        <div className='card-body'>
          <ToolBar
            onCreateClick={handleCreateAuthor}
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
      <CreateAuthor
        isOpen={isModalOpen('create')}
        onClose={() => closeModal('create')}
        onSuccess={onCreateSuccess}
      />

    </div>
  )
}
