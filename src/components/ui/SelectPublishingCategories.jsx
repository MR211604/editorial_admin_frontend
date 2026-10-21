import { useCategories } from "../../hooks/useCategories";
import { useCategoryTypes } from "../../hooks/useCategoryTypes";
import HierarchicalCategorySelect from "./HierarchicalCategorySelect";
import { flattenCategories } from "./utils/flattenCategories";

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
  const filteredCategories = allCategories?.data?.filter((category) => {
    return (
      category.category_type === matchedCategoryType?.idCategoryType ||
      category.title === "Sin categoria"
    );
  });

  const categoryOptions = flattenCategories(filteredCategories, {
    onlyActive: filterActiveCategories,
  });

  const options = [
    ...(enableAllCategoriesOption
      ? [{ value: "", label: "Todas las categorías" }]
      : []),
    ...(enableDefaultValue
      ? [{ value: defaultValue, label: defaultLabel, disabled: true }]
      : []),
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
}
