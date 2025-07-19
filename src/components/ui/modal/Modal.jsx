import { useEffect } from 'react';
import { useState } from 'react';

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
  modalId = "reusableModal",
  closeOnBackdropClick = false, // Si se debe cerrar al hacer click en el backdrop
}) {

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {    
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
      }, 300); // 300ms coincide con la duración de la animación de Bootstrap
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Manejar click en el backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div
        className={`modal-backdrop ${isAnimating ? 'fade show' : 'fade'}`}
        onClick={handleBackdropClick}
        style={{
          // backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1040,
          cursor: closeOnBackdropClick ? 'pointer' : 'default',
        }}
      />

      {/* Modal */}
      <div
        className={`modal ${isAnimating ? 'fade show' : 'fade'} d-block`}
        id={modalId}
        tabIndex="-1"
        aria-labelledby={`${modalId}Label`}
        // aria-hidden={!isOpen}
        style={{
          display: 'block',
          zIndex: 1050,          
        }}
        onClick={handleBackdropClick}
      >
        <div className={`modal-dialog modal-dialog-centered ${size}`}>
          <div className="modal-content" >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${modalId}Label`}>
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            {showFooter && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  {closeButtonText}
                </button>
                {onSave && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSave}
                  >
                    {saveButtonText}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
