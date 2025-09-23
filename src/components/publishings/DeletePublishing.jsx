import toast from "react-hot-toast";
import { useDeletePublishing } from "../../hooks/usePublishings";
import Modal from "../ui/modal/Modal";

export default function DeletePublishing({
  isOpen,
  onClose,
  onSuccess,
  selectedPublishing,
}) {
  const { deletePublishingMutation } = useDeletePublishing(
    selectedPublishing?.original.id
  );

  //Logica para borrar una publicacion
  const onDelete = () => {
    console.log("Borrar publicación:", selectedPublishing?.original.id);
    deletePublishingMutation(
      {},
      {
        onSuccess: () => {
          toast.success("Publicación borrada exitosamente");
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
      title={`Borrar ${selectedPublishing?.original.title}`}
      saveButtonText={"Borrar publicación"}
      onSave={() => onDelete()}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <p>
        ¿Está seguro que desea borrar la publicación "
        <b>{selectedPublishing?.original.title}</b>"? Esta acción no se puede
        deshacer.
      </p>
    </Modal>
  );
}
