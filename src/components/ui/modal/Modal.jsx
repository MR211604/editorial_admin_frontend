import Button from 'react-bootstrap/Button';
import { Modal as BootstrapModal } from 'react-bootstrap';

export default function Modal({
  isOpen,
  onClose,
  title = "Modal",
  children,
  onSave,
  saveButtonText = "Guardar",
  closeButtonText = "Cancelar",
  showFooter = true,
  size = "", // "", "modal-sm", "modal-lg", "modal-xl"
  ...props
}) {

  return (
    <>
      <BootstrapModal {...props} backdrop="static" style={{ zIndex: 1050 }} size={size} centered show={isOpen} onHide={onClose}>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{children}</BootstrapModal.Body>
        {
          showFooter && (
            <BootstrapModal.Footer>
              <Button variant="secondary" onClick={onClose}>
                {closeButtonText}
              </Button>
              {onSave && (
                <Button variant="primary" onClick={onSave}>
                  {saveButtonText}
                </Button>
              )}
            </BootstrapModal.Footer>
          )
        }
      </BootstrapModal>
    </>
  )
}
