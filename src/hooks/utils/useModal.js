import { useState } from "react"

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    console.log('Modal abierto');
  };
  const closeModal = () => {
    setIsOpen(false);
    console.log('Modal cerrado');
  }

  return {
    isOpen,
    openModal,
    closeModal
  }
}