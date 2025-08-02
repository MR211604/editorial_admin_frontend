import { useCategories } from '../../hooks/useCategories';

//Esto trae los datos de las categorias con los children
export default function SelectPublishingCategories({ onCategoryChange, selectedCategory, categoryTitle, ...props }) {

  const { allCategories } = useCategories();
  const filteredCategories = allCategories?.data?.filter(category => category?.title?.toLowerCase().includes(categoryTitle.toLowerCase()) || category?.title === "Sin Categoria");

  return (
    <select {...props} value={selectedCategory} onChange={onCategoryChange}>
      <option value="">Seleccionar categoria</option>
      {
        filteredCategories?.map(category => (
          category.children.length > 0 ? <optgroup key={category.id + category.title} label={category.title}>
            {
              category.children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.title}
                </option>
              ))
            }
          </optgroup> : <option key={category.id} value={category.id}>{category.title}</option>
        ))
      }
    </select>
  )
}
