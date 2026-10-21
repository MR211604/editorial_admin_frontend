import { Controller, useForm } from "react-hook-form";
import Modal from "../ui/modal/Modal";
import { useCreateBanner } from "../../hooks/useBanners";
import toast from "react-hot-toast";
import { formatErrors } from "../../helpers/formatErrors";
import { Form } from "react-bootstrap";
import { isSupportedVideoURL } from "../../helpers/banner";
import FormDropdownSelect from "../ui/FormDropdownSelect";

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
              maxLength: { value: 255, message: "Máximo 255 caracteres" },
              validate: (v) =>
                v?.trim().length
                  ? true
                  : "El nombre del recurso es obligatorio",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="editResourceURL">Enlace del video</Form.Label>
          <Form.Control
            type="url"
            id="editResourceURL"
            isInvalid={!!errors.resourceURL}
            disabled={isCreating}
            {...register("resourceURL", {
              required: "La URL del recurso es obligatoria",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 255, message: "Máximo 255 caracteres" },
              validate: (value) =>
                isSupportedVideoURL(value) ||
                "Ingresa un enlace válido de YouTube, TikTok, Facebook o Instagram",
            })}
          />
          <Form.Text className="text-muted">
            Pega el enlace de un video de YouTube, TikTok, Facebook o Instagram.
            Para TikTok usa el enlace directo que incluye “/video/”.
          </Form.Text>
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
              <FormDropdownSelect {...field}>
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </FormDropdownSelect>
            )}
          />
          <Form.Text className="text-muted">
            Solo puede haber un video activo; al activar este, se desactivará el
            actual.
          </Form.Text>
        </Form.Group>
      </Form>
    </Modal>
  );
}
