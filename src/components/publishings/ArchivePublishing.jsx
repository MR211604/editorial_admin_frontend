import { useArchivePublishing } from "../../hooks/usePublishings";
import Modal from "../ui/modal/Modal";
import toast from "react-hot-toast";

//Componente que sirve para poder archivar una publicacion
export default function ArchivePublishing({
  isOpen,
  onClose,
  onSuccess,
  selectedPublishing,
}) {
  const { archivePublishing } = useArchivePublishing(
    selectedPublishing?.original.id
  );

  const onArchive = () => {
    if (selectedPublishing?.original.is_archived === 1) {
      archivePublishing(0, {
        onSuccess: () => {
          toast.success("Publicación desarchivada exitosamente");
          onSuccess();
          onClose();
        },
      });
    } else {
      archivePublishing(1, {
        onSuccess: () => {
          toast.success("Publicación archivada exitosamente");
          onSuccess();
          onClose();
        },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Archivar Publicación"}
      saveButtonText={
        selectedPublishing?.original.is_archived === 1
          ? "Desarchivar"
          : "Archivar"
      }
      onSave={() => onArchive()}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <p>
        {selectedPublishing?.original.is_archived === 1
          ? `¿Está seguro que desea desarchivar la publicación "${selectedPublishing?.original.title}"?`
          : `¿Está seguro que desea archivar la publicación "${selectedPublishing?.original.title}"?`}
      </p>
    </Modal>
  );
}
