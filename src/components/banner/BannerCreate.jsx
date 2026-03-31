import { useForm } from "react-hook-form";
import Modal from "../ui/modal/Modal";

export default function BannerCreate({ isOpen, onClose, onSuccess }) {
  const { handleSubmit, reset } = useForm({});

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    onSuccess();
    console.log(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear nuevo banner"
      onSave={handleSubmit(onSubmit)}
      saveButtonText={"Crear banner"}
      closeButtonText="Cancelar"
      showFooter={true}
    ></Modal>
  );
}
