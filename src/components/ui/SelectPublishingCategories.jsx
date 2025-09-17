import { DEFAULT_MAIN_CATEGORY_ID } from "../../constants/common";
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
  defaultValue = "Sin categoria",
  defaultCategoryValue = DEFAULT_MAIN_CATEGORY_ID,
  categoryType,
  ...props
}) {
  const { allCategories } = useCategories();
  const filteredCategories = allCategories?.data?.filter(
    (category) => category.category_type === categoryType
  );

  return (
    <select {...props} value={selectedCategory} onChange={onCategoryChange}>
      <option value={defaultCategoryValue}>{defaultValue}</option>
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
