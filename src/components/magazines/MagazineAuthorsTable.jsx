import { Fragment, useState } from 'react';
import { useAuthors } from '../../hooks/useAuthors';
import { useDebounce } from '../../hooks/utils/useDebounce';
import MagazineAuthorMultiselect from './MagazineAuthorMultiselect';
import Modal from '../ui/modal/Modal';
import { useModal } from '../../hooks/utils/useModal';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { memo } from 'react';

const MagazineAuthorsTable = memo(({ publishing }) => {

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { allAuthors, isAllAuthorsPending } = useAuthors(1, 20, null, debouncedSearch);
  const [selectedAuthorsData, setSelectedAuthorsData] = useState([]);
  const { isOpen, openModal, closeModal } = useModal();
  const availableAuthors = useMemo(() => {
    return allAuthors?.data?.filter(author =>
      !publishing?.data.authors.some(existing => existing.id === author.id)
    ) || [];
  }, [allAuthors?.data, publishing?.data.authors]);

  const handleOpenAddAuthor = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    openModal();
  }, [openModal]);

  const handleAddAuthors = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Autores a agregar', selectedAuthorsData);
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

  return (
    <>
      <div className="table-responsive table-bordered">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No.</th>
              <th>Autor</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr className="align-middle">
              {publishing?.data.authors.map((author, index) => (
                <Fragment key={author.id}>
                  <td>{index + 1}</td>
                  <td>{author.name} {author.lastname}</td>
                  <td>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </Fragment>
              ))}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="text-end" colSpan="3">
                <button type='button' className="btn btn-success btn-sm" onClick={handleOpenAddAuthor}>Agregar Autor</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <Modal
        isOpen={isOpen}
        isLoading={isAllAuthorsPending}
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
});

export default MagazineAuthorsTable;
