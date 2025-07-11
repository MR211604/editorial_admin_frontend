import { useState } from 'react';
import { useDebounce } from '../hooks/utils/useDebounce';
import { useAuthors } from '../hooks/useAuthors';
import Table from '../components/ui/table/Table';
import Modal from '../components/ui/modal/Modal';
import { useModal } from '../hooks/utils/useModal';

export default function AuthorsPage() {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  const [authorForm, setAuthorForm] = useState({
    name: '',
    lastname: ''
  });
  const debouncedSearch = useDebounce(search, 1000) // You can implement a debounce hook if needed
  const { allAuthors, isAllAuthorsLoading } = useAuthors(pagination.pageIndex + 1, pagination.pageSize, sorting, debouncedSearch);
  const { isOpen, openModal, closeModal } = useModal();

  const searchHandler = (e) => {
    setSearch(e.target.value);
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAuthorForm({
      ...authorForm,
      [name]: value
    });
  }

  const handleCloseModal = () => {
    setAuthorForm({
      name: '',
      lastname: ''
    });
    closeModal();
  }

  const handleCreateAuthor = () => {
    openModal();
  }

  const onSaveAuthor = () => {
    console.log("Author Data to Save:", authorForm);
    handleCloseModal();
  }

  const authorColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Nombre',
      accessorKey: 'name',
    },
    {
      header: 'Apellido',
      accessorKey: 'lastname',
    },
    {
      header: 'Operaciones',
      accessorKey: 'operations',
      cell: ({ row }) => (
        <div id={row.id} className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => console.log(row)}>Editar</button>
          <button className="btn btn-danger btn-sm" onClick={() => console.log(`Eliminar ${row.id}`)}>Eliminar</button>
        </div>
      )
    }
  ]

  return (
    <div>
      <h1>Autores</h1>
      <hr />
      <p>Bienvenido a la sección de autores. Aquí puedes encontrar información sobre los autores.</p>

      <div className='card'>
        <div className="card-header">
          Listado de autores
        </div>
        <div className='card-body'>
          <div className="d-flex flex-row pb-4">
            <button className='btn btn-success' onClick={handleCreateAuthor}>Agregar nuevo autor</button>
            <input type="text" className="d-flex justify-content-end w-50 form-control form-control-md ms-auto" placeholder="Buscar autor..." value={search} onChange={searchHandler} />
          </div>
          <Table paginatedTableData={allAuthors} columns={authorColumns} pagination={pagination} setPagination={setPagination} isTableDataLoading={isAllAuthorsLoading} sorting={sorting} setSorting={setSorting} setSearch={setSearch} />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleCloseModal} title="Crear Autor" showFooter={true} onSave={onSaveAuthor} saveButtonText="Guardar" closeButtonText="Cerrar">
        <form>
          <div className="mb-3">
            <label htmlFor="authorName" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="authorName"
              name="name"
              value={authorForm.name}
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="authorLastname" className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="authorLastname"
              name="lastname"
              value={authorForm.lastname}
              onChange={handleFormChange}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}
