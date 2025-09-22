import { useState } from "react";
import { useDebounce } from "../../hooks/utils/useDebounce";
import { usePublishings } from "../../hooks/usePublishings";

import { useModalCRUD } from "../../hooks/utils/useModalCRUD";
import { useEffect } from "react";

export const usePublishingsPage = (publishing_type) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterArchived, setFilterArchived] = useState(0);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [debouncedSearch]);

  const {
    isModalOpen,
    closeModal,
    handleCreateValue,
    handleEditValue,
    handleDeleteValue,
    onCreateSuccess,
    onDeleteSuccess,
    onEditSuccess,
    selectedValue: selectedPublishing,
  } = useModalCRUD();

  const { allPublishings, isAllPublishingsLoading } = usePublishings(
    pagination.pageIndex + 1,
    pagination.pageSize,
    publishing_type,
    sorting,
    debouncedSearch,
    selectedCategory,
    filterArchived
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleArchivedFilterChange = (e) => {
    setFilterArchived(e.target.value);
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
    filterArchived,

    // Datos
    allPublishings,
    isAllPublishingsLoading,
    selectedPublishing,

    // Modales
    isModalOpen,
    closeModal,

    // Handlers específicos
    searchHandler,
    handleCreateValue,
    handleEditValue,
    handleDeleteValue,
    handleCategoryChange,
    handleArchivedFilterChange,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess,
  };
};
