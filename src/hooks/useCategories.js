import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../api/categories/categoriesService"

export const useCategories = () => {
  const { data: allCategories, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })  

  return {
    allCategories,
    isLoading,
    error
  }
}