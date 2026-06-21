import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthors } from "../../hooks/useAuthors";
import { useDebounce } from "../../hooks/utils/useDebounce";
import { useModal } from "../../hooks/utils/useModal";

const getOriginalAuthorsState = (authors = []) =>
  authors.map((author) => ({
    ...author,
    status: "original",
    action: "none",
  }));

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
        const hasPendingChanges = prev.some(
          (author) =>
            author.status === "temporal" || author.action === "remove",
        );

        if (hasPendingChanges) {
          return prev;
        }

        return getOriginalAuthorsState(publishing.data.authors);
      });
    }
  }, [publishing?.data.authors]);

  const displayedAuthors = authorsState.filter(
    (author) => author.status !== "removed",
  );

  const availableAuthors = useMemo(() => {
    return (
      allAuthors?.data.filter(
        (author) =>
          !authorsState.some(
            (existing) => existing.idAuthor === author.idAuthor,
          ),
      ) || []
    );
  }, [allAuthors?.data, authorsState]);

  const getAuthorsByStatus = useCallback(
    (status) => {
      return authorsState.filter((author) => author.status === status);
    },
    [authorsState],
  );

  const handleOpenAddAuthor = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    },
    [openModal],
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
    [selectedAuthorsData, closeModal],
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
          if (author.idAuthor === authorId) {
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
        .filter(Boolean),
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
        })),
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
    confirmSavedAuthors: () => {
      setAuthorsState((prev) =>
        getOriginalAuthorsState(
          prev.filter((author) => author.status !== "removed"),
        ),
      );
    },

    getAuthorsByStatus,
  };
};
