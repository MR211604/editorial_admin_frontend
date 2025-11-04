import toast from "react-hot-toast";
import { useCategoryChangeStatus } from "../../hooks/useCategories";
import Modal from "../ui/modal/Modal";

function CategoryChangeStatus({
  isOpen,
  onClose,
  onSuccess,
  selectedCategory,
}) {
  const { changeCategoryStatus } = useCategoryChangeStatus(
    selectedCategory?.id
  );

  console.log("Selected Category in ChangeStatus:", selectedCategory);

  const onChangeStatus = () => {
    changeCategoryStatus(
      {},
      {
        onSuccess: () => {
          toast.success(
            `Categoría ${
              selectedCategory?.state === 1 ? "desactivada" : "activada"
            } exitosamente`
          );
          onSuccess();
          onClose();
        },
        onError: () => {
          toast.error("Error al cambiar el estado de la categoría");
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${
        selectedCategory?.state === 1 ? "desactivar" : "activar"
      } categoria`}
      saveButtonText={selectedCategory?.state === 1 ? "desactivar" : "activar"}
      onSave={() => onChangeStatus()}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <p>
        {selectedCategory?.state === 1
          ? `¿Está seguro que desea desactivar la categoria "${selectedCategory?.title}"?`
          : `¿Está seguro que desea activar la categoria "${selectedCategory?.title}"?`}
      </p>
    </Modal>
  );
}

export default CategoryChangeStatus;
