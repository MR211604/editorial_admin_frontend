
export default function SelectCategories({ onCategoryChange, selectedCategory }) {

  const selectOptions = [
    { id: 1, value: 1, label: "Científica" },
    { id: 2, value: 2, label: "Ing-novación" },
    { id: 3, value: 3, label: "Diá-logos" },
    { id: 4, value: 4, label: "Teoría y Praxis" }
  ]

  return (
    <select className="form-select form-select-md w-50 ms-2" defaultValue={selectedCategory} onChange={onCategoryChange}>
      <option value={""}>Todas las categorias</option>
      <optgroup label="Revistas">
        {
          selectOptions.map(option => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))
        }
      </optgroup>
    </select>
  )
}
