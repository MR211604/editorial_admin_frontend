import React from "react";
import ToolBar from "../components/ui/ToolBar";
import Table from "../components/ui/table/Table";
import { usePage } from "./hooks/usePage";
import BannerCreate from "../components/banner/BannerCreate";
import { BannerColumns } from "../components/banner/BannerColumns";
import BannerChangeState from "../components/banner/BannerChangeState";
import CustomSelect from "../components/ui/CustomSelect";
import { useBanners } from "../hooks/useBanners";
import BannerUpdate from "../components/banner/BannerUpdate";

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

  const { allBanners, isAllBannersLoading } = useBanners();

  const bannerColumns = BannerColumns(handleEditValue, handleDeleteValue);

  return (
    <>
      <h1>Banner</h1>
      <hr />
      <p>
        Aqui puedes encontrar una lista de todos los banner registrados dentro
        de la aplicación para su uso en la HomePage.
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
            hasSelect={true}
            // selectName="Filtrar: "
            // optionSelectedValue="Todos los banner"
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
            selectedUser={selectedValue?.original}
          />
        )}
      </div>
    </>
  );
}
