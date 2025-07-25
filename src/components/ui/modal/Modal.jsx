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
      <style>
        {`
          .mdx-editor [role="dialog"],
          .mdx-editor [data-floating-ui-portal],
          .mdx-editor .floating-ui-portal,
          .mdx-editor [role="menu"],
          .mdx-editor [role="listbox"],
          .mdx-editor .mdx-toolbar-dropdown,
          .mdx-editor .mdx-select-trigger,
          .mdx-editor [data-state="open"],
          [data-radix-portal] {
            z-index: 999999 !important;
          }
          
          .mdx-editor [data-radix-popper-content-wrapper] {
            z-index: 999999 !important;
          }
          
          .mdx-editor .mdx-toolbar [role="button"][aria-expanded="true"] + * {
            z-index: 999999 !important;
          }

          /* Específico para los dropdowns de MDX */
          [data-radix-portal] * {
            z-index: 999999 !important;
          }

          /* Bootstrap modal con z-index menor */
          .modal {
            z-index: 1040 !important;
          }

          .modal-backdrop {
            z-index: 1039 !important;
          }
        `}
      </style>
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
