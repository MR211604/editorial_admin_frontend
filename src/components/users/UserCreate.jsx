import { useForm } from "react-hook-form";
import Modal from "../ui/modal/Modal";

export default function UserCreate({ isOpen, onClose, onSuccess }) {
  const { handleSubmit, reset } = useForm({});

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    console.log(data);
    onSuccess();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear nuevo usuario"
      onSave={handleSubmit(onSubmit)}
      saveButtonText={"Crear Usuario"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <h1>ejemplo de modal jeje</h1>
    </Modal>
  );
}
