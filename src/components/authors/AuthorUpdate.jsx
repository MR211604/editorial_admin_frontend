import { useState, useEffect } from 'react';
import Modal from '../ui/modal/Modal';
import { useAuthors } from '../../hooks/useAuthors';
import { Form } from 'react-bootstrap';

export default function AuthorUpdate({ isOpen, onClose, onSuccess, author }) {
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
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="editAuthorName">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="editAuthorName"
            name="name"
            value={authorForm.name}
            onChange={handleFormChange}
            disabled={isUpdating}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="editAuthorLastname">Apellido</Form.Label>
          <Form.Control
            type="text"
            id="editAuthorLastname"
            name="lastname"
            value={authorForm.lastname}
            onChange={handleFormChange}
            disabled={isUpdating}
          />
        </Form.Group>
      </Form>
    </Modal>
  );
}