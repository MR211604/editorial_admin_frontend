import { useState } from "react";
import { useDebounce } from "../../hooks/utils/useDebounce";
import { useAuthors } from "../../hooks/useAuthors";

export const useAuthorsPage = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  
  // Estados para diferentes modales
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    delete: false
  });
  
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const debouncedSearch = useDebounce(search, 1000);
  const { allAuthors, isAllAuthorsLoading } = useAuthors(
    pagination.pageIndex + 1, 
    pagination.pageSize, 
    sorting, 
    debouncedSearch
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  // Funciones para manejar modales
  const openModal = (modalType, author = null) => {
    setModals(prev => ({ ...prev, [modalType]: true }));
    if (author) setSelectedAuthor(author); //! Guarda el autor seleccionado en selectedAuthor
  };

  const closeModal = (modalType) => {
    setModals(prev => ({ ...prev, [modalType]: false }));
    setSelectedAuthor(null);
  };

  const isModalOpen = (modalType) => modals[modalType];

  // Handlers específicos
  const handleCreateAuthor = () => openModal('create');
  const handleEditAuthor = (author) => {
    openModal('update', author);    
  };
  const handleDeleteAuthor = (author) => openModal('delete', author);

  // Callbacks para las acciones
  const onCreateSuccess = () => {
    closeModal('create');
  };

  const onEditSuccess = () => {
    closeModal('edit');
  };

  const onDeleteSuccess = () => {
    closeModal('delete');
  };

  return {
    // Estados básicos
    pagination,
    setPagination,
    sorting,
    setSorting,
    search,
    setSearch,
    
    // Datos
    allAuthors,
    isAllAuthorsLoading,
    selectedAuthor,
    
    // Modal handlers
    isModalOpen,
    openModal,
    closeModal,
    
    // Handlers específicos
    searchHandler,
    handleCreateAuthor,
    handleEditAuthor,
    handleDeleteAuthor,
    
    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess
  };
}