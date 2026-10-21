import { memo } from "react";
import HierarchicalCategorySelect from "./HierarchicalCategorySelect";
import { flattenCategories } from "./utils/flattenCategories";

const SelectAllCategories = memo(function SelectAllCategories({
  onCategoryChange,
  selectedCategory,
  allCategories,
  excludedCategoryId,
  ...props
}) {
  const categoryOptions = flattenCategories(allCategories?.data, {
    excludedId: excludedCategoryId,
  });

  const options = [
    { value: "", label: "-" },
    ...categoryOptions.map((category) => ({
      value: category.idCategory,
      label: category.title,
      depth: category.depth,
      hasChildren: category.hasChildren,
    })),
  ];

  return (
    <HierarchicalCategorySelect
      {...props}
      options={options}
      selectedValue={selectedCategory}
      onChange={onCategoryChange}
    />
  );
});

export default SelectAllCategories;
