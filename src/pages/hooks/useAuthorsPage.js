import { useState } from "react";
import { useDebounce } from "../../hooks/utils/useDebounce";
import { useAuthors } from "../../hooks/useAuthors";
import { useModalCRUD } from "../../hooks/utils/useModalCRUD";
import { useEffect } from "react";

export const useAuthorsPage = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");

  const {
    selectedValue,
    // Modal handlers
    isModalOpen,
    openModal,
    closeModal,

    // Handlers específicos

    handleCreateValue,
    handleEditValue,
    handleDeleteValue,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess
  } = useModalCRUD();


  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      pageIndex: 0
    }));
  }, [debouncedSearch]);


  const { allAuthors, isAllAuthorsLoading } = useAuthors(
    pagination.pageIndex + 1,
    pagination.pageSize,
    sorting,
    debouncedSearch
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
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
    selectedValue,

    // Modal handlers
    isModalOpen,
    openModal,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreateValue,
    handleEditValue,
    handleDeleteValue,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess
  };
}