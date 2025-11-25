import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Modal from "../ui/modal/Modal";
import SelectPublishingCategories from "../ui/SelectPublishingCategories";
import { useCreatePublishing } from "../../hooks/usePublishings";
import toast from "react-hot-toast";
import { generateUrlFromTitle } from "../../helpers/generateURL";
import { formatErrors } from "../../helpers/formatErrors";

export default function PublishingCreate({
  isOpen,
  onClose,
  onSuccess,
  publishingType,
  categoryType,
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

  useEffect(() => {
    const generatedUrl = generateUrlFromTitle(titleValue);
    setValue("URL", generatedUrl);
  }, [titleValue, setValue]);

  const handleSave = (data) => {
    const publishingData = {
      ...data,
      publishing_type: publishingType,
      translations: [
        {
          language_id: 1,
          title: data.title,
          URL: data.URL,
        },
        // Por defecto se crea la traduccion en ingles vacia
        {
          language_id: 2,
          title: "-",
          URL: "-",
        },
      ],
    };
    createPublishing(publishingData, {
      onSuccess: () => {
        toast.success(`Publicación creada exitosamente`);
        onSuccess();
        reset();
      },
      onError: (error) => {
        if (error.errors) {
          formatErrors(error, setError);
        } else {
          toast.error(error?.message || `No se pudo crear la publicación.`);
        }
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
                  categoryType={categoryType}
                  enableDefaultValue={true}
                  defaultValue=""
                  defaultLabel="Seleccione una categoría"
                  onCategoryChange={(e) => field.onChange(e.target.value)}
                  selectedCategory={field.value}
                  filterActiveCategories={true}
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
