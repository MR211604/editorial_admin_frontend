import Modal from "../../components/ui/modal/Modal";

export default function MagazineCreate({ isOpen, onClose, onSuccess }) {

  console.log("Modal de creación de revista");

  const handleSave = () => {
    onSuccess();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nueva Revista"
      onSave={handleSave}
      saveButtonText={"Crear Revista"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      Ejemplo de contenido para crear una revista.
    </Modal>
  )
}
