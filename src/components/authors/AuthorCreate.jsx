import { useAuthors } from "../../hooks/useAuthors";
import Modal from "../ui/modal/Modal";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { formatErrors } from "../../helpers/formatErrors";

export default function AuthorCreate({ isOpen, onClose, onSuccess }) {
  const { createAuthor, isCreating } = useAuthors();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      lastname: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    createAuthor(data, {
      onSuccess: () => {
        toast.success("Autor creado exitosamente");
        onSuccess();
        handleClose();
      },
      onError: (error) => {
        if (error?.errors) {
          formatErrors(error, setError);
        }
        if (error?.message) toast.error(error.message);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear Nuevo Autor"
      onSave={handleSubmit(onSubmit)}
      saveButtonText={isCreating ? "Creando..." : "Crear Autor"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="createAuthorName">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="createAuthorName"
            isInvalid={!!errors.name}
            disabled={isCreating}
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
              validate: (v) =>
                v?.trim().length ? true : "El nombre es obligatorio",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="createAuthorLastname">Apellido</Form.Label>
          <Form.Control
            type="text"
            id="createAuthorLastname"
            isInvalid={!!errors.lastname}
            disabled={isCreating}
            {...register("lastname", {
              required: "El apellido es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
              validate: (v) =>
                v?.trim().length ? true : "El apellido es obligatorio",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastname?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal>
  );
}
