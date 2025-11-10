import { useQuery } from "@tanstack/react-query";
import { getCategoryTypes } from "../api/categories/categoryTypesService";

export const useCategoryTypes = (pagination, rows) => {
  const { data: allCategoryTypes, isLoading: isAllCategoryTypesLoading } =
    useQuery({
      queryKey: ["categoryTypes", pagination, rows],
      queryFn: () => getCategoryTypes(pagination, rows),
    });

  return {
    allCategoryTypes,
    isAllCategoryTypesLoading,
  };
};
