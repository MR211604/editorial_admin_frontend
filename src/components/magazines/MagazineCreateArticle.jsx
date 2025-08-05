import { Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useCreatePublishingDetail } from '../../hooks/usePublishingsDetails';
import MDXEditorField from '../ui/MDXEditorField';
import Modal from '../ui/modal/Modal';
import { useNavigate } from 'react-router-dom';

export default function MagazineCreateArticle({ publishing, isOpen, onClose, onCreateSuccess }) {

  const { createPublishingDetail } = useCreatePublishingDetail();

  const navigate = useNavigate();

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      URL: '',
      summary: ''
    }
  })

  const onSubmit = (data) => {
    const articleData = {
      ...data,
      language_id: 1,
      repository_URL: data.URL,
      publishing_id: publishing?.data?.id,
    };
    console.log('Article data:', articleData);
    createPublishingDetail(articleData, {
      onSuccess: () => {
        console.log('Artículo creado exitosamente');
        onCreateSuccess();
        navigate(0);
      },
      onError: (error) => {
        console.error('Error creando artículo:', error);
      }
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        saveButtonText='Guardar Artículo'
        closeButtonText='Cancelar'
        size="lg"
        onSave={() => handleSubmit(onSubmit)()}
        title={`Agregar Artículo a ${publishing?.data.title}`}
        showFooter={true}>
        <Form>
          <Row className="mb-3">
            <Form.Group controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control isInvalid={!!errors.title} type="text" placeholder="Ingrese el título" {...register('title', {
                required: 'El título es obligatorio',
                minLength: {
                  value: 3,
                  message: 'El título debe tener al menos 3 caracteres'
                }
              })} />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="formURL">
              <Form.Label>URL</Form.Label>
              <Form.Control isInvalid={!!errors.URL} type="text" placeholder="Ingrese la URL" {...register('URL', {
                required: 'La URL es obligatoria',
                minLength: {
                  value: 3,
                  message: 'El título debe tener al menos 3 caracteres'
                }
              })} />
              <Form.Control.Feedback type="invalid">
                {errors.URL?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-5">
            <MDXEditorField
              name="summary"
              control={control}
              label={'Resumen'}
              error={errors.summary?.message}
            />
          </Row>
        </Form>
      </Modal>
    </>


  )
}
