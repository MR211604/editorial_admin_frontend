import { useCategories } from "../../hooks/useCategories";

//Esto trae los datos de las categorias con los children_recursive
// Props:
// - onCategoryChange: función que se llama cuando se selecciona una categoría
// - selectedCategory: categoría seleccionada actualmente
// - defaultValue: valor por defecto que se muestra en el select
// - defaultCategoryValue: valor por defecto que se asigna al option por defecto
export default function SelectPublishingCategories({
  onCategoryChange,
  selectedCategory,
  enableAllCategoriesOption = false,
  categoryType,
  ...props
}) {
  const { allCategories } = useCategories({ getAll: false });
  const filteredCategories = allCategories?.data?.filter(
    (category) =>
      category.category_type === categoryType ||
      category.title === "Sin categoria"
  );

  return (
    <select {...props} value={selectedCategory} onChange={onCategoryChange}>
      {enableAllCategoriesOption && (
        <option value="">Todas las categorías</option>
      )}
      {filteredCategories?.map((category) =>
        category.children_recursive.length > 0 ? (
          <optgroup key={category.id + category.title} label={category.title}>
            {category.children_recursive.map((child) => (
              <option key={child.id} value={child.id}>
                {child.title}
              </option>
            ))}
          </optgroup>
        ) : (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        )
      )}
    </select>
  );
}
