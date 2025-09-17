import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Modal from "../../components/ui/modal/Modal";
import SelectPublishingCategories from "../ui/SelectPublishingCategories";
import { useCreatePublishing } from "../../hooks/usePublishings";
import { useNavigate } from "react-router-dom";
import { NO_CATEGORY } from "../../constants/common";

export default function CreatePublishing({
  isOpen,
  onClose,
  onSuccess,
  publishingType,
  modalTitle,
  modalSaveButtonText,
}) {
  const { createPublishing } = useCreatePublishing();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const handleSave = (data) => {
    const publishingData = {
      ...data,
      publishing_type: publishingType,
    };
    createPublishing(publishingData, {
      onSuccess: () => {
        onSuccess();
        navigate(0);
      },
      onError: (error) => {
        console.error("Error creating publishing:", error);
      },
    });
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle || "Crear Nueva Publicación"}
      onSave={handleSubmit(handleSave)}
      saveButtonText={modalSaveButtonText || "Crear Publicación"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onAbort={handleSubmit(handleSave)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="bookTitle">Título</Form.Label>
          <Form.Control
            type="text"
            id="bookTitle"
            {...register("title", { required: "El título es obligatorio" })}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="bookUrl">URL</Form.Label>
          <Form.Control
            type="text"
            id="bookUrl"
            {...register("URL", { required: "La URL es obligatoria" })}
            isInvalid={!!errors.URL}
          />
          <Form.Control.Feedback type="invalid">
            {errors.URL?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoria de publicación</Form.Label>
          <Controller
            name="category_id"
            control={control}
            rules={{
              required: "La categoría es obligatoria",
              validate: (value) => value !== "" || "Todas las categorias",
            }}
            render={({ field }) => (
              <>
                <SelectPublishingCategories
                  categoryType={publishingType}
                  defaultCategoryValue={NO_CATEGORY}
                  onCategoryChange={(e) => field.onChange(e.target.value)}
                  selectedCategory={field.value}
                  className={`form-select ${
                    errors.category_id ? "is-invalid" : ""
                  }`}
                />
                {errors.category_id && (
                  <div className="invalid-feedback">
                    {errors.category_id.message}
                  </div>
                )}
              </>
            )}
          />
        </Form.Group>
      </Form>
    </Modal>
  );
}
