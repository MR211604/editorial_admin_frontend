import { memo } from "react"

const SelectAllCategories = memo(function SelectAllCategories({ onCategoryChange, selectedCategory, allCategories, ...props }) {
  return (
    <select {...props} value={selectedCategory ?? ""} onChange={onCategoryChange}>
      <option value={null}>Sin categoría</option>
      {
        allCategories?.data?.map(category => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))
      }
    </select>
  )
})

export default SelectAllCategories