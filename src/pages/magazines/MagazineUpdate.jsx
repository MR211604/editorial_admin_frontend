import { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import SelectCategories from "../../components/magazines/SelectCategories";
import { usePublishing } from "../../hooks/usePublishings";
import MagazineAuthorsTable from "../../components/magazines/MagazineAuthorsTable";
import { useRef } from "react";


export default function MagazineUpdate() {


  // "data": {
  //     "id": 125,
  //     "title": "Teoría y Praxis No.36",
  //     "cover": null,
  //     "time": null,
  //     "volume": null,
  //     "volume_date": null,
  //     "publish_code": null,
  //     "is_new_arrival": 0,
  //     "publish_date": null,
  //     "state": 0,
  //     "publisher": "Editorial Universidad Don Bosco",
  //     "stock": null,
  //     "author_id": 1,
  //     "language_id": 1,
  //     "category_id": 4,
  //     "publishing_type": 2,
  //     "type": {
  //         "id": 2,
  //         "name": "Revista",
  //         "description": "Publicacion de tipo revista, contiene categoria"
  //     },
  //     "authors": [
  //         {
  //             "id": 1,
  //             "name": "Ana Cecilia",
  //             "lastname": "de Méndez",
  //             "pivot": {
  //                 "publishing_id": 125,
  //                 "author_id": 1
  //             }
  //         }
  //     ],
  //     "details": {
  //         "id": 1,
  //         "summary": "esto es una revista dedicada a tal cosa equisde",
  //         "URL": "url_de_ejemplo",
  //         "repository_URL": "url_de_ejemplo",
  //         "pages": 150,
  //         "publishing_id": 125,
  //         "language_id": 1
  //     }
  // },

  const { id } = useParams();
  const authorsTableRef = useRef();

  const { publishing, isPublishingLoading } = usePublishing(id)

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
      authors: authorsData?.allAuthors || [],
    }

    // author_ids: authorsData?.allAuthors.map(author => author.id) || []
    console.log('Datos actualizados:', updateData);
  }

  const hasAnyChanges = () => {
    const authorsData = authorsTableRef.current?.getAuthorsData();
    return isDirty || authorsData?.hasChanges;
  };

  if (isPublishingLoading) {
    return <div>Cargando revista...</div>;
  }

  return (
    <>
      <h1>Actualizando {publishing?.data.title}</h1>
      <hr />
      <p>Esta es la pagina de actualizacion de revistas</p>

      {/* Tabs de Bootstrap */}
      <ul className="nav nav-tabs" id="magazineTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="basic-info-tab"
            data-bs-toggle="tab"
            data-bs-target="#basic-info"
            type="button"
            role="tab"
            aria-controls="basic-info"
            aria-selected="true"
          >
            Español
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="authors-tab"
            data-bs-toggle="tab"
            data-bs-target="#authors"
            type="button"
            role="tab"
            aria-controls="authors"
            aria-selected="false"
          >
            Inglés
          </button>
        </li>
      </ul>

      {/* Contenido de los tabs */}
      <div className="tab-content" id="magazineTabsContent">

        {/* Tab 1: Información Básica */}
        <div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="basic-info-tab">
          <div className="card mt-3">
            <div className="card-header">
              Formulario basico de revista
            </div>
            <div className="card-body">
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
            </div>
          </div>
        </div>

        {/* Tab 2: Autores y Detalles */}
        <div className="tab-pane fade" id="authors" role="tabpanel" aria-labelledby="authors-tab">
          <div className="card mt-3">
            <div className="card-header">
              Formulario basico de revista
            </div>
            <div className="card-body">
              <form>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <label className="form-label">Titulo de revista</label>
                      <input className="form-control" type="text" />
                      <div className="form-text">Ingrese un nombre de publicación</div>
                    </div>
                    <div className="col-lg-6 mt-sm-3 mt-lg-0 col-sm-12">
                      <label className="form-label">Numero de paginas</label>
                      <input className="form-control" type="number" />
                      <div className="form-text">Ingrese el numero de paginas de la publicación</div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12">
                      <label className="form-label">Fecha de publicación</label>
                      <input className="form-control" type="date" />
                      <div className="form-text">Ingrese la fecha de publicación de la revista</div>
                    </div>
                    <div className="col-lg-6 mt-sm-3 mt-lg-0 col-sm-12">
                      <label className="form-label">ISBN</label>
                      <input className="form-control" type="text" />
                      <div className="form-text">Ingrese el ISBN de la publicación</div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12">
                      <label className="form-label">Categoria de publicación</label>
                      <select className="form-control">
                        <option>Seleccione una categoría</option>
                        <option>Ciencias</option>
                        <option>Humanidades</option>
                        <option>Tecnología</option>
                      </select>
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
                      <input className="form-control" type="number" />
                      <div className="form-text">Ingrese la época de la publicación</div>
                    </div>
                    <div className="col-lg-6 mt-sm-3 mt-lg-0 col-sm-12">
                      <label className="form-label">Numero de epoca</label>
                      <input className="form-control" type="text" />
                      <div className="form-text">Ingrese el número de época de la publicación</div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12">
                      <label className="form-label">Numero de volumen</label>
                      <input className="form-control" type="number" />
                      <div className="form-text">Ingrese el número de volumen</div>
                    </div>
                    <div className="col-lg-6 mt-sm-3 mt-lg-0 col-sm-12">
                      <label className="form-label">Mostrar en novedades</label>
                      <select className="form-control">
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                      </select>
                      <div className="form-text">Mostrar publicación en novedades</div>
                    </div>
                  </div>

                  {/* Tabla de autores */}
                  <div className="row mt-4">
                    <div className="col-12">
                      <h5>Gestión de Autores</h5>
                      <div className="table-responsive table-bordered">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Autor</th>
                              <th>Accion</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="align-middle">
                              <td>1</td>
                              <td>Departamento de ciencias y humanidades</td>
                              <td>
                                <button className="btn btn-danger btn-sm">Eliminar</button>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td className="text-end" colSpan="3">
                                <button className="btn btn-success btn-sm">Agregar Autor</button>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}