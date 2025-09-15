import { useCallback, useEffect, useMemo, memo } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCategories, useUpdateCategory } from "../../hooks/useCategories";
import MDXEditorField from "../ui/MDXEditorField";
import SelectAllCategories from "../ui/SelectAllCategories";
import { mdxEditorFields } from "../ui/utils/mdxEditorFields";
import toast from "react-hot-toast";

function CategoryUpdateForm({ category }) {
  const navigate = useNavigate();
  const { allCategories } = useCategories(1);
  const { updateCategory } = useUpdateCategory(category?.data.id);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: category?.data.title,
      description: category?.data.description,
      main_category: category?.data.main_category,
      is_featured: category?.data.is_featured,

      // Agregando campos de MDXEditor
      about: category?.data?.detail?.about || "",
      editorial_board: category?.data?.detail?.editorial_board || "",
      policy: category?.data?.detail?.policy || "",
      norms: category?.data?.detail?.norms || "",
      process: category?.data?.detail?.process || "",
      contact: category?.data?.detail?.contact || "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("categoryUpdateSuccess") === "1") {
      toast.success("Categoría actualizada exitosamente");
      localStorage.removeItem("categoryUpdateSuccess");
    }
  }, []);

  const handleCategoryChange = useCallback(
    (fieldOnChange) => (e) => {
      fieldOnChange(e.target.value);
    },
    []
  );

  const onSubmit = (data) => {
    const categoryData = {
      ...data,
      category_id: category.data.id,
    };
    updateCategory(categoryData, {
      onSuccess: () => {
        localStorage.setItem("categoryUpdateSuccess", "1");
        navigate(0);
      },
      onError: (error) => {
        const fieldErrors = error?.errors || {};
        if (fieldErrors && typeof fieldErrors === "object") {
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            const messageText = Array.isArray(messages)
              ? messages.join(", ")
              : messages;
            setError(field, { type: "server", message: messageText });
          });
          toast.error("Corrija los errores del formulario");
        } else {
          toast.error(error?.message || "Error actualizando categoría");
        }
        console.log("Error al actualizar la categoría:", error);
      },
    });
  };

  const renderBasicFields = () => (
    <Row>
      <Col lg={6} sm={12}>
        <Form.Group className="mb-3">
          <Form.Label>Título de categoría</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors.title}
            placeholder="Ingrese el nombre de la categoría"
            {...register("title", { required: true })}
          />
          <Form.Text className="text-muted">
            Ingrese un título de categoría
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.title?.message || "Por favor ingrese un título de categoría"}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      <Col lg={6} sm={12}>
        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors.description}
            placeholder="Ingrese la descripción de la categoría"
            {...register("description", { required: true })}
          />
          <Form.Text className="text-muted">
            Ingrese una descripción corta de la categoría
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {errors.description?.message ||
              "Por favor ingrese una descripción corta de la categoría"}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  );

  const memoizedCategorySelect = useMemo(
    () => (
      <Controller
        name="main_category"
        control={control}
        render={({ field }) => (
          <SelectAllCategories
            allCategories={allCategories}
            onCategoryChange={handleCategoryChange(field.onChange)}
            selectedCategory={field.value}
            className="form-select"
          />
        )}
      />
    ),
    [allCategories, control, handleCategoryChange]
  );

  const renderConfigFields = () => (
    <Row className="mt-4">
      <Col lg={6} sm={12}>
        <Form.Group className="mb-3">
          <Form.Label>Categoría Padre</Form.Label>
          {memoizedCategorySelect}
          <Form.Text className="text-muted">
            Seleccione la categoría de la publicación
          </Form.Text>
        </Form.Group>
      </Col>

      <Col lg={6} sm={12}>
        <Form.Group className="mb-3">
          <Form.Label>Mostrar en novedades</Form.Label>
          <Controller
            name="is_featured"
            control={control}
            render={({ field }) => (
              <Form.Select {...field}>
                <option value={1}>Sí</option>
                <option value={0}>No</option>
              </Form.Select>
            )}
          />
          <Form.Text className="text-muted">
            Seleccione si desea mostrar la categoría como destacada
          </Form.Text>
        </Form.Group>
      </Col>
    </Row>
  );

  const renderMDXFields = () => {
    const fieldPairs = [];
    for (let i = 0; i < mdxEditorFields.length; i += 2) {
      const leftField = mdxEditorFields[i];
      const rightField = mdxEditorFields[i + 1];

      fieldPairs.push(
        <Row key={i} className="mt-4">
          <Col lg={6} sm={12}>
            <MDXEditorField
              name={leftField.name}
              control={control}
              label={leftField.label}
              helpText={leftField.helpText}
            />
          </Col>
          <Col lg={6} sm={12}>
            {rightField && (
              <MDXEditorField
                name={rightField.name}
                control={control}
                label={rightField.label}
                helpText={rightField.helpText}
              />
            )}
          </Col>
        </Row>
      );
    }
    return fieldPairs;
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        {renderBasicFields()}
        {renderConfigFields()}
        {renderMDXFields()}
        <Row className="mt-3">
          <div className="col-12 d-flex justify-content-end gap-2">
            <Button
              variant="secondary"
              className="mb-3"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              className="mb-3"
              onClick={handleSubmit(onSubmit)}
            >
              Guardar cambios
            </Button>
          </div>
        </Row>
      </Container>
    </Form>
  );
}

export default memo(CategoryUpdateForm);

