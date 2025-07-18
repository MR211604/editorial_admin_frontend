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
  const [selectedCategory, setSelectedCategory] = useState("");

  // Estados para diferentes modales dentro de la misma pagina
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    delete: false
  })

  const [selectedPublishing, setSelectedPublishing] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  const { allPublishings, isAllPublishingsLoading } = usePublishings(pagination.pageIndex + 1,
    pagination.pageSize,
    publishing_type,
    sorting,
    debouncedSearch,
    selectedCategory
  )

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  }

  // Funciones para manejar modales
  const openModal = (modalType, publishing = null) => {
    setModals(prev => ({ ...prev, [modalType]: true }));
    if (publishing) setSelectedPublishing(publishing);
  };

  const closeModal = (modalType) => {
    setModals(prev => ({ ...prev, [modalType]: false }));
    setSelectedPublishing(null);
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
    selectedCategory,

    // Datos
    allPublishings,
    isAllPublishingsLoading,
    selectedPublishing,

    // Modales
    isModalOpen,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreatePublishing,
    handleEditPublishing,
    handleDeletePublishing,
    handleCategoryChange,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess
  }

}