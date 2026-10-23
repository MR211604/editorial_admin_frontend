import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formatErrors } from "../../helpers/formatErrors";
import { generateUrlFromTitle } from "../../helpers/generateURL";
import { useDocumentMutations } from "../../hooks/useDocuments";
import MDXEditorField from "../ui/MDXEditorField";
import Modal from "../ui/modal/Modal";
import {
  replaceMdxImageUrls,
  uploadPendingMdxImages,
} from "../../helpers/mdxImages";

const createSlug = (title) => generateUrlFromTitle(title).replace(/_/g, "-");

export default function DocumentForm({
  document,
  defaultSortOrder = 0,
  isOpen,
  onClose,
  onSuccess,
}) {
  const {
    createDocument,
    updateDocument,
    uploadDocumentImage,
    isSaving,
  } = useDocumentMutations();
  const [pendingImages, setPendingImages] = useState({});
  const [slugEdited, setSlugEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLock = useRef(false);
  const isFormSaving = isSaving || isSubmitting;
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: document?.title || "",
      slug: document?.slug || "",
      content: document?.content || "",
      state: document?.state ?? 1,
      sort_order: document?.sort_order ?? defaultSortOrder,
    },
  });

  useEffect(() => {
    reset({
      title: document?.title || "",
      slug: document?.slug || "",
      content: document?.content || "",
      state: document?.state ?? 1,
      sort_order: document?.sort_order ?? defaultSortOrder,
    });
    setSlugEdited(Boolean(document?.slug));
    setPendingImages({});
  }, [defaultSortOrder, document, reset]);

  const handleImageAdded = (url, file) => {
    setPendingImages((previous) => ({ ...previous, [url]: file }));
  };

  const onSubmit = async (formValues) => {
    if (submitLock.current) return;

    submitLock.current = true;
    setIsSubmitting(true);
    const documentData = { ...formValues };

    try {
      const uploadedImages = await uploadPendingMdxImages(
        pendingImages,
        uploadDocumentImage,
      );
      documentData.content = replaceMdxImageUrls(
        documentData.content,
        uploadedImages,
      );

      if (document?.idDocument) {
        await updateDocument({ id: document.idDocument, documentData });
        toast.success("Documento actualizado exitosamente");
      } else {
        await createDocument(documentData);
        toast.success("Documento creado exitosamente");
      }

      onSuccess();
      onClose();
    } catch (error) {
      if (error.errors) {
        formatErrors(error, setError);
      } else {
        toast.error(error.message || "Error guardando el documento");
      }
    } finally {
      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  const titleField = register("title", {
    required: "El título es obligatorio",
    maxLength: { value: 255, message: "Máximo 255 caracteres" },
    onChange: (event) => {
      if (!slugEdited) {
        setValue("slug", createSlug(event.target.value), {
          shouldValidate: true,
        });
      }
    },
  });
  const slugField = register("slug", {
    required: "El slug es obligatorio",
    maxLength: { value: 191, message: "Máximo 191 caracteres" },
    pattern: {
      value: /^[a-zA-Z0-9_-]+$/,
      message: "Usa solo letras, números y guiones",
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={document?.idDocument ? "Editar documento" : "Crear documento"}
      onSave={handleSubmit(onSubmit)}
      saveButtonText={isFormSaving ? "Guardando..." : "Guardar documento"}
      closeButtonText="Cancelar"
      saveButtonDisabled={isFormSaving}
      closeButtonDisabled={isFormSaving}
      size="xl"
      showFooter
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors.title}
            disabled={isFormSaving}
            {...titleField}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="row">
          <Form.Group className="col-md-8 mb-3">
            <Form.Label>Ruta personalizada (slug)</Form.Label>
            <div className="input-group">
              <span className="input-group-text">/documentos/</span>
              <Form.Control
                type="text"
                isInvalid={!!errors.slug}
                disabled={isFormSaving}
                {...slugField}
                onChange={(event) => {
                  setSlugEdited(true);
                  slugField.onChange(event);
                }}
              />
            </div>
            <Form.Text className="text-muted">
              Se sugiere desde el título; puedes personalizarlo.
            </Form.Text>
            {errors.slug && (
              <div className="text-danger small">{errors.slug.message}</div>
            )}
          </Form.Group>

          <Form.Group className="col-md-2 mb-3">
            <Form.Label>Orden</Form.Label>
            <Form.Control
              type="number"
              min="0"
              isInvalid={!!errors.sort_order}
              disabled={isFormSaving}
              {...register("sort_order", {
                required: "El orden es obligatorio",
                valueAsNumber: true,
                min: { value: 0, message: "El orden no puede ser negativo" },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sort_order?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-md-2 mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select disabled={isFormSaving} {...register("state")}>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </Form.Select>
          </Form.Group>
        </div>

        <MDXEditorField
          name="content"
          control={control}
          label="Contenido del documento (MDX)"
          helpText="Este contenido se mostrará en la página pública del documento."
          onImageAdded={handleImageAdded}
        />
      </Form>
    </Modal>
  );
}
