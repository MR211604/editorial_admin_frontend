import { useState, useEffect } from 'react';
import Modal from '../ui/modal/Modal';
import { useAuthors } from '../../hooks/useAuthors';

export default function UpdateAuthor({ isOpen, onClose, onSuccess, author }) {
  const [authorForm, setAuthorForm] = useState({
    name: '',
    lastname: ''
  });
  const { updateAuthor, isUpdating } = useAuthors();
  
  useEffect(() => {
    if (author) {
      setAuthorForm({
        name: author.original?.name || author.name || '',
        lastname: author.original?.lastname || author.lastname || ''
      });
    }
  }, [author]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAuthorForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    setAuthorForm({ name: '', lastname: '' });
    onClose();
  };

  const handleSave = () => {
    const updateData = {
      id: author.original?.id || author.id,
      ...authorForm
    };

    if (!updateData.name.trim() || !updateData.lastname.trim()) {
      console.warn("Nombre y apellido son requeridos");
      return;
    }

    updateAuthor(updateData, {
      onSuccess: () => {
        console.log("Autor editado exitosamente");
        onSuccess();
        handleClose();
      },
      onError: (error) => {
        console.error("Error editando autor:", error);
      }
    });

  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Editar Autor"
      onSave={handleSave}
      saveButtonText={isUpdating ? "Actualizando..." : "Actualizar Autor"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <form>
        <div className="mb-3">
          <label htmlFor="editAuthorName" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="editAuthorName"
            name="name"
            value={authorForm.name}
            onChange={handleFormChange}
            disabled={isUpdating}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editAuthorLastname" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="editAuthorLastname"
            name="lastname"
            value={authorForm.lastname}
            onChange={handleFormChange}
            disabled={isUpdating}
          />
        </div>
      </form>
    </Modal>
  );
}