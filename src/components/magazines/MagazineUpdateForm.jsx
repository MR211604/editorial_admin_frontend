import { useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdatePublishing } from "../../hooks/usePublishings";
import AuthorsTable from "../publishings/AuthorsTable";
import SelectPublishingCategories from "../ui/SelectPublishingCategories";
import toast from "react-hot-toast";
import { formatISBN, ISBN_FORMAT_REGEX } from "../../utils/isbn";
import { getImageURL } from "../../helpers/getImageURL";

export default function MagazineUpdateForm({ publishing, languageShortName }) {
  const authorsTableRef = useRef();

  const { updatePublishing } = useUpdatePublishing(publishing?.data.id);

  //Obtener la informacion basado en el shortname
  const currentTranslation = publishing?.data.translations?.find(
    (t) => t.language.shortname === languageShortName
  );

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: currentTranslation?.title || "-",
      pages: publishing?.data.pages || "",
      publish_date: publishing?.data.publish_date || "",
      publish_code: formatISBN(publishing?.data.publish_code || ""),
      age: publishing?.data.age || "",
      age_number: publishing?.data.age_number || "",
      volume: publishing?.data.volume || "",
      is_new_arrival: publishing?.data.is_new_arrival || 0,
      category_id: publishing?.data.category_id || "",
      cover: null,
    },
  });

  useEffect(() => {
    if (publishing?.data) {
      reset({
        title: currentTranslation?.title,
        pages: publishing.data.pages || "",
        publish_date: publishing.data.publish_date || "",
        publish_code: formatISBN(publishing.data.publish_code || ""),
        volume: publishing.data.volume || "",
        is_new_arrival: publishing.data.is_new_arrival || 0,
        category_id: publishing.data.category_id || "",
        cover: null,
      });
    }
  }, [publishing, reset, currentTranslation]);

  useEffect(() => {
    if (localStorage.getItem("magazineUpdateSuccess") === "1") {
      toast.success("Publicación actualizada exitosamente");
      localStorage.removeItem("magazineUpdateSuccess");
    }
  }, []);

  const onSubmit = async (data) => {
    const authorsData = authorsTableRef.current.getAuthorsData();
    const formData = new FormData();
    //!  formData.append("title", data.title);

    formData.append("pages", data.pages);
    formData.append("publish_date", data.publish_date);
    formData.append("publish_code", data.publish_code);
    formData.append("age", data.age);
    formData.append("age_number", data.age_number);
    formData.append("volume", data.volume);
    formData.append("is_new_arrival", data.is_new_arrival);
    formData.append("category_id", data.category_id);
    formData.append("publishing_type", publishing?.data.publishing_type);

    // TODO: Manejar múltiples traducciones en el futuro
    // Solo enviar la traducción del idioma actual
    // Cuando no se tenga el id de lenguaje correcto, se asume 1 para español y 2 para inglés
    formData.append(
      "translations[0][language_id]",
      languageShortName === "ES" ? 1 : 2
    );
    formData.append("translations[0][title]", data.title);

    authorsData?.visibleAuthors.forEach((author, index) => {
      formData.append(`authors[${index}]`, author.id);
    });

    if (data.cover && data.cover[0]) {
      formData.append("cover", data.cover[0]);
    }

    console.log("Form Data to be submitted:", [...formData.entries()]);
    updatePublishing(formData, {
      onSuccess: () => {
        localStorage.setItem("magazineUpdateSuccess", "1");
        navigate(0);
      },
      onError: (error) => {
        toast.error("Error actualizando publicación: " + error.message);
      },
    });
  };

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
                {...register("title", {
                  required: "El título es obligatorio",
                  minLength: {
                    value: 3,
                    message: "El título debe tener al menos 3 caracteres",
                  },
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
                {...register("pages", {
                  required: "El número de páginas es obligatorio",
                  min: {
                    value: 1,
                    message: "El número de páginas debe ser al menos 1",
                  },
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
                {...register("publish_date", {
                  required: "La fecha de publicación es obligatoria",
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
              <Controller
                name="publish_code"
                control={control}
                rules={{
                  required: "El ISBN es obligatorio",
                  validate: (value) =>
                    ISBN_FORMAT_REGEX.test(value || "") ||
                    "El ISBN debe seguir el formato ###-##-####-###-#",
                }}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type="text"
                    inputMode="numeric"
                    placeholder="123-45-6789-012-3"
                    value={field.value || ""}
                    isInvalid={!!errors.publish_code}
                    onChange={(event) => {
                      const formattedValue = formatISBN(event.target.value);
                      field.onChange(formattedValue);
                    }}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.publish_code?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Formato requerido: ###-##-####-###-#
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
                render={({ field }) => (
                  <>
                    <SelectPublishingCategories
                      categoryType={"Revista"}
                      onCategoryChange={(e) => field.onChange(e.target.value)}
                      selectedCategory={field.value}
                      className={`form-select ${
                        errors.category_id ? "is-invalid" : ""
                      }`}
                    />
                    {errors.category_id && (
                      <div className="invalid-feedback">
                        {errors.category_id.message}
                      </div>
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
              <div className="mb-3 text-center">
                <img
                  src={getImageURL(publishing?.data.cover)}
                  alt="Portada actual"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "300px",
                    objectFit: "contain",
                    border: "1px solid #dee2e6",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                />
                <div className="text-muted small mt-2">Portada actual</div>
              </div>
              <Form.Control
                type="file"
                accept="image/*"
                isInvalid={!!errors.cover}
                {...register("cover", {
                  validate: {
                    fileSize: (files) => {
                      if (!files || files.length === 0) return true;
                      return (
                        files[0].size <= 5000000 ||
                        "El archivo debe ser menor a 5MB"
                      );
                    },
                    fileType: (files) => {
                      if (!files || files.length === 0) return true;
                      const validTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                      ];
                      return (
                        validTypes.includes(files[0].type) ||
                        "Solo se permiten imágenes JPG, JPEG o PNG"
                      );
                    },
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cover?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Seleccione la imagen de portada (JPG, PNG, máx. 5MB)
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
                {...register("age", {
                  required: "La época es obligatoria",
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
                {...register("age_number", {
                  required: "El número de época es obligatorio",
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
                {...register("volume", {
                  required: "El número de volumen es obligatorio",
                  min: {
                    value: 1,
                    message: "El número de volumen debe ser al menos 1",
                  },
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
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Actualizar Revista
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
