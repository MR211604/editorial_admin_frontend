import { useNavigate } from "react-router-dom";
import { MagazineColumns } from "../components/magazines/MagazineColumns";
import PublishingCreate from "../components/publishings/PublishingCreate";
import SelectPublishingCategories from "../components/ui/SelectPublishingCategories";
import Table from "../components/ui/table/Table";
import ToolBar from "../components/ui/ToolBar";
import { usePublishingsPage } from "./hooks/usePublishingsPage";
import { MAGAZINE_CATEGORY } from "../constants/common";
import ArchivePublishing from "../components/publishings/ArchivePublishing";
import SelectArchivedPublishings from "../components/ui/SelectArchivedPublishings";
import PublishingDelete from "../components/publishings/PublishingDelete";

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
              defaultCategoryValue={null}
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
              defaultValue="Todas las revistas"
              className="form-select form-select-md w-50 ms-2"
            />
            <SelectArchivedPublishings
              onSelectChange={handleArchivedFilterChange}
              selectedValue={filterArchived}
              className="form-select form-select-md w-25 ms-2"
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
        <PublishingDelete
          isOpen={isModalOpen("delete")}
          onClose={() => closeModal("delete")}
          onSuccess={onDeleteSuccess}
          selectedPublishing={selectedPublishing}
        />
      )}
    </div>
  );
}
