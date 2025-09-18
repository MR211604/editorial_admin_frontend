import { useEffect, useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUpdatePublishing } from "../../hooks/usePublishings";
import AuthorsTable from "../publishings/AuthorsTable";
import SelectPublishingCategories from "../ui/SelectPublishingCategories";
import toast from "react-hot-toast";
import { BOOK_CATEGORY } from "../../constants/common";
import { formatISBN, ISBN_FORMAT_REGEX } from "../../utils/isbn";

export default function BookUpdateForm({ publishing }) {
  const authorsTableRef = useRef();

  const { updatePublishing } = useUpdatePublishing(publishing?.data.id);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: publishing?.data.title || "",
      pages: publishing?.data.description || "",
      publish_date: publishing?.data.publish_date || "",
      publish_code: formatISBN(publishing?.data.publish_code || ""),
      category_id: publishing?.data.category_id || undefined,
      URL: publishing?.data.URL || "",
      is_new_arrival: publishing?.data.is_new_arrival || 0,
    },
  });

  useEffect(() => {
    if (publishing?.data) {
      reset({
        title: publishing.data.title,
        pages: publishing.data.pages || "",
        publish_date: publishing.data.publish_date || "",
        publish_code: formatISBN(publishing.data.publish_code || ""),
        category_id: publishing.data.category_id || undefined,
        URL: publishing.data.URL || "",
        is_new_arrival: publishing.data.is_new_arrival || 0,
      });
    }
  }, [publishing, reset]);

  useEffect(() => {
    if (localStorage.getItem("bookUpdateSuccess") === "1") {
      toast.success("Publicación actualizada exitosamente");
      localStorage.removeItem("bookUpdateSuccess");
    }
  }, []);

  const onSubmit = async (data) => {
    const authorsData = authorsTableRef.current.getAuthorsData();
    const updateData = {
      ...data,
      publish_code: data.publish_code,
      id: publishing?.data.id,
      publishing_type: publishing?.data.publishing_type,
      authors: authorsData?.visibleAuthors.map((author) => author.id) || [],
    };
    updatePublishing(updateData, {
      onSuccess: () => {
        localStorage.setItem("bookUpdateSuccess", "1");
        navigate(0);
      },
      onError: (error) => {
        console.log("Error updating publishing:", error);
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
              <Form.Label>Titulo de libro</Form.Label>
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
                  minLength: {
                    value: 3,
                    message:
                      "La fecha de publicación debe tener al menos 3 caracteres",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.publish_date?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese una fecha de publicación
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
                rules={{
                  required: "La categoría es obligatoria",
                  validate: (value) => value !== "" || "Todas las categorias",
                }}
                render={({ field }) => (
                  <>
                    <SelectPublishingCategories
                      categoryType={BOOK_CATEGORY}
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
              <Form.Control type="file" />
              <Form.Text className="text-muted">
                Seleccione la imagen de portada
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
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
          <Col lg={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>URL del recurso</Form.Label>
              <Form.Control
                type="text"
                isInvalid={!!errors.URL}
                {...register("URL", {
                  required: "La URL del recurso es obligatoria",
                  minLength: {
                    value: 3,
                    message:
                      "La URL del recurso debe tener al menos 3 caracteres",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.URL?.message}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Ingrese la URL del recurso
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-4">
          <AuthorsTable publishing={publishing} ref={authorsTableRef} />
        </Row>

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
              Actualizar libro
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
