import { useCategories } from "../../hooks/useCategories";

//Esto trae los datos de las categorias con los children_recursive
export default function SelectPublishingCategories({
  onCategoryChange,
  selectedCategory,
  defaultValue = "Sin categoria",
  categoryType,
  ...props
}) {
  const { allCategories } = useCategories();
  const filteredCategories = allCategories?.data?.filter(
    (category) => category.category_type === categoryType
  );

  return (
    <select {...props} value={selectedCategory} onChange={onCategoryChange}>
      <option value={null}>{defaultValue}</option>
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
