import { useState } from "react"
import { useUserPrivileges } from "../../hooks/useUserPrivileges"

export const useUserPrivilegesPage = () => {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [modals, setModals] = useState({
    create: false,
    edit: false,
    delete: false
  })

  const [selectedUserPrivilege, setSelectedUserPrivilege] = useState(null);

  const { allUserPrivileges, isAllUserPrivilegesLoading } = useUserPrivileges(pagination.pageIndex + 1, pagination.pageSize);

  const openModal = (modalType, userPrivilege = null) => {
    setModals(prev => ({ ...prev, [modalType]: true }));
    if (userPrivilege) setSelectedUserPrivilege(userPrivilege);
  };

  const closeModal = (modalType) => {
    setModals(prev => ({ ...prev, [modalType]: false }));
    setSelectedUserPrivilege(null);
  };

  const isModalOpen = (modalType) => modals[modalType];

  const handleCreateUserPrivilege = () => openModal('create');
  const handleEditUserPrivilege = (userPrivilege) => openModal('update', userPrivilege);
  const handleDeleteUserPrivilege = (userPrivilege) => openModal('delete', userPrivilege);

  const onCreateSuccess = () => {
    closeModal('create');
  };

  const onEditSuccess = () => {
    closeModal('edit');
  };

  const onDeleteSuccess = () => {
    closeModal('delete');
  };

  return {
    // Estados básicos
    pagination,
    setPagination,

    // Datos
    allUserPrivileges,
    isAllUserPrivilegesLoading,
    selectedUserPrivilege,

    // Modal handlers
    isModalOpen,
    openModal,
    closeModal,

    // Handlers específicos
    handleCreateUserPrivilege,
    handleEditUserPrivilege,
    handleDeleteUserPrivilege,

    // Callbacks de éxito
    onCreateSuccess,
    onEditSuccess,
    onDeleteSuccess
  }


}
