import { useState } from "react";
import { useAuthors } from "../../hooks/useAuthors";
import Modal from "../ui/modal/Modal";
import { Form } from "react-bootstrap";

export default function AuthorCreate({ isOpen, onClose, onSuccess }) {

  const [authorForm, setAuthorForm] = useState({
    name: '',
    lastname: ''
  });
  const { createAuthor, isCreating } = useAuthors()

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAuthorForm({
      ...authorForm,
      [name]: value
    });
  }

  const handleClose = () => {
    setAuthorForm({
      name: '',
      lastname: ''
    });
    // Logic to close the modal or navigate away
    onClose();
  }

  const handleSave = () => {
    if (!authorForm.name.trim() || !authorForm.lastname.trim()) {
      console.warn("Nombre y apellido son requeridos");
      return;
    }
    console.log("Creando autor:", authorForm);
    createAuthor(authorForm, {
      onSuccess: () => {
        console.log("Autor creado exitosamente");
        onSuccess();
        handleClose();
      },
      onError: (error) => {
        console.error("Error creando autor:", error);
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear Nuevo Autor"
      onSave={handleSave}
      saveButtonText={isCreating ? "Creando..." : "Crear Autor"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="createAuthorName">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="createAuthorName"
            name="name"
            value={authorForm.name}
            onChange={handleFormChange}
            disabled={isCreating}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="createAuthorLastname">Apellido</Form.Label>
          <Form.Control
            type="text"
            id="createAuthorLastname"
            name="lastname"
            value={authorForm.lastname}
            onChange={handleFormChange}
            disabled={isCreating}
          />
        </Form.Group>
      </Form>
    </Modal>
  )
}
