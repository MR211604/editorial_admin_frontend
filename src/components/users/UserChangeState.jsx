import toast from "react-hot-toast";
import Modal from "../ui/modal/Modal";
import { useUsers } from "../../hooks/useUsers";

function UserChangeState({ isOpen, onClose, onSuccess, selectedUser }) {
  const { changeUserStatus } = useUsers();

  const onChangeStatus = () => {
    changeUserStatus(
      { id: selectedUser?.id },
      {
        onSuccess: () => {
          toast.success(
            `Usuario ${
              selectedUser?.active === 1 ? "desactivado" : "activado"
            } exitosamente`
          );
          onSuccess();
          onClose();
        },
        onError: () => {
          toast.error("Error al cambiar el estado del usuario");
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${selectedUser?.active === 1 ? "desactivar" : "activar"} usuario`}
      saveButtonText={selectedUser?.active === 1 ? "desactivar" : "activar"}
      onSave={() => onChangeStatus()}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <p>
        {selectedUser?.active === 1
          ? `¿Está seguro que desea desactivar el usuario "${selectedUser?.token}"?`
          : `¿Está seguro que desea activar el usuario "${selectedUser?.token}"?`}
      </p>
    </Modal>
  );
}

export default UserChangeState;
