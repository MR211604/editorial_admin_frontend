import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Modal from "../ui/modal/Modal";
import SelectPublishingCategories from "../ui/SelectPublishingCategories";
import { useCreatePublishing } from "../../hooks/usePublishings";
import toast from "react-hot-toast";
import { NO_CATEGORY } from "../../constants/common";
import { generateUrlFromTitle } from "../../helpers/generateURL";

export default function PublishingCreate({
  isOpen,
  onClose,
  onSuccess,
  publishingType,
  modalTitle,
  modalSaveButtonText,
}) {
  const { createPublishing, isCreating } = useCreatePublishing();

  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      URL: "",
      category_id: "",
    },
  });

  const titleValue = watch("title");
  const urlValue = watch("URL");
  const categoryValue = watch("category_id");

  useEffect(() => {
    const generatedUrl = generateUrlFromTitle(titleValue);
    setValue("URL", generatedUrl);
  }, [titleValue, setValue]);

  useEffect(() => {
    if (errors.title?.type === "server") clearErrors("title");
  }, [clearErrors, errors.title?.type, titleValue]);

  useEffect(() => {
    if (errors.URL?.type === "server") clearErrors("URL");
  }, [clearErrors, errors.URL?.type, urlValue]);

  useEffect(() => {
    if (errors.category_id?.type === "server") clearErrors("category_id");
  }, [categoryValue, clearErrors, errors.category_id?.type]);

  const getPublishingLabel = () => {
    switch (publishingType) {
      case 1:
        return "Libro";
      case 2:
        return "Revista";
      case 3:
        return "Manual";
      default:
        return "Publicacion";
    }
  };

  const publishingLabel = getPublishingLabel();

  const handleSave = (data) => {
    const publishingData = {
      ...data,
      publishing_type: publishingType,
    };

    createPublishing(publishingData, {
      onSuccess: () => {
        toast.success(`${publishingLabel} creado exitosamente`);
        onSuccess();
        reset();
      },
      onError: (error) => {
        console.error("Error creating publishing:", error);
        const fieldErrors = error?.errors || {};
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          const messageText = Array.isArray(messages)
            ? messages.join(", ")
            : messages;
          setError(field, { type: "server", message: messageText });
        });
        toast.error(
          error?.message ||
            `No se pudo crear la ${publishingLabel.toLowerCase()}`
        );
      },
    });
  };

  const handleClose = () => {
    onClose();
    reset();
    clearErrors();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={modalTitle || "Crear Nueva Publicacion"}
      onSave={handleSubmit(handleSave)}
      saveButtonText={
        isCreating ? "Creando..." : modalSaveButtonText || "Crear Publicacion"
      }
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onSubmit={handleSubmit(handleSave)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="publishingTitle">Titulo</Form.Label>
          <Form.Control
            type="text"
            id="publishingTitle"
            {...register("title", { required: "El titulo es obligatorio" })}
            isInvalid={!!errors.title}
            disabled={isCreating}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="publishingUrl">URL</Form.Label>
          <Form.Control
            type="text"
            id="publishingUrl"
            {...register("URL", { required: "La URL es obligatoria" })}
            isInvalid={!!errors.URL}
            disabled={isCreating}
          />
          <Form.Control.Feedback type="invalid">
            {errors.URL?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoria de publicacion</Form.Label>
          <Controller
            name="category_id"
            control={control}
            rules={{
              required: "La categoria es obligatoria",
              validate: (value) => value !== "" || "Todas las categorias",
            }}
            render={({ field }) => (
              <>
                <SelectPublishingCategories
                  categoryType={publishingType}
                  defaultCategoryValue={NO_CATEGORY}
                  onCategoryChange={(e) => field.onChange(e.target.value)}
                  selectedCategory={field.value}
                  className={
                    "form-select " + (errors.category_id ? "is-invalid" : "")
                  }
                  disabled={isCreating}
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
