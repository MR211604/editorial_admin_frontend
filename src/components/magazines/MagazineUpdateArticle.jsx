import { Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MDXEditorField from "../ui/MDXEditorField";
import Modal from "../ui/modal/Modal";
import { useUpdatePublishingDetail } from "../../hooks/usePublishingsDetails";
import { useNavigate } from "react-router-dom";

export default function MagazineUpdateArticle({
  isOpen,
  onClose,
  onEditSuccess,
  article,
}) {
  const { updatePublishingDetail } = useUpdatePublishingDetail(article?.id);

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: article?.title || "",
      URL: article?.URL || "",
      summary: article?.summary || "",
    },
  });

  const onSubmit = (data) => {
    const updateData = {
      ...data,
      repository_URL: data.URL,
      publishing_id: article.publishing_id,
    };
    updatePublishingDetail(updateData, {
      onSuccess: () => {
        onEditSuccess();
        navigate(0);
      },
      onError: (error) => {
        console.error("Error updating article:", error);
      },
    });
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
        title={`Editando ${article?.title}`}
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
            />
          </Row>
        </Form>
      </Modal>
    </>
  );
}
