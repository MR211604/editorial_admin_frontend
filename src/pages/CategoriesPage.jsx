import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCreate from "../components/categories/CategoryCreate";
import { useCategories } from "../hooks/useCategories";
import { useModalCRUD } from "../hooks/utils/useModalCRUD";

//!TODO: REFACTOR ESTE COMPONENTE PARA QUE SOLAMENTE TENGA UN NIVEL DE CHILDREN
export default function CategoriesPage() {

  const { allCategories } = useCategories();
  const navigate = useNavigate();
  const handleUpdateCategory = (id) => navigate(`/dashboard/categories/edit/${id}`);
  const { openModal, closeModal, isModalOpen, onCreateSuccess } = useModalCRUD();
  const [expandedCategory, setExpandedCategory] = useState(new Set());

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategory);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategory(newExpanded)
  }

  const renderCategoryRow = (category, level = 0) => {
    const hasChildren = category?.children_recursive && category?.children_recursive?.length > 0;
    const isExpanded = expandedCategory.has(category.id);
    const paddingLeft = level * 2; // 2rem por cada nivel de profundidad

    return [
      <tr key={category.id}>
        <td style={{ paddingLeft: `${paddingLeft}rem` }} className="align-middle">
          <div>
            {
              hasChildren && (
                <button
                  className="text-decoration-none text-dark btn btn-link"
                  onClick={() => toggleCategory(category.id)}
                >
                  {isExpanded ? <i className="bi bi-dash-circle" /> : <i className="bi bi-plus-circle" />}
                </button>
              )
            }
            <span style={{ paddingLeft: !hasChildren ? '1.5rem' : '0' }}>
              {category.title}
              {level > 0 && <small className="text-muted ms-2">({category.description})</small>}
            </span>
          </div>
        </td>
        <td className="text-center align-middle">
          <div className="d-flex gap-2 justify-content-center">
            <button className="btn btn-success btn-sm" onClick={() => handleUpdateCategory(category.id)}>
              <i className="bi bi-pencil"></i>
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => console.log("Eliminar categoría", category.id)}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>,
      // Renderizar recursivamente las subcategorías si están expandidas
      ...(isExpanded && hasChildren
        ? category.children_recursive.flatMap(child => renderCategoryRow(child, level + 1))
        : [])
    ];
  };

  return (
    <>
      <h1>Categorías</h1>
      <hr />
      <p>Bienvenido a la sección de categorías. Aquí puedes encontrar información sobre las categorías de libros.</p>
      <div className="card">
        <div className="card-header">
          Listado de categorías
        </div>
        <div className="card-body">
          <div className="d-flex flex-row pb-4">
            <button className="btn btn-success" onClick={() => openModal("create")}>
              Agregar nueva categoría
            </button>
          </div>

          <table className="table table-responsive table-hover table-bordered table-striped">
            <thead className="table-primary">
              <tr className="text-center">
                <th style={{ width: '60%' }}>Titulo de categoria</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {
                allCategories?.data?.flatMap(category => renderCategoryRow(category))
              }
            </tbody>
          </table>
        </div>
      </div>

      <CategoryCreate
        isOpen={isModalOpen('create')}
        onClose={() => closeModal('create')}
        onSuccess={onCreateSuccess}
      />
    </>
  )
}
