import { useState } from "react";
import { useDebounce } from "../../hooks/utils/useDebounce";
import { usePublishings } from "../../hooks/usePublishings";

export const usePublishingsPage = (publishing_type) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");

  // Estados para diferentes modales dentro de la misma pagina
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    delete: false
  })

  const [selectedMagazine, setSelectedMagazine] = useState(null);

  const debouncedSearch = useDebounce(search, 1000);

  const { allPublishings, isAllPublishingsLoading } = usePublishings(pagination.pageIndex + 1,
    pagination.pageSize,
    publishing_type,
    sorting,
    debouncedSearch
  )

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  // Funciones para manejar modales
  const openModal = (modalType, magazine = null) => {
    setModals(prev => ({ ...prev, [modalType]: true }));
    if (magazine) setSelectedMagazine(magazine);
  };

  const closeModal = (modalType) => {
    setModals(prev => ({ ...prev, [modalType]: false }));
    setSelectedMagazine(null);
  };

  const isModalOpen = (modalType) => modals[modalType];

  // Handlers específicos
  const handleCreatePublishing = () => openModal('create');
  const handleEditPublishing = (publishing) => {
    openModal('update', publishing);
  };
  const handleDeletePublishing = (publishing) => openModal('delete', publishing);

  // Callbacks para las acciones
  const onCreateSuccess = () => {
    closeModal('create');
    // Refrescar datos si es necesario
  };

  const onEditSuccess = () => {
    closeModal('edit');
    // Refrescar datos si es necesario
  };

  const onDeleteSuccess = () => {
    closeModal('delete');
    // Refrescar datos si es necesario
  };

  return {
    // Estados
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,

    // Datos
    allPublishings,
    isAllPublishingsLoading,
    selectedMagazine,

    // Modales
    isModalOpen,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreatePublishing,
    handleEditPublishing,
    handleDeletePublishing,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess
  }

}