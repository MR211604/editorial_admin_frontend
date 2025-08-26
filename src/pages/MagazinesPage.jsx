import { useNavigate } from "react-router-dom";
import { MagazineColumns } from "../components/magazines/MagazineColumns";
import CreatePublishing from "../components/publishings/CreatePublishing";
import SelectPublishingCategories from "../components/ui/SelectPublishingCategories";
import Table from "../components/ui/table/Table";
import ToolBar from "../components/ui/ToolBar";
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
    // selectedPublishing,

    // Modal handlers
    // isModalOpen,
    // closeModal,

    // Handlers específicos
    searchHandler,
    handleCreateValue,
    handleCategoryChange,
    isModalOpen,
    closeModal,

    // Callbacks de éxito
    onCreateSuccess,
    //onEditSuccess,
    //onDeleteSuccess
  } = usePublishingsPage(2);

  const navigate = useNavigate();

  const handleUpdateMagazine = (row) =>
    navigate(`/dashboard/magazines/edit/${row.original.id}`);

  const handleDeleteMagazine = (row) =>
    console.log("Eliminar revista:", row.original.id);

  const handleEditArticles = (row) =>
    navigate(`/dashboard/magazines/articles/${row.original.id}`);

  const magazineColumns = MagazineColumns(
    handleUpdateMagazine,
    handleDeleteMagazine,
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
              categoryType={2}
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
              defaultValue="Todas las revistas"
              className="form-select form-select-md w-50 ms-2"
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
      <CreatePublishing
        modalTitle="Crear Nueva Revista"
        modalSaveButtonText="Crear Revista"
        isOpen={isModalOpen("create")}
        onClose={() => closeModal("create")}
        onSuccess={onCreateSuccess}
        publishingType={2}
      />
    </div>
  );
}
