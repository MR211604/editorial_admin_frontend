import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateCategory } from "../../hooks/useCategories";
import Modal from "../ui/modal/Modal";
import { formatErrors } from "../../helpers/formatErrors";
import { useCategoryTypes } from "../../hooks/useCategoryTypes";
import CustomSelect from "../ui/CustomSelect";
import { generateUrlFromTitle } from "../../helpers/generateURL";

export default function CategoryCreate({ isOpen, onClose, onSuccess }) {
  const { allCategoryTypes } = useCategoryTypes();
  const { createCategory, isCreating } = useCreateCategory();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category_type: "",
    },
  });

  const handleSave = (data) => {
    createCategory(
      {
        ...data,
        slug: generateUrlFromTitle(data.title),
      },
      {
        onSuccess: () => {
          toast.success("Categoría creada exitosamente");
          onSuccess();
          reset();
          onClose();
        },
        onError: (error) => {
          if (error?.errors) {
            formatErrors(error, setError);
          } else {
            toast.error(error?.message || "Error creando categoría");
          }
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nueva Categoría"
      onSave={handleSubmit(handleSave)}
      saveButtonText={isCreating ? "Creando..." : "Crear Categoría"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onSubmit={handleSubmit(handleSave)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de la Categoría</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors.title}
            {...register("title", {
              required: "El nombre de la categoría es obligatorio",
              minLength: {
                value: 5,
                message:
                  "El nombre de la categoría debe tener al menos 5 caracteres",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            isInvalid={!!errors.description}
            {...register("description", {
              required: "La descripción de la categoría es obligatoria",
              minLength: {
                value: 10,
                message:
                  "La descripción de la categoría debe tener al menos 10 caracteres",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo de Categoría</Form.Label>
          <Controller
            name="category_type"
            control={control}
            rules={{
              required: "El tipo de categoría es obligatorio",
              validate: (value) =>
                value !== "" || "El tipo de categoría es obligatorio",
            }}
            render={({ field }) => (
              <>
                <CustomSelect
                  onSelectChange={(e) => field.onChange(e.target.value)}
                  selectedValue={field.value}
                  defaultOptionLabel="Seleccione un tipo de categoría"
                  className={
                    "form-select " + (errors.category_type ? "is-invalid" : "")
                  }
                  optionValues={allCategoryTypes?.data?.map((categoryType) => ({
                    label: categoryType.name,
                    value: categoryType.id,
                  }))}
                  disabled={isCreating}
                />
                {errors.rol_id && (
                  <div className="invalid-feedback">
                    {errors.rol_id.message}
                  </div>
                )}
              </>
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category_type?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal>
  );
}
