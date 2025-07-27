import React from 'react'

export default function SelectBookCategories({ onCategoryChange, selectedCategory, ...props }) {

  const selectOptions = [
    { id: 1, value: 1, label: "Categoria libro 1" },
    { id: 2, value: 2, label: "Categoria libro 2" },
    { id: 3, value: 3, label: "Categoria libro 3" },
    { id: 4, value: 4, label: "Categoria libro 4" }
  ]

  return (
    <select {...props} value={selectedCategory} onChange={onCategoryChange}>
      <option value="">Todas las categorias</option>
      <optgroup label="Tipos de libros">
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
