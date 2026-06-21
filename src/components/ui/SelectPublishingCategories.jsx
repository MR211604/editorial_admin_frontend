import { useCategories } from "../../hooks/useCategories";
import { useCategoryTypes } from "../../hooks/useCategoryTypes";

//Esto trae los datos de las categorias con los children_recursive

// Props:
// - onCategoryChange: función que se llama cuando se selecciona una categoría
// - selectedCategory: categoría seleccionada actualmente
// - categoryType: tipo de categoría a filtrar
// - enableAllCategoriesOption: muestra la opción "Todas las categorías"
// - filterActiveCategories: filtra las categorías para mostrar solo las activas
// - enableDefaultValue: habilita un valor predeterminado deshabilitado
// - defaultValue: valor predeterminado para la opción deshabilitada
// - defaultLabel: etiqueta para la opción deshabilitada
export default function SelectPublishingCategories({
  onCategoryChange,
  selectedCategory,
  categoryType,
  enableAllCategoriesOption = false,
  filterActiveCategories = false,
  enableDefaultValue = false,
  defaultValue = "",
  defaultLabel = "Seleccione una categoría",
  ...props
}) {
  const { allCategories } = useCategories({ getAll: false });
  const { allCategoryTypes } = useCategoryTypes();

  // Encontrar el tipo de categoría que coincide con el categoryType proporcionado
  const matchedCategoryType = allCategoryTypes?.data?.find(
    (type) => type.name === categoryType,
  );

  // Filtar las categorías según el tipo de categoría, agregando adicionalmente "Sin Categoria"
  const filteredCategories = allCategories?.data
    ?.filter((category) => {
      return (
        category.category_type === matchedCategoryType?.idCategoryType ||
        category.title === "Sin categoria"
      );
    })
    .map((category) => {
      if (filterActiveCategories) {
        // Filtrar hijos activos
        const activeChildren = category.children_recursive.filter(
          (child) => child.state === 1,
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

  console.log("filteredCategories", filteredCategories);

  return (
    <select {...props} value={selectedCategory} onChange={onCategoryChange}>
      {enableAllCategoriesOption && (
        <option value="">Todas las categorías</option>
      )}
      {enableDefaultValue && (
        <option value={defaultValue} disabled>
          {defaultLabel}
        </option>
      )}
      {filteredCategories?.map((category) =>
        category.children_recursive.length > 0 ? (
          <optgroup
            key={category.idCategory + category.title}
            label={category.title}
          >
            {category.children_recursive.map((child) => (
              <option key={child.idCategory} value={child.idCategory}>
                {child.title}
              </option>
            ))}
          </optgroup>
        ) : (
          <option key={category.idCategory} value={category.idCategory}>
            {category.title}
          </option>
        ),
      )}
    </select>
  );
}
