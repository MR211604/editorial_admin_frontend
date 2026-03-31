import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCreate from "../components/categories/CategoryCreate";
import { useCategories } from "../hooks/useCategories";
import { useModalCRUD } from "../hooks/utils/useModalCRUD";
import CategoryChangeStatus from "../components/categories/CategoryChangeStatus";

export default function CategoriesPage() {
  const { allCategories } = useCategories({ getAll: false });
  const navigate = useNavigate();

  const {
    openModal,
    closeModal,
    isModalOpen,
    onCreateSuccess,
    handleEditValue,
    selectedValue,
    onEditSuccess,
  } = useModalCRUD();
  const [expandedCategory, setExpandedCategory] = useState(new Set());

  const handleUpdateCategory = (id) =>
    navigate(`/dashboard/categories/edit/${id}`);

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategory);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategory(newExpanded);
  };

  // Funcion para renderizar una fila de categoría y sus subcategorías recursivamente
  const renderCategoryRow = (category, level = 0) => {
    const hasChildren =
      category?.children_recursive && category?.children_recursive?.length > 0;
    const isExpanded = expandedCategory.has(category.idCategory);
    const paddingLeft = level * 2; // 2rem por cada nivel de profundidad

    const getCategoryStatus = () => {
      if (!hasChildren) {
        return category.state ? "active" : "inactive";
      }

      const hasActiveChildren = category.children_recursive.some(
        (child) => child.state === 1,
      );

      const allChildrenActive = category.children_recursive.every(
        (child) => child.state === 1,
      );

      if (category.state === 1 && allChildrenActive) {
        return "active";
      } else if (category.state === 0 && hasActiveChildren) {
        return "partial";
      } else if (category.state === 1 && !allChildrenActive) {
        return "partial";
      } else if (category.state === 1 && !hasActiveChildren) {
        return "partial";
      } else {
        return "inactive";
      }
    };

    const status = getCategoryStatus();

    return [
      <tr key={category.idCategory}>
        <td
          style={{ paddingLeft: `${paddingLeft}rem` }}
          className="align-middle"
        >
          <div>
            {hasChildren && (
              <button
                className="text-decoration-none text-dark btn btn-link"
                onClick={() => toggleCategory(category.idCategory)}
              >
                {isExpanded ? (
                  <i className="bi bi-dash-circle" />
                ) : (
                  <i className="bi bi-plus-circle" />
                )}
              </button>
            )}
            <span style={{ paddingLeft: !hasChildren ? "1.5rem" : "0" }}>
              {category.title}
              {level > 0 && (
                <small className="text-muted ms-2">
                  ({category.description})
                </small>
              )}
            </span>
          </div>
        </td>
        <td className="text-center align-middle">
          {status === "active" && (
            <span className="badge bg-success">Activo</span>
          )}
          {status === "partial" && (
            <span className="badge bg-warning text-dark">
              Parcialmente activa
            </span>
          )}
          {status === "inactive" && (
            <span className="badge bg-danger">Inactivo</span>
          )}
        </td>
        <td className="text-center align-middle">
          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleUpdateCategory(category.idCategory)}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            {category.state ? (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleEditValue(category)}
              >
                <i className="bi bi-x-circle"></i>
              </button>
            ) : (
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleEditValue(category)}
              >
                <i className="bi bi-check-circle"></i>
              </button>
            )}
          </div>
        </td>
      </tr>,
      // Renderizar recursivamente las subcategorías si están expandidas
      ...(isExpanded && hasChildren
        ? category.children_recursive.flatMap((child) =>
            renderCategoryRow(child, level + 1),
          )
        : []),
    ];
  };

  return (
    <>
      <h1>Categorías</h1>
      <hr />
      <p>
        Bienvenido a la sección de categorías. Aquí puedes encontrar información
        sobre las categorías de libros.
      </p>
      <div className="card">
        <div className="card-header">Listado de categorías</div>
        <div className="card-body">
          <div className="d-flex flex-row pb-4">
            <button
              className="btn btn-success"
              onClick={() => openModal("create")}
            >
              Agregar nueva categoría
            </button>
          </div>

          <table className="table table-responsive table-hover table-bordered table-striped">
            <thead className="table-primary">
              <tr className="text-center">
                <th style={{ width: "60%" }}>Titulo de categoria</th>
                <th>Estado</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {allCategories?.data?.flatMap((category) =>
                renderCategoryRow(category),
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen("create") && (
        <CategoryCreate
          isOpen={isModalOpen("create")}
          onClose={() => closeModal("create")}
          onSuccess={onCreateSuccess}
        />
      )}

      {isModalOpen("edit") && selectedValue && (
        <CategoryChangeStatus
          isOpen={isModalOpen("edit")}
          onClose={() => closeModal("edit")}
          onSuccess={onEditSuccess}
          selectedCategory={selectedValue}
        />
      )}
    </>
  );
}
