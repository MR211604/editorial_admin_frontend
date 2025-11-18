import { useForm } from "react-hook-form";
import Modal from "../ui/modal/Modal";
import toast from "react-hot-toast";
import { Form } from "react-bootstrap";
import { formatErrors } from "../../helpers/formatErrors";
import { useUserRoles } from "../../hooks/useUserRoles";

export default function RolCreate({ isOpen, onClose, onSuccess }) {
  const { createRol, isCreating } = useUserRoles();

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
      description: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    createRol(data, {
      onSuccess: () => {
        toast.success("Rol creado exitosamente");
        onSuccess();
        handleClose();
      },
      onError: (error) => {
        if (error?.errors) {
          formatErrors(error, setError);
        } else {
          toast.error(error.message || "Error al crear rol");
        }
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear nuevo rol"
      onSave={handleSubmit(onSubmit)}
      saveButtonText={"Crear Rol"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="createRolName">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="createRolName"
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
          <Form.Label htmlFor="description">Descripción</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            id="description"
            isInvalid={!!errors.description}
            disabled={isCreating}
            {...register("description")}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal>
  );
}
