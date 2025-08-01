import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategory, getCategories, getCategoryById } from "../api/categories/categoriesService"

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

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: (categoryData) => createCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      })
    }
  })

  return {
    createCategory: createCategoryMutation.mutate,
    isCreating: createCategoryMutation.isPending,
    createError: createCategoryMutation.error,
  }
}