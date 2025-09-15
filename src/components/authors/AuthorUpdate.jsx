import { useEffect } from "react";
import Modal from "../ui/modal/Modal";
import { useAuthors } from "../../hooks/useAuthors";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function AuthorUpdate({ isOpen, onClose, onSuccess, author }) {
  const { updateAuthor, isUpdating } = useAuthors();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      lastname: "",
    },
  });

  useEffect(() => {
    if (author) {
      reset({
        name: author.original?.name || author.name || "",
        lastname: author.original?.lastname || author.lastname || "",
      });
    }
  }, [author, reset]);

  const nameValue = watch("name");
  const lastnameValue = watch("lastname");
  useEffect(() => {
    if (errors.name?.type === "server") clearErrors("name");
  }, [nameValue]);
  useEffect(() => {
    if (errors.lastname?.type === "server") clearErrors("lastname");
  }, [lastnameValue]);

  const handleClose = () => {
    reset({ name: "", lastname: "" });
    onClose();
  };

  const onSubmit = (data) => {
    const updateData = {
      id: author.original?.id || author.id,
      ...data,
    };

    updateAuthor(updateData, {
      onSuccess: () => {
        toast.success("Autor actualizado exitosamente");
        onSuccess();
        handleClose();
      },
      onError: (error) => {
        console.error("Error editando autor:", error);
        const fieldErrors = error?.errors || {};
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          const messageText = Array.isArray(messages) ? messages.join(", ") : messages;
          setError(field, { type: "server", message: messageText });
        });
        if (error?.message) toast.error(error.message);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Editar Autor"
      onSave={handleSubmit(onSubmit)}
      saveButtonText={isUpdating ? "Actualizando..." : "Actualizar Autor"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="editAuthorName">Nombre</Form.Label>
          <Form.Control
            type="text"
            id="editAuthorName"
            isInvalid={!!errors.name}
            disabled={isUpdating}
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
              validate: (v) => (v?.trim().length ? true : "El nombre es obligatorio"),
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="editAuthorLastname">Apellido</Form.Label>
          <Form.Control
            type="text"
            id="editAuthorLastname"
            isInvalid={!!errors.lastname}
            disabled={isUpdating}
            {...register("lastname", {
              required: "El apellido es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
              validate: (v) => (v?.trim().length ? true : "El apellido es obligatorio"),
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
