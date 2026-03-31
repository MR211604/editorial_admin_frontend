import { memo } from "react";

const SelectAllCategories = memo(function SelectAllCategories({
  onCategoryChange,
  selectedCategory,
  allCategories,
  ...props
}) {
  return (
    <select {...props} value={selectedCategory} onChange={onCategoryChange}>
      <option value="">-</option>
      {allCategories?.data?.map((category) => (
        <option key={category.idCategory} value={category.idCategory}>
          {category.title}
        </option>
      ))}
    </select>
  );
});

export default SelectAllCategories;
