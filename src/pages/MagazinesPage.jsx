import { usePublishingsPage } from './hooks/usePublishingsPage';
import { MagazineColumns } from '../components/magazines/MagazineColumns';
import Table from '../components/ui/table/Table';
import ToolBar from '../components/ui/ToolBar';

export default function MagazinesPage() {

  const {
    // Estados básicos
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,

    // Datos
    allPublishings,
    isAllPublishingsLoading,
    selectedPublishing,

    // Modal handlers
    isModalOpen,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreateMagazine,
    handleEditMagazine,
    handleDeleteMagazine,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    // onDeleteSuccess
  } = usePublishingsPage(2);

  const magazineColumns = MagazineColumns(handleEditMagazine, handleDeleteMagazine);

  return (
    <div>
      <h1>Revistas</h1>
      <hr />
      <p>Bienvenido a la sección de revistas. Aquí puedes encontrar información sobre las revistas.</p>

      <div className='card'>
        <div className="card-header">
          Listado de revistas
        </div>
        <div className='card-body'>
          <ToolBar
            onCreateClick={handleCreateMagazine}
            search={search}
            onSearchChange={searchHandler}
            createButtonText="Agregar nueva revista"
            searchPlaceholder="Buscar revista..."
            hasSelect={true}
            optionSelectedValue='Todas las revistas'
          />

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
      {/* <CreateAuthor
            isOpen={isModalOpen('create')}
            onClose={() => closeModal('create')}
            onSuccess={onCreateSuccess}
          /> */}

      {/* <UpdateAuthor
            isOpen={isModalOpen('update')}
            onClose={() => closeModal('update')}
            onSuccess={onEditSuccess}
            author={selectedMagazine}
          /> */}

    </div>
  )
}
