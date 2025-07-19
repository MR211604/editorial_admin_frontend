import { Controller, useForm } from 'react-hook-form';
import MagazineAuthorsTable from './MagazineAuthorsTable'
import { useRef } from 'react';
import { useEffect } from 'react';
import SelectCategories from './SelectCategories';

export default function MagazineUpdateForm({ publishing }) {

  const authorsTableRef = useRef();

  const { register, handleSubmit, control, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      title: publishing?.data.title || '',
      pages: publishing?.data.details?.pages || '',
      publish_date: publishing?.data.publish_date || '',
      publish_code: publishing?.data.publish_code || '',
      age: publishing?.data.age || '',
      age_number: publishing?.data.age_number || '',
      time: publishing?.data.time || '',
      volume: publishing?.data.volume || '',
      is_new_arrival: publishing?.data.is_new_arrival || 0,
      category_id: publishing?.data.category_id || undefined,
    }
  })

  useEffect(() => {
    if (publishing?.data) {
      reset({
        title: publishing.data.title,
        pages: publishing.data.details?.pages || '',
        publish_date: publishing.data.publish_date || '',
        publish_code: publishing.data.publish_code || '',
        time: publishing.data.time || '',
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
      author_ids: authorsData?.visibleAuthors.map(author => author.id) || [],
      authors: authorsData?.allAuthors || [],
    }
    console.log('Datos actualizados:', updateData);
  }

  const hasAnyChanges = () => {
    const authorsData = authorsTableRef.current?.getAuthorsData();
    return isDirty || authorsData?.hasChanges;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <label className="form-label">Titulo de revista</label>
            <input className={`form-control ${errors.title ? 'is-invalid' : ''}`} type="text" {...register('title', {
              required: 'El título es obligatorio',
              minLength: {
                value: 3,
                message: 'El título debe tener al menos 3 caracteres'
              }
            })} />
            {errors.title && (
              <div className="invalid-feedback">{errors.title.message}</div>
            )}
            <div className="form-text">Ingrese un nombre de publicación</div>
          </div>
          <div className="col-lg-6 mt-sm-3 mt-lg-0 col-sm-12">
            <label className="form-label">Numero de paginas</label>
            <input className={`form-control ${errors.pages ? 'is-invalid' : ''}`} type="number" {...register('pages', {
              required: 'El número de páginas es obligatorio',
              min: {
                value: 1,
                message: 'El número de páginas debe ser al menos 1'
              }
            })} />
            {errors.pages && (
              <div className="invalid-feedback">{errors.pages.message}</div>
            )}
            <div className="form-text">Ingrese el numero de paginas de la publicación</div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 col-sm-12">
            <label className="form-label">Fecha de publicación</label>
            <input className={`form-control ${errors.publish_date ? 'is-invalid' : ''}`} type="date" {...register('publish_date', {
              required: 'La fecha de publicación es obligatoria'
            })} />
            {errors.publish_date && (
              <div className="invalid-feedback">{errors.publish_date.message}</div>
            )}
            <div className="form-text">Ingrese la fecha de publicación de la revista</div>
          </div>
          <div className="col-lg-6 mt-sm-3 mt-lg-0 col-sm-12">
            <label className="form-label">ISBN</label>
            <input className={`form-control ${errors.publish_code ? 'is-invalid' : ''}`} type="text" {...register('publish_code', {
              required: 'El ISBN es obligatorio'
            })} />
            {errors.publish_code && (
              <div className="invalid-feedback">{errors.publish_code.message}</div>
            )}
            <div className="form-text">Ingrese el ISBN de la publicación</div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 col-sm-12">
            <label className="form-label">Categoria de publicación</label>
            <Controller
              name="category_id"
              control={control}
              rules={{ required: 'La categoría es obligatoria', validate: value => value !== "" || 'Todas las categorias' }}
              render={({ field }) => (
                <SelectCategories
                  onCategoryChange={(e) => field.onChange(e.target.value)}
                  selectedCategory={field.value}
                  className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                />
              )}
            />
            {errors.category_id && (
              <div className="invalid-feedback">{errors.category_id.message}</div>
            )}
            <div className="form-text">Seleccione la categoría de la publicación</div>
          </div>
          <div className="col-lg-6 mt-sm-3 mt-lg-0 col-sm-12">
            <label className="form-label">Imagen de portada</label>
            <input className="form-control" type="file" />
            <div className="form-text">Seleccione la imagen de portada</div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 col-sm-12">
            <label className="form-label">Epoca</label>
            <input className={`form-control ${errors.age ? 'is-invalid' : ''}`} type="number" {...register('age', {
              required: 'La época es obligatoria',
            })} />
            {errors.age && (
              <div className="invalid-feedback">{errors.age.message}</div>
            )}
            <div className="form-text">Ingrese la época de la publicación</div>
          </div>
          <div className="col-lg-6 mt-sm-3 mt-lg-0 col-sm-12">
            <label className="form-label">Numero de epoca</label>
            <input className={`form-control ${errors.age_number ? 'is-invalid' : ''}`} type="text" {...register('age_number', {
              required: 'El número de época es obligatorio',
            })} />
            {errors.age_number && (
              <div className="invalid-feedback">{errors.age_number.message}</div>
            )}
            <div className="form-text">Ingrese el número de época de la publicación</div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-6 col-sm-12">
            <label className="form-label">Numero de volumen</label>
            <input className={`form-control ${errors.volume ? 'is-invalid' : ''}`} type="number" {...register('volume', {
              required: 'El número de volumen es obligatorio',
              min: {
                value: 1,
                message: 'El número de volumen debe ser al menos 1'
              }
            })} />
            {errors.volume && (
              <div className="invalid-feedback">{errors.volume.message}</div>
            )}
            <div className="form-text">Ingrese el número de volumen</div>
          </div>
          <div className="col-lg-6 mt-sm-3 mt-lg-0 col-sm-12">
            <label className="form-label">Mostrar en novedades</label>
            <Controller
              name="is_new_arrival"
              control={control}
              render={({ field }) => (
                <select {...field} className="form-control">
                  <option value={1}>Sí</option>
                  <option value={0}>No</option>
                </select>
              )}
            />
            <div className="form-text">Mostrar publicación en novedades</div>
          </div>
        </div>

        {/* Tabla de autores */}
        <div className="row mt-4">
          <MagazineAuthorsTable publishing={publishing} ref={authorsTableRef} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-secondary">Cancelar</button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!hasAnyChanges()}
          >
            Actualizar Revista
          </button>
        </div>
      </div>
    </form>
  )
}
