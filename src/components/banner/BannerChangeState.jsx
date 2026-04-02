import toast from "react-hot-toast";
import { useBanners } from "../../hooks/useBanners";
import Modal from "../ui/modal/Modal";

export default function BannerChangeState({
  isOpen,
  onClose,
  onSuccess,
  selectedBanner,
}) {
  const { changeBannerStatus } = useBanners();

  const onChangeStatus = () => {
    changeBannerStatus(
      { id: selectedBanner?.idBanner },
      {
        onSuccess: () => {
          toast.success(
            `Banner ${
              selectedBanner?.state === 1 ? "desactivado" : "activado"
            } exitosamente`,
          );
          onSuccess();
          onClose();
        },
        onError: () => {
          toast.error("Error al cambiar el estado del banner");
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${selectedBanner?.state === 1 ? "desactivar" : "activar"} banner`}
      saveButtonText={selectedBanner?.state === 1 ? "desactivar" : "activar"}
      onSave={() => onChangeStatus()}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <p>
        {selectedBanner?.state === 1
          ? `¿Está seguro que desea desactivar el banner "${selectedBanner?.title}"?`
          : `¿Está seguro que desea activar el banner "${selectedBanner?.title}"?`}
      </p>
    </Modal>
  );
}
