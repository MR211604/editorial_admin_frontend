import { useNavigate } from "react-router-dom";
import { MagazineColumns } from "../components/magazines/MagazineColumns";
import ArchivePublishing from "../components/publishings/ArchivePublishing";
import PublishingCreate from "../components/publishings/PublishingCreate";
import CustomSelect from "../components/ui/CustomSelect";
import ModalDelete from "../components/ui/modal/ModalDelete";
import SelectPublishingCategories from "../components/ui/SelectPublishingCategories";
import Table from "../components/ui/table/Table";
import ToolBar from "../components/ui/ToolBar";
import { archivedPublishingSelectValues } from "../components/ui/utils/selectStaticValues";
import { MAGAZINE_CATEGORY } from "../constants/common";
import { useDeletePublishing } from "../hooks/usePublishings";
import { usePublishingsPage } from "./hooks/usePublishingsPage";

export default function MagazinesPage() {
  const {
    // Estados básicos
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    selectedCategory,

    // Datos
    allPublishings,
    isAllPublishingsLoading,
    selectedPublishing,
    filterArchived,

    // Modal handlers
    isModalOpen,
    closeModal,
    handleEditValue,
    handleDeleteValue,
    handleArchivedFilterChange,

    // Handlers específicos
    searchHandler,
    handleCreateValue,
    handleCategoryChange,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess,
  } = usePublishingsPage(2);

  const navigate = useNavigate();

  const handleUpdateMagazine = (row) =>
    navigate(`/dashboard/magazines/edit/${row.original.id}`);

  const handleEditArticles = (row) =>
    navigate(`/dashboard/magazines/articles/${row.original.id}`);

  const { deletePublishingMutation } = useDeletePublishing(
    selectedPublishing?.original.id
  );

  const magazineColumns = MagazineColumns(
    handleUpdateMagazine,
    handleEditValue, //Temporal, aun no existe funcion para archivar
    handleDeleteValue,
    handleEditArticles
  );

  return (
    <div>
      <h1>Revistas</h1>
      <hr />
      <p>
        Bienvenido a la sección de revistas. Aquí puedes encontrar información
        sobre las revistas.
      </p>

      <div className="card">
        <div className="card-header">Listado de revistas</div>
        <div className="card-body">
          <ToolBar
            onCreateClick={handleCreateValue}
            search={search}
            onSearchChange={searchHandler}
            createButtonText="Agregar nueva revista"
            searchPlaceholder="Buscar revista..."
            hasSelect={true}
            optionSelectedValue="Todas las revistas"
          >
            <SelectPublishingCategories
              categoryType={MAGAZINE_CATEGORY}
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
            />
          </ToolBar>

          <Table
            paginatedTableData={allPublishings}
            columns={magazineColumns}
            pagination={pagination}
            setPagination={setPagination}
            isTableDataLoading={isAllPublishingsLoading}
            sorting={sorting}
            setSorting={setSorting}
            setSearch={setSearch}
          />
        </div>
      </div>

      {/* Modales separados */}
      <PublishingCreate
        modalTitle="Crear Nueva Revista"
        modalSaveButtonText="Crear Revista"
        isOpen={isModalOpen("create")}
        onClose={() => closeModal("create")}
        onSuccess={onCreateSuccess}
        publishingType={MAGAZINE_CATEGORY}
      />

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
  );
}
