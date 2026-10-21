// Aplana el árbol de categorías (children_recursive) en una lista con su profundidad.
// - onlyActive: omite las inactivas; sus hijas activas toman el lugar de la inactiva.
// - excludedId: omite esa categoría y todos sus descendientes.
export const flattenCategories = (
  categories = [],
  { depth = 0, onlyActive = false, excludedId } = {},
) =>
  categories.flatMap((category) => {
    if (category.idCategory === excludedId) return [];

    const isVisible = !onlyActive || category.state === 1;
    const children = flattenCategories(category.children_recursive, {
      depth: isVisible ? depth + 1 : depth,
      onlyActive,
      excludedId,
    });

    if (!isVisible) return children;

    return [
      { ...category, depth, hasChildren: children.length > 0 },
      ...children,
    ];
  });
