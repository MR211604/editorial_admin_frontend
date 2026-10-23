import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formatErrors } from "../../helpers/formatErrors";
import {
  getLocationImageUrl,
  getRelativeLocationImagePath,
} from "../../helpers/locationImage";
import { useLocationMutations } from "../../hooks/useLocations";
import Modal from "../ui/modal/Modal";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export default function LocationForm({
  location,
  defaultSortOrder = 1,
  isOpen,
  onClose,
}) {
  const {
    createLocation,
    updateLocation,
    uploadLocationImage,
    isSaving,
  } = useLocationMutations();
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [logoError, setLogoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLock = useRef(false);
  const isFormSaving = isSaving || isSubmitting;
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: location?.name || "",
      address: location?.address || "",
      mapsQuery: location?.mapsQuery || "",
      sort_order: location?.sort_order ?? defaultSortOrder,
      state: location?.state ?? 1,
    },
  });

  useEffect(() => {
    reset({
      name: location?.name || "",
      address: location?.address || "",
      mapsQuery: location?.mapsQuery || "",
      sort_order: location?.sort_order ?? defaultSortOrder,
      state: location?.state ?? 1,
    });
    setLogoFile(null);
    setLogoError("");
  }, [defaultSortOrder, location, reset]);

  useEffect(() => {
    if (!logoFile) {
      setLogoPreview("");
      return undefined;
    }
    const objectUrl = URL.createObjectURL(logoFile);
    setLogoPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [logoFile]);

  const onSubmit = async (values) => {
    if (submitLock.current) return;

    if (!location && !logoFile) {
      setLogoError("Debes seleccionar un logo.");
      return;
    }

    submitLock.current = true;
    setIsSubmitting(true);
    const locationData = {
      ...values,
      state: Number(values.state),
      sort_order: Number(values.sort_order),
      image: getRelativeLocationImagePath(location?.image),
    };

    try {
      if (logoFile) {
        const formData = new FormData();
        formData.append("file", logoFile);
        formData.append("name", values.name);
        const uploadedImage = await uploadLocationImage(formData);
        locationData.image = getRelativeLocationImagePath(
          uploadedImage.data.filename ||
            uploadedImage.data.path ||
            uploadedImage.data.url,
        );
      }

      if (location?.idLocation) {
        await updateLocation({ id: location.idLocation, locationData });
        toast.success("Ubicación actualizada exitosamente");
      } else {
        await createLocation(locationData);
        toast.success("Ubicación creada exitosamente");
      }

      onClose();
    } catch (error) {
      if (error.errors) {
        formatErrors(error, setError);
      } else {
        toast.error(error.message || "Error guardando la ubicación");
      }
    } finally {
      submitLock.current = false;
      setIsSubmitting(false);
    }
  };

  const selectedLogoUrl = logoPreview || getLocationImageUrl(location?.image);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={location?.idLocation ? "Editar ubicación" : "Agregar ubicación"}
      onSave={handleSubmit(onSubmit)}
      saveButtonText={isFormSaving ? "Guardando..." : "Guardar ubicación"}
      closeButtonText="Cancelar"
      saveButtonDisabled={isFormSaving}
      closeButtonDisabled={isFormSaving}
      size="lg"
      showFooter
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors.name}
            disabled={isFormSaving}
            {...register("name", {
              required: "El nombre es obligatorio",
              maxLength: { value: 255, message: "Máximo 255 caracteres" },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            isInvalid={!!errors.address}
            disabled={isFormSaving}
            {...register("address", {
              required: "La dirección es obligatoria",
              maxLength: { value: 500, message: "Máximo 500 caracteres" },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Término de búsqueda en Google Maps</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors.mapsQuery}
            disabled={isFormSaving}
            {...register("mapsQuery", {
              required: "El término de búsqueda es obligatorio",
              maxLength: { value: 500, message: "Máximo 500 caracteres" },
            })}
          />
          <Form.Text className="text-muted">
            Este texto se usará para generar el enlace de Google Maps.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.mapsQuery?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="row">
          <Form.Group className="col-md-4 mb-3">
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

          <Form.Group className="col-md-4 mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              disabled={isFormSaving}
              {...register("state", { setValueAs: (value) => Number(value) })}
            >
              <option value={1}>Visible</option>
              <option value={0}>Oculta</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Logo</Form.Label>
          {selectedLogoUrl && (
            <div className="mb-2">
              <img
                src={selectedLogoUrl}
                alt="Vista previa del logo"
                style={{ maxWidth: 180, maxHeight: 100, objectFit: "contain" }}
              />
            </div>
          )}
          {!selectedLogoUrl && location?.image && (
            <p className="small text-muted">
              El logo actual se conservará si no seleccionas otro.
            </p>
          )}
          <Form.Control
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            disabled={isFormSaving}
            isInvalid={!!logoError}
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              setLogoError("");
              if (file && file.size > MAX_IMAGE_SIZE) {
                setLogoFile(null);
                setLogoError("El logo no puede superar los 2 MB.");
                event.target.value = "";
                return;
              }
              setLogoFile(file);
            }}
          />
          <Form.Control.Feedback type="invalid">
            {logoError}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            Formatos permitidos: JPG, PNG, GIF o WebP. Máximo 2 MB.
            {location?.image && " Si no seleccionas otro archivo, se conservará el logo actual."}
          </Form.Text>
        </Form.Group>
      </Form>
    </Modal>
  );
}
