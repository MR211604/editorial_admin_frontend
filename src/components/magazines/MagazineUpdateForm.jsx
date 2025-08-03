import { useEffect, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUpdatePublishing } from '../../hooks/usePublishings';
import AuthorsTable from '../publishings/AuthorsTable';
import SelectCategories from './SelectCategories';
import SelectPublishingCategories from '../ui/SelectPublishingCategories';

export default function MagazineUpdateForm({ publishing }) {

  const authorsTableRef = useRef();

  const { updatePublishing } = useUpdatePublishing(publishing?.data.id);

  const navigate = useNavigate();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: publishing?.data.title || '',
      pages: publishing?.data.pages || '',
      publish_date: publishing?.data.publish_date || '',
      publish_code: publishing?.data.publish_code || '',
      age: publishing?.data.age || '',
      age_number: publishing?.data.age_number || '',
      volume: publishing?.data.volume || '',
      is_new_arrival: publishing?.data.is_new_arrival || 0,
      category_id: publishing?.data.category_id || undefined,
    }
  })

  useEffect(() => {
    if (publishing?.data) {
      reset({
        title: publishing.data.title,
        pages: publishing.data.pages || '',
        publish_date: publishing.data.publish_date || '',
        publish_code: publishing.data.publish_code || '',
        volume: publishing.data.volume || '',
        is_new_arrival: publishing.data.is_new_arrival || 0,
        category_id: publishing.data.category_id || undefined,
      });
    }
  }, [publishing, reset])

  const onSubmit = (data) => {
    const authorsData = authorsTableRef.current?.getAuthorsData();
    const updateData = {
      ...data,
      id: publishing?.data.id,
      publishing_type: publishing?.data.publishing_type,
      authors: authorsData?.visibleAuthors.map(author => author.id) || [],
    }
    updatePublishing(updateData, {
      onSuccess: () => {
        console.log('Revista actualizada exitosamente');
        navigate(0);
      },
      onError: (error) => {
        console.log('Error actualizando revista:', error);
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row>
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Titulo de revista</Form.Label>
              <Form.Control
                type="text"
                isInvalid={!!errors.title}
                {...register('title', {
                  required: 'El título es obligatorio',
                  minLength: {
                    value: 3,
                    message: 'El título debe tener al menos 3 caracteres'
                  }
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese un nombre de publicación
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={6} sm={12} className="mt-sm-3 mt-lg-0">
            <Form.Group className="mb-3">
              <Form.Label>Numero de paginas</Form.Label>
              <Form.Control
                type="number"
                isInvalid={!!errors.pages}
                {...register('pages', {
                  required: 'El número de páginas es obligatorio',
                  min: {
                    value: 1,
                    message: 'El número de páginas debe ser al menos 1'
                  }
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.pages?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese el numero de paginas de la publicación
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de publicación</Form.Label>
              <Form.Control
                type="date"
                isInvalid={!!errors.publish_date}
                {...register('publish_date', {
                  required: 'La fecha de publicación es obligatoria'
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.publish_date?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese la fecha de publicación de la revista
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={6} sm={12} className="mt-sm-3 mt-lg-0">
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="number"
                isInvalid={!!errors.publish_code}
                {...register('publish_code', {
                  required: 'El ISBN es obligatorio'
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.publish_code?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese el ISBN de la publicación
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Categoria de publicación</Form.Label>
              <Controller
                name="category_id"
                control={control}
                rules={{ required: 'La categoría es obligatoria', validate: value => value !== "" || 'Todas las categorias' }}
                render={({ field }) => (
                  <>
                    <SelectPublishingCategories
                      categoryType={1}
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
              <Form.Text className="text-muted">
                Seleccione la categoría de la publicación
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={6} sm={12} className="mt-sm-3 mt-lg-0">
            <Form.Group className="mb-3">
              <Form.Label>Imagen de portada</Form.Label>
              <Form.Control type="file" />
              <Form.Text className="text-muted">
                Seleccione la imagen de portada
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Epoca</Form.Label>
              <Form.Control
                type="number"
                isInvalid={!!errors.age}
                {...register('age', {
                  required: 'La época es obligatoria',
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.age?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese la época de la publicación
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={6} sm={12} className="mt-sm-3 mt-lg-0">
            <Form.Group className="mb-3">
              <Form.Label>Numero de epoca</Form.Label>
              <Form.Control
                type="text"
                isInvalid={!!errors.age_number}
                {...register('age_number', {
                  required: 'El número de época es obligatorio',
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.age_number?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese el número de época de la publicación
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Numero de volumen</Form.Label>
              <Form.Control
                type="number"
                isInvalid={!!errors.volume}
                {...register('volume', {
                  required: 'El número de volumen es obligatorio',
                  min: {
                    value: 1,
                    message: 'El número de volumen debe ser al menos 1'
                  }
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.volume?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese el número de volumen
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={6} sm={12} className="mt-sm-3 mt-lg-0">
            <Form.Group className="mb-3">
              <Form.Label>Mostrar en novedades</Form.Label>
              <Controller
                name="is_new_arrival"
                control={control}
                render={({ field }) => (
                  <Form.Select {...field}>
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </Form.Select>
                )}
              />
              <Form.Text className="text-muted">
                Mostrar publicación en novedades
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {/* Tabla de autores */}
        <Row className="mt-4">
          <AuthorsTable publishing={publishing} ref={authorsTableRef} />
        </Row>
      </Container>

      <Row className="mt-4">
        <Col xs={12} className="d-flex justify-content-end gap-2">
          <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Actualizar Revista
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
