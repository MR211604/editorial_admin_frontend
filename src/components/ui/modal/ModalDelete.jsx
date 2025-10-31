import toast from "react-hot-toast";
import Modal from "./Modal";

export default function ModalDelete({
  isOpen,
  onClose,
  onSuccess,
  deleteMutationFn,
  title,
}) {
  //Logica para borrar una publicacion
  const onDelete = () => {
    deleteMutationFn(
      {},
      {
        onSuccess: () => {
          toast.success("Registro borrado exitosamente");
          onSuccess();
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Borrar ${title || "Publicación"}`}
      saveButtonText={"Borrar"}
      onSave={() => onDelete()}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <p>
        ¿Está seguro que desea borrar "<b>{title}</b>"? Esta acción no se puede
        deshacer.
      </p>
    </Modal>
  );
}
