import { useState } from "react";
import Modal from "../ui/modal/Modal";
import { useAuthors } from "../../hooks/useAuthors";

export default function CreateAuthor({ isOpen, onClose, onSuccess }) {

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
      <form>
        <div className="mb-3">
          <label htmlFor="createAuthorName" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="createAuthorName"
            name="name"
            value={authorForm.name}
            onChange={handleFormChange}
            disabled={isCreating}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="createAuthorLastname" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="createAuthorLastname"
            name="lastname"
            value={authorForm.lastname}
            onChange={handleFormChange}
            disabled={isCreating}
          />
        </div>
      </form>
    </Modal>
  )
}
