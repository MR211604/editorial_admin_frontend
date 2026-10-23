import { useCallback, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useCreatePublishingDetail } from "../../hooks/usePublishingsDetails";
import { useDocumentMutations } from "../../hooks/useDocuments";
import MDXEditorField from "../ui/MDXEditorField";
import Modal from "../ui/modal/Modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { formatErrors } from "../../helpers/formatErrors";
import {
  replaceMdxImageUrls,
  uploadPendingMdxImages,
} from "../../helpers/mdxImages";

export default function MagazineCreateArticle({
  publishing,
  languageId,
  isOpen,
  onClose,
  onCreateSuccess,
}) {
  const { createPublishingDetail } = useCreatePublishingDetail();
  const { uploadDocumentImage } = useDocumentMutations();
  const [pendingImages, setPendingImages] = useState({});

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      URL: "",
      summary: "",
    },
  });

  const handleImageAdded = useCallback((url, file) => {
    setPendingImages((previous) => ({ ...previous, [url]: file }));
  }, []);

  const onSubmit = async (data) => {
    try {
      const uploadedImages = await uploadPendingMdxImages(
        pendingImages,
        uploadDocumentImage,
      );
      const articleData = {
        ...data,
        summary: replaceMdxImageUrls(data.summary, uploadedImages),
        language_id: languageId,
        repository_URL: data.URL,
        publishing_id: publishing?.data?.idPublishing,
      };
      createPublishingDetail(articleData, {
        onSuccess: () => {
          toast.success("Artículo creado exitosamente");
          onCreateSuccess();
          navigate(0);
        },
        onError: (error) => {
          if (error.errors) {
            formatErrors(error, setError);
          } else {
            toast.error(error.message || "Error al crear publicación");
          }
        },
      });
    } catch (error) {
      toast.error(error.message || "Error al subir imágenes del artículo");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        saveButtonText="Guardar Artículo"
        closeButtonText="Cancelar"
        size="lg"
        onSave={() => handleSubmit(onSubmit)()}
        title={`Agregar Artículo a ${publishing?.data.title}`}
        showFooter={true}
      >
        <Form>
          <Row className="mb-3">
            <Form.Group controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                isInvalid={!!errors.title}
                type="text"
                placeholder="Ingrese el título"
                {...register("title", {
                  required: "El título es obligatorio",
                  minLength: {
                    value: 3,
                    message: "El título debe tener al menos 3 caracteres",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="formURL">
              <Form.Label>URL</Form.Label>
              <Form.Control
                isInvalid={!!errors.URL}
                type="text"
                placeholder="Ingrese la URL"
                {...register("URL", {
                  required: "La URL es obligatoria",
                  minLength: {
                    value: 3,
                    message: "El título debe tener al menos 3 caracteres",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.URL?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <MDXEditorField
              name="summary"
              control={control}
              label={"Resumen"}
              error={errors.summary?.message}
              onImageAdded={handleImageAdded}
            />
          </Row>
        </Form>
      </Modal>
    </>
  );
}
