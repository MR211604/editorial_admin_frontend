import { Controller, useForm } from "react-hook-form";
import Modal from "../../components/ui/modal/Modal";
import { Form } from "react-bootstrap";
import SelectBookCategories from "./SelectBookCategories";

export default function BookCreate({ isOpen, onClose, onSuccess }) {


  const { register, handleSubmit, control, formState: { errors } } = useForm({})

  const handleSave = () => {
    onSuccess();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nuevo Libro"
      onSave={handleSave}
      saveButtonText={"Crear Libro"}
      closeButtonText="Cancelar"
      showFooter={true}
    >
      <Form onAbort={handleSubmit(handleSave)}>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="bookTitle">Título</Form.Label>
          <Form.Control
            type="text"
            id="bookTitle"
            {...register("title", { required: "El título es obligatorio" })}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="bookUrl">URL</Form.Label>
          <Form.Control
            type="text"
            id="bookUrl"
            {...register("url", { required: "La URL es obligatoria" })}
            isInvalid={!!errors.url}
          />
          <Form.Control.Feedback type="invalid">
            {errors.url?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoria de publicación</Form.Label>
          <Controller
            name="category_id"
            control={control}
            rules={{ required: 'La categoría es obligatoria', validate: value => value !== "" || 'Todas las categorias' }}
            render={({ field }) => (
              <>
                <SelectBookCategories
                  onCategoryChange={(e) => field.onChange(e.target.value)}
                  selectedCategory={field.value}
                  className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                />
                {errors.category_id && (
                  <div className="invalid-feedback">{errors.category_id.message}</div>
                )}
              </>
            )}
          />
        </Form.Group>

      </Form>
    </Modal>
  )
}
