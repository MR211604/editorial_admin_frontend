import { forwardRef, memo, useImperativeHandle } from "react";
import { useAuthorsTable } from "../../pages/hooks/useAuthorsTable";
import Modal from "../ui/modal/Modal";
import AuthorMultiselect from "./AuthorMultiselect";

/**
 * @param {Object} publishing - La publicacion en la que se esta trabajando.
 * @param {Object} ref - Referencia para acceder a los metodos del componente.
 * @return {JSX.Element} Componente de tabla de autores.
 */
const AuthorsTable = memo(
  forwardRef(({ publishing }, ref) => {
    const {
      search,
      setSearch,
      allAuthors,
      selectedAuthorsData,
      setSelectedAuthorsData,
      displayedAuthors,
      availableAuthors,
      authorsState,
      isOpen,
      handleAddAuthors,
      handleOpenAddAuthor,
      handleCancelAddAuthors,
      handleRemoveAuthor,
      handleDiscardTemporalChanges,
      confirmSavedAuthors,
      getAuthorsByStatus,
    } = useAuthorsTable(publishing);

    useImperativeHandle(
      ref,
      () => ({
        getAuthorsData: () => {
          const temporalAuthors = getAuthorsByStatus("temporal");
          const removedAuthors = authorsState.filter(
            (author) => author.action === "remove",
          );

          return {
            originalAuthors: publishing?.data.authors || [],
            visibleAuthors: displayedAuthors,
            hasChanges: temporalAuthors.length > 0 || removedAuthors.length > 0,
          };
        },
        confirmSavedAuthors,
      }),
      [
        confirmSavedAuthors,
        displayedAuthors,
        publishing?.data.authors,
        getAuthorsByStatus,
        authorsState,
      ],
    );

    // Obtener contadores para los botones
    const temporalCount = getAuthorsByStatus("temporal").length;
    const removedCount = authorsState.filter(
      (a) => a.action === "remove",
    ).length;

    return (
      <>
        <div className="table-responsive table-bordered">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Autor</th>
                <th>Estado</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {displayedAuthors.map((author, index) => (
                <tr key={author.idAuthor} className="align-middle">
                  <td>{index + 1}</td>
                  <td>
                    {author.name} {author.lastname}
                  </td>
                  <td>
                    {author.status === "original" && (
                      <span className="badge bg-primary">Guardado</span>
                    )}
                    {author.status === "temporal" && (
                      <span className="badge bg-warning">Pendiente</span>
                    )}
                  </td>
                  <td>
                    {author.status === "temporal" ? (
                      <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        onClick={() => handleRemoveAuthor(author.idAuthor)}
                      >
                        Quitar
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveAuthor(author.idAuthor)}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-end" colSpan="4">
                  {(temporalCount > 0 || removedCount > 0) && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={handleDiscardTemporalChanges}
                    >
                      Descartar cambios
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={handleOpenAddAuthor}
                  >
                    Agregar Autor
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <Modal
          isOpen={isOpen}
          onClose={handleCancelAddAuthors}
          title="Agregar autores"
          onSave={handleAddAuthors}
          saveButtonText={"Agregar autor(es)"}
          closeButtonText="Cancelar"
          showFooter={true}
          size="modal-xl"
        >
          <AuthorMultiselect
            allAuthors={allAuthors}
            availableAuthors={availableAuthors}
            search={search}
            setSearch={setSearch}
            setSelectedAuthorsData={setSelectedAuthorsData}
            selectedAuthorsData={selectedAuthorsData}
          />
        </Modal>
      </>
    );
  }),
);

export default AuthorsTable;
