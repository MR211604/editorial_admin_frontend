import { useQuery } from "@tanstack/react-query"
import { getCategories, getCategoryById } from "../api/categories/categoriesService"

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

export const useCategory = (id) => {
  const { data: category, error, isLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id)
  })

  return {
    category,
    isLoading,
    error
  }
}