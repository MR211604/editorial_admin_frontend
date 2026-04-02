import { Controller, useForm } from "react-hook-form";
import Modal from "../ui/modal/Modal";
import { useCreateBanner } from "../../hooks/useBanners";
import toast from "react-hot-toast";
import { formatErrors } from "../../helpers/formatErrors";
import { Form } from "react-bootstrap";

export default function BannerCreate({ isOpen, onClose, onSuccess }) {
  const { createBanner, isCreating } = useCreateBanner();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      resourceURL: "",
      state: 0,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data) => {
    createBanner(data, {
      onSuccess: () => {
        toast.success("Banner creado exitosamente");
        onSuccess();
        handleClose();
      },
      onError: (error) => {
        if (error.errors) {
          formatErrors(error, setError);
        } else {
          toast.error(error.message || "Error al crear banner");
        }
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear nuevo banner"
      onSave={handleSubmit(onSubmit)}
      saveButtonText={"Crear banner"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="editTitle">Titulo</Form.Label>
          <Form.Control
            type="text"
            id="editTitle"
            isInvalid={!!errors.title}
            disabled={isCreating}
            {...register("title", {
              required: "El nombre del recurso es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
              validate: (v) =>
                v?.trim().length
                  ? true
                  : "El nombre del recurso es obligatorio",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="editResourceURL">URL del recurso</Form.Label>
          <Form.Control
            type="text"
            id="editResourceURL"
            isInvalid={!!errors.resourceURL}
            disabled={isCreating}
            {...register("resourceURL", {
              required: "La URL del recurso es obligatoria",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
              validate: (v) =>
                v?.trim().length ? true : "La URL del recurso es obligatoria",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.resourceURL?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Form.Select {...field}>
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </Form.Select>
            )}
          />
          <Form.Text className="text-muted">Estado del recurso</Form.Text>
        </Form.Group>
      </Form>
    </Modal>
  );
}
