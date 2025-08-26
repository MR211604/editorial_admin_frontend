import { useNavigate } from "react-router-dom";
import { BookColumns } from "../components/books/BookColumns";
import CreatePublishing from "../components/publishings/CreatePublishing";
import SelectPublishingCategories from "../components/ui/SelectPublishingCategories";
import Table from "../components/ui/table/Table";
import ToolBar from "../components/ui/ToolBar";
import { usePublishingsPage } from "./hooks/usePublishingsPage";

export default function BooksPage() {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,

    // Datos
    allPublishings,
    isAllPublishingsLoading,
    // selectedPublishing,

    // Modal handlers
    isModalOpen,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreateValue,
    handleCategoryChange,
    selectedCategory,

    //Callbacks
    onCreateSuccess,
  } = usePublishingsPage(1);

  const navigate = useNavigate();

  const handleUpdateBook = (row) =>
    navigate(`/dashboard/books/edit/${row.original.id}`);

  const handleDeleteBook = (row) =>
    console.log("Eliminar libro:", row.original.id);

  const bookColumns = BookColumns(handleUpdateBook, handleDeleteBook);

  return (
    <>
      <h1>Libros</h1>
      <hr />
      <p>Aqui puedes encontrar una lista de todos los libros disponibles.</p>

      <div className="card">
        <div className="card-header">Listado de Libros</div>

        <div className="card-body">
          <ToolBar
            onCreateClick={handleCreateValue}
            search={search}
            onSearchChange={searchHandler}
            createButtonText="Agregar nuevo libro"
            searchPlaceholder="Buscar libro..."
            hasSelect={true}
            optionSelectedValue="Todos los libros"
          >
            <SelectPublishingCategories
              categoryType={1}
              defaultValue="Todos los libros"
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
              className="form-select form-select-md w-50 ms-2"
            />
          </ToolBar>

          <Table
            paginatedTableData={allPublishings}
            columns={bookColumns}
            pagination={pagination}
            setPagination={setPagination}
            isTableDataLoading={isAllPublishingsLoading}
            sorting={sorting}
            setSorting={setSorting}
            setSearch={setSearch}
          />
        </div>

        <CreatePublishing
          modalTitle="Crear Nuevo Libro"
          modalSaveButtonText="Crear Libro"
          isOpen={isModalOpen("create")}
          onClose={() => closeModal("create")}
          onSuccess={onCreateSuccess}
          publishingType={1}
        />
      </div>
    </>
  );
}
