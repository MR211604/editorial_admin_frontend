import BannerChangeState from "../components/banner/BannerChangeState";
import { BannerColumns } from "../components/banner/BannerColumns";
import BannerCreate from "../components/banner/BannerCreate";
import BannerUpdate from "../components/banner/BannerUpdate";
import ToolBar from "../components/ui/ToolBar";
import Table from "../components/ui/table/Table";
import { useBanners } from "../hooks/useBanners";
import { useDebounce } from "../hooks/utils/useDebounce";
import { usePage } from "./hooks/usePage";

export default function BannerPage() {
  const {
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

  const debouncedSearch = useDebounce(search, 300);

  const { allBanners, isAllBannersLoading } = useBanners(
    pagination.pageIndex + 1,
    pagination.pageSize,
    sorting,
    debouncedSearch,
  );

  const bannerColumns = BannerColumns(handleEditValue, handleDeleteValue);

  return (
    <>
      <h1>Banner</h1>
      <hr />
      <p>
        Aquí puedes administrar los videos que se muestran en la página
        principal. Puedes usar enlaces de YouTube, TikTok, Facebook o Instagram;
        solo se permite tener un video activo a la vez.
      </p>

      <div className="card">
        <div className="card-header">Listado de Banners</div>

        <div className="card-body">
          <ToolBar
            onCreateClick={handleCreateValue}
            search={search}
            onSearchChange={searchHandler}
            createButtonText="Agregar nuevo banner"
            searchPlaceholder="Buscar banner..."
          />

          <Table
            paginatedTableData={allBanners}
            columns={bannerColumns}
            pagination={pagination}
            setPagination={setPagination}
            isTableDataLoading={isAllBannersLoading}
            sorting={sorting}
            setSorting={setSorting}
            setSearch={setSearch}
          />
        </div>

        {isModalOpen("create") && (
          <BannerCreate
            isOpen={isModalOpen("create")}
            onClose={() => closeModal("create")}
            onSuccess={onCreateSuccess}
          />
        )}

        {isModalOpen("edit") && (
          <BannerUpdate
            isOpen={isModalOpen("edit")}
            onClose={() => closeModal("edit")}
            onSuccess={onEditSuccess}
            selectedBanner={selectedValue?.original}
          />
        )}

        {isModalOpen("delete") && selectedValue && (
          <BannerChangeState
            isOpen={isModalOpen("delete")}
            onClose={() => closeModal("delete")}
            onSuccess={onDeleteSuccess}
            selectedBanner={selectedValue?.original}
          />
        )}
      </div>
    </>
  );
}
