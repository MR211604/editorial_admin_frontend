import { useCategories } from "../../hooks/useCategories";

//Esto trae los datos de las categorias con los children_recursive

// Props:
// - onCategoryChange: función que se llama cuando se selecciona una categoría
// - selectedCategory: categoría seleccionada actualmente
// - enableAllCategoriesOption: muestra la opción "Todas las categorías"
// - filterActiveCategories: filtra las categorías para mostrar solo las activas
// - categoryType: tipo de categoría a filtrar
export default function SelectPublishingCategories({
  onCategoryChange,
  selectedCategory,
  enableAllCategoriesOption = false,
  filterActiveCategories = false,
  categoryType,
  ...props
}) {
  const { allCategories } = useCategories({ getAll: false });

  const filteredCategories = allCategories?.data
    ?.filter((category) => {
      return (
        category.category_type === categoryType ||
        category.title === "Sin categoria"
      );
    })
    .map((category) => {
      if (filterActiveCategories) {
        // Filtrar hijos activos
        const activeChildren = category.children_recursive.filter(
          (child) => child.state === 1
        );

        // Si la categoría padre está activa O tiene hijos activos
        if (category.state === 1 || activeChildren.length > 0) {
          return {
            ...category,
            children_recursive: activeChildren,
          };
        }
        return null;
      }
      return category;
    })
    .filter(Boolean);

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
