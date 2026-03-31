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
  const { archivePublishing } = useArchivePublishing();

  const onArchive = () => {
    archivePublishing(
      { id: selectedPublishing?.original.id },
      {
        onSuccess: () => {
          toast.success(
            `Publicación ${
              selectedPublishing?.original.state === 0
                ? "desarchivada"
                : "archivada"
            } exitosamente`,
          );
          onSuccess();
          onClose();
        },
        onError: () => {
          toast.error("Error al cambiar el estado del usuario");
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${
        selectedPublishing?.original.state === 0 ? "Desarchivar" : "Archivar"
      } Publicación`}
      saveButtonText={
        selectedPublishing?.original.state === 0 ? "Desarchivar" : "Archivar"
      }
      onSave={() => onArchive()}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <p>
        {selectedPublishing?.original.state === 0
          ? `¿Está seguro que desea desarchivar la publicación "${selectedPublishing?.original.title}"?`
          : `¿Está seguro que desea archivar la publicación "${selectedPublishing?.original.title}"?`}
      </p>
    </Modal>
  );
}
