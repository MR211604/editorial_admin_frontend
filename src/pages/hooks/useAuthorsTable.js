import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthors } from "../../hooks/useAuthors";
import { useDebounce } from "../../hooks/utils/useDebounce";
import { useModal } from "../../hooks/utils/useModal";

export const useAuthorsTable = (publishing) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { allAuthors } = useAuthors(1, 20, null, debouncedSearch);
  const [selectedAuthorsData, setSelectedAuthorsData] = useState([]);

  // Estado que permite manejar los autores de la publicación
  const [authorsState, setAuthorsState] = useState([]);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    if (publishing?.data.authors) {
      setAuthorsState((prev) => {
        if (prev.length === 0) {
          return publishing.data.authors.map((author) => ({
            ...author,
            status: "original",
            action: "none",
          }));
        }
        return prev;
      });
    }
  }, [publishing?.data.authors]);

  const displayedAuthors = authorsState.filter(
    (author) => author.status !== "removed"
  );

  const availableAuthors = useMemo(() => {
    return (
      allAuthors?.data.filter(
        (author) => !authorsState.some((existing) => existing.id === author.id)
      ) || []
    );
  }, [allAuthors?.data, authorsState]);

  const getAuthorsByStatus = useCallback(
    (status) => {
      return authorsState.filter((author) => author.status === status);
    },
    [authorsState]
  );

  const handleOpenAddAuthor = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    },
    [openModal]
  );

  const handleAddAuthors = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Agregar autores seleccionados al estado unificado
      const newAuthors = selectedAuthorsData.map((author) => ({
        ...author,
        status: "temporal",
        action: "add",
      }));
      setAuthorsState((prev) => [...prev, ...newAuthors]);
      setSelectedAuthorsData([]);
      setSearch("");
      closeModal();
    },
    [selectedAuthorsData, closeModal]
  );

  const handleCancelAddAuthors = useCallback(() => {
    setSelectedAuthorsData([]);
    setSearch("");
    closeModal();
  }, [closeModal]);

  const handleRemoveAuthor = useCallback((authorId) => {
    setAuthorsState((prev) =>
      prev
        .map((author) => {
          if (author.id === authorId) {
            if (author.status === "temporal") {
              return null;
            } else {
              return {
                ...author,
                status: "removed",
                action: "remove",
              };
            }
          }
          return author;
        })
        .filter(Boolean)
    ); // Filtrar nulls
  }, []);

  // Función para descartar todos los cambios temporales
  const handleDiscardTemporalChanges = useCallback(() => {
    setAuthorsState((prev) =>
      prev
        .filter((author) => author.status !== "temporal")
        .map((author) => ({
          ...author,
          status: author.status === "removed" ? "original" : author.status,
          action: "none",
        }))
    );
  }, []);

  return {
    search,
    setSearch,

    allAuthors,
    availableAuthors,
    selectedAuthorsData,
    setSelectedAuthorsData,
    authorsState,
    setAuthorsState,
    displayedAuthors,

    isOpen,
    openModal,
    closeModal,

    handleAddAuthors,
    handleOpenAddAuthor,
    handleCancelAddAuthors,
    handleRemoveAuthor,
    handleDiscardTemporalChanges,

    getAuthorsByStatus,
  };
};
