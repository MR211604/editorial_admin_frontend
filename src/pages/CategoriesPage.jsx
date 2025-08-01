import { useState } from "react";
import ToolBar from "../components/ui/ToolBar";
import { useCategories } from "../hooks/useCategories"
import { useNavigate } from "react-router-dom";

export default function CategoriesPage() {

  const { allCategories } = useCategories();

  const navigate = useNavigate();

  const handleUpdateCategory = (id) => navigate(`/dashboard/categories/edit/${id}`);

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

  const renderCategoryRow = (category, isChild = false) => (
    <tr key={category.id}>
      <td style={{ paddingLeft: isChild ? '4rem' : '0.5rem' }}>
        <div className="d-flex align-items-center">
          {
            !isChild && category.children && category.children.length > 0 && (
              <button className="text-decoration-none text-dark btn btn-link"
                onClick={() => toggleCategory(category.id)}
              >
                {expandedCategory.has(category.id) ? <i className="bi bi-dash-circle" /> : <i className="bi bi-plus-circle" />}
              </button>
            )
          }
          <span>
            {category.title}
            {isChild && <small className="text-muted ms-2">({category.description})</small>}
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
    </tr>
  )

  return (
    <div>
      <h1>Categorías</h1>
      <hr />
      <p>Bienvenido a la sección de categorías. Aquí puedes encontrar información sobre las categorías de libros.</p>

      <div className="card">
        <div className="card-header">
          Listado de categorías
        </div>
        <div className="card-body">
          <div className="d-flex flex-row pb-4">
            <button className="btn btn-success" onClick={() => console.log("Crear nueva categoría")}>
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
                allCategories?.data?.map(category => [
                  renderCategoryRow(category),
                  ...(expandedCategory.has(category.id) && category.children
                    ? category.children.map(child => renderCategoryRow(child, true))
                    : [])
                ]).flat()
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}
