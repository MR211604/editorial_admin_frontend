import Modal from "../ui/modal/Modal";
import { useUpdateBanner } from "../../hooks/useBanners";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formatErrors } from "../../helpers/formatErrors";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import { isSupportedVideoURL } from "../../helpers/banner";
import FormDropdownSelect from "../ui/FormDropdownSelect";

export default function BannerUpdate({
  isOpen,
  onClose,
  onSuccess,
  selectedBanner,
}) {
  const { updateBanner, isUpdating } = useUpdateBanner(
    selectedBanner?.idBanner,
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: selectedBanner?.title || "",
      resourceURL: selectedBanner?.resourceURL || "",
      state: selectedBanner?.state || 0,
    },
  });

  useEffect(() => {
    if (selectedBanner) {
      reset({
        title: selectedBanner.original?.title || selectedBanner.title || "",
        resourceURL:
          selectedBanner.original?.resourceURL ||
          selectedBanner.resourceURL ||
          "",
        state: selectedBanner.original?.state || selectedBanner.state || 0,
      });
    }
  }, [selectedBanner, reset]);

  const nameValue = watch("title");
  const lastnameValue = watch("resourceURL");
  useEffect(() => {
    if (errors.title?.type === "server") clearErrors("title");
  }, [nameValue, clearErrors, errors.title]);
  useEffect(() => {
    if (errors.resourceURL?.type === "server") clearErrors("resourceURL");
  }, [lastnameValue, clearErrors, errors.resourceURL]);

  const onSubmit = (data) => {
    const updateData = {
      id: selectedBanner?.idBanner,
      ...data,
    };

    updateBanner(updateData, {
      onSuccess: () => {
        toast.success("Banner actualizado exitosamente");
        onSuccess();
      },
      onError: (error) => {
        if (error.errors) {
          formatErrors(error, setError);
        } else {
          toast.error(error.message || "Error al actualizar banner");
        }
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Banner"
      onSave={handleSubmit(onSubmit)}
      saveButtonText={isUpdating ? "Actualizando..." : "Actualizar banner"}
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
            disabled={isUpdating}
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
            disabled={isUpdating}
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
