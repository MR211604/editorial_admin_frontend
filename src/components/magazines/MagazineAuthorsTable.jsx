import { Fragment, useState } from 'react';
import { useAuthors } from '../../hooks/useAuthors';
import { useDebounce } from '../../hooks/utils/useDebounce';
import MagazineAuthorMultiselect from './MagazineAuthorMultiselect';
import Modal from '../ui/modal/Modal';
import { useModal } from '../../hooks/utils/useModal';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { memo } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

/**
 * @param {Object} publishing - La publicacion en la que se esta trabajando.
 */

const MagazineAuthorsTable = memo(forwardRef(({ publishing }, ref) => {

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Autores que apareceren en el multiselect
  const { allAuthors } = useAuthors(1, 20, null, debouncedSearch);

  const [selectedAuthorsData, setSelectedAuthorsData] = useState([]);
  const [temporalAuthorsData, setTemporalAuthorsData] = useState([]);
  const { isOpen, openModal, closeModal } = useModal();

  const displayedAuthors = useMemo(() => {
    return [...(publishing?.data.authors || []), ...temporalAuthorsData];
  }, [publishing?.data.authors, temporalAuthorsData]);

  const availableAuthors = useMemo(() => {
    // Se filtran los autores que ya estan en la publicacion
    return allAuthors?.data.filter(author =>
      !displayedAuthors.some(existing => existing.id === author.id)
    ) || [];
  }, [allAuthors?.data, displayedAuthors]);

  useImperativeHandle(ref, () => ({
    getAuthorsData: () => ({
      originalAuthors: publishing?.data.authors || [],
      temporalAuthors: temporalAuthorsData,
      allAuthors: displayedAuthors,
      hasChanges: temporalAuthorsData.length > 0
    }),
    clearTemporalAuthors: () => setTemporalAuthorsData([]),
  }), [publishing?.data.authors, temporalAuthorsData, displayedAuthors]);

  const handleOpenAddAuthor = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal();
  }, [openModal]);

  const handleAddAuthors = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setTemporalAuthorsData(prev => [...prev, ...selectedAuthorsData]);
    setSelectedAuthorsData([]);
    setSearch("");
    closeModal();
  }, [selectedAuthorsData, closeModal]);

  const handleCancelAddAuthors = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedAuthorsData([]);
    setSearch("");
    closeModal();
  }, [closeModal]);

  const handleRemoveTemporalAuthor = useCallback((authorId) => {
    setTemporalAuthorsData(prev => prev.filter(author => author.id !== +authorId));
  }, []);

  const handleRemoveAuthor = useCallback((authorId) => {
    console.log('Autor eliminado', authorId);
  }, []);

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
            {displayedAuthors.map((author, index) => {
              const isOriginal = publishing?.data.authors.some(orig => orig.id === author.id);
              const isTemporary = temporalAuthorsData.some(temp => temp.id === author.id);

              return (
                <tr key={author.id} className="align-middle">
                  <td>{index + 1}</td>
                  <td>{author.name} {author.lastname}</td>
                  <td>
                    {isOriginal && (
                      <span className="badge bg-primary">Guardado</span>
                    )}
                    {isTemporary && (
                      <span className="badge bg-warning">Pendiente</span>
                    )}
                  </td>
                  <td>
                    {isTemporary ? (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleRemoveTemporalAuthor(author.id)}
                      >
                        Quitar
                      </button>
                    ) : (
                      <button className="btn btn-danger btn-sm" onClick={() => handleRemoveAuthor(author.id)}>
                        Quitar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-end" colSpan="4">
                {temporalAuthorsData.length > 0 && (
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => setTemporalAuthorsData([])}
                  >
                    Descartar autores seleccionados ({temporalAuthorsData.length})
                  </button>
                )}
                <button type='button' className="btn btn-success btn-sm" onClick={handleOpenAddAuthor}>Agregar Autor</button>
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
      >
        <MagazineAuthorMultiselect
          allAuthors={allAuthors}
          availableAuthors={availableAuthors}
          search={search}
          setSearch={setSearch}
          setSelectedAuthorsData={setSelectedAuthorsData}
          selectedAuthorsData={selectedAuthorsData}
        // setShowAuthorSelect={setShowAuthorSelect}
        />
      </Modal>

    </>
  )
}));

export default MagazineAuthorsTable;
