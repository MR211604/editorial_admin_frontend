import React from 'react'
import Modal from '../ui/modal/Modal'
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useCreateCategory } from '../../hooks/useCategories';

export default function CategoryCreate({ isOpen, onClose, onSuccess }) {

  const { createCategory, isCreating } = useCreateCategory();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category_type: 3,
    }
  })

  const handleSave = (data) => {
    console.log("Crear categoría con datos:", data);
    createCategory(data, {
      onSuccess: () => {
        console.log("Categoría creada exitosamente");
        onSuccess();
        reset(); // Reset the form after successful creation
        onClose();
      },
      onError: (error) => {
        console.error("Error creando categoría:", error);
      }
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nueva Categoría"
      onSave={handleSubmit(handleSave)}
      saveButtonText={isCreating ? "Creando..." : "Crear Categoría"}
      closeButtonText='Cancelar'
      showFooter={true}
    >
      <Form onSubmit={handleSubmit(handleSave)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de la Categoría</Form.Label>
          <Form.Control type="text" placeholder="Ingrese el nombre de la categoría" isInvalid={!!errors.title} {...register('title', {
            required: 'El nombre de la categoría es obligatorio',
            minLength: {
              value: 5,
              message: 'El nombre de la categoría debe tener al menos 5 caracteres'
            }
          })} />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" placeholder="Ingrese la descripción de la categoría" isInvalid={!!errors.description} {...register('description', {
            required: 'La descripción de la categoría es obligatoria',
            minLength: {
              value: 10,
              message: 'La descripción de la categoría debe tener al menos 10 caracteres'
            }
          })} />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Tipo de Categoría</Form.Label>
          <Controller
            name="category_type"
            control={control}
            rules={{ required: 'El tipo de categoría es obligatorio' }}
            render={({ field }) => (
              <Form.Control as="select" {...field} isInvalid={!!errors.category_type}>
                <option value="0">Sin Categoria</option>
                <option value="1">Revista</option>
                <option value="2">Libro</option>
              </Form.Control>
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category_type?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>

    </Modal>
  )
}
