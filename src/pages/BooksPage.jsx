import { useNavigate } from "react-router-dom";
import { BookColumns } from "../components/books/BookColumns";
import ArchivePublishing from "../components/publishings/ArchivePublishing";
import PublishingCreate from "../components/publishings/PublishingCreate";
import CustomSelect from "../components/ui/CustomSelect";
import ModalDelete from "../components/ui/modal/ModalDelete";
import SelectPublishingCategories from "../components/ui/SelectPublishingCategories";
import Table from "../components/ui/table/Table";
import ToolBar from "../components/ui/ToolBar";
import { archivedPublishingSelectValues } from "../components/ui/utils/selectStaticValues";
import { useDeletePublishing } from "../hooks/usePublishings";
import { usePublishingsPage } from "./hooks/usePublishingsPage";
import { BOOK_PUBLISHING } from "../constants/common";

export default function BooksPage() {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    filterArchived,

    // Datos
    allPublishings,
    isAllPublishingsLoading,
    selectedPublishing,

    // Modal handlers
    isModalOpen,
    closeModal,
    handleEditValue,
    handleDeleteValue,

    // Handlers específicos
    searchHandler,
    handleCreateValue,
    handleCategoryChange,
    selectedCategory,
    handleArchivedFilterChange,

    //Callbacks
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess,
  } = usePublishingsPage(BOOK_PUBLISHING);

  const navigate = useNavigate();

  const handleUpdateBook = (row) =>
    navigate(`/dashboard/books/edit/${row.original.URL}`);

  const { deletePublishingMutation } = useDeletePublishing(
    selectedPublishing?.original.id
  );

  const bookColumns = BookColumns(
    handleUpdateBook,
    handleEditValue,
    handleDeleteValue
  );

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
            selectName="Filtrar: "
            optionSelectedValue="Todos los libros"
          >
            <SelectPublishingCategories
              categoryType={"Libro"}
              enableAllCategoriesOption={true}
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
              className="form-select form-select-md w-50 ms-2"
            />
            <CustomSelect
              onSelectChange={handleArchivedFilterChange}
              selectedValue={filterArchived}
              className="form-select form-select-md w-25 ms-2"
              optionValues={archivedPublishingSelectValues}
              showDefaultOption={false}
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

        {isModalOpen("create") && (
          <PublishingCreate
            modalTitle="Crear Nuevo Libro"
            modalSaveButtonText="Crear Libro"
            isOpen={isModalOpen("create")}
            onClose={() => closeModal("create")}
            onSuccess={onCreateSuccess}
            publishingType={BOOK_PUBLISHING}
            categoryType={"Libro"}
          />
        )}

        {isModalOpen("edit") && selectedPublishing && (
          <ArchivePublishing
            isOpen={isModalOpen("edit")}
            onClose={() => closeModal("edit")}
            onSuccess={onEditSuccess}
            selectedPublishing={selectedPublishing}
          />
        )}

        {isModalOpen("delete") && selectedPublishing && (
          <ModalDelete
            isOpen={isModalOpen("delete")}
            onClose={() => closeModal("delete")}
            onSuccess={onDeleteSuccess}
            selectedValue={selectedPublishing}
            deleteMutationFn={deletePublishingMutation}
            title={selectedPublishing?.original.title}
          />
        )}
      </div>
    </>
  );
}
