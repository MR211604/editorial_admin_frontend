import { useState } from "react";

export const useModalCRUD = () => {
  const [modals, setModals] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const [selectedValue, setSelectedValue] = useState(null);

  const openModal = (modalType, value = null) => {
    setModals((prev) => ({ ...prev, [modalType]: true }));
    if (value) setSelectedValue(value);
  };

  const closeModal = (modalType) => {
    setModals((prev) => ({ ...prev, [modalType]: false }));
    setSelectedValue(null);
  };

  const isModalOpen = (modalType) => modals[modalType];

  const handleCreateValue = () => openModal("create");
  const handleEditValue = (value) => openModal("edit", value);
  const handleDeleteValue = (value) => openModal("delete", value);

  // Callbacks para las acciones
  const onCreateSuccess = () => {
    closeModal("create");
  };

  const onEditSuccess = () => {
    closeModal("edit");
  };

  const onDeleteSuccess = () => {
    closeModal("delete");
  };

  return {
    // Datos
    selectedValue,

    // Modal handlers
    isModalOpen,
    openModal,
    closeModal,

    // Handlers específicos

    handleCreateValue,
    handleEditValue,
    handleDeleteValue,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess,
  };
};
