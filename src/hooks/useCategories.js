import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  getCategories,
  getCategoryById,
  toggleCategoryStatus,
  updateCategory,
  uploadCategoryImage,
} from "../api/categories/categoriesService";

export const useCategories = ({ getAll = false } = {}) => {
  const {
    data: allCategories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories", getAll],
    queryFn: () => getCategories(getAll),
  });

  return {
    allCategories,
    isLoading,
    error,
  };
};

export const useCategory = (id) => {
  const { data: category, isLoading } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
  });

  return {
    category,
    isLoading,
  };
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: (categoryData) => createCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return {
    createCategory: createCategoryMutation.mutate,
    isCreating: createCategoryMutation.isPending,
    createError: createCategoryMutation.error,
  };
};

export const useUpdateCategory = (id) => {
  const queryClient = useQueryClient();

  const updateCategoryMutation = useMutation({
    queryKey: ["category", id],
    mutationFn: (categoryData) => updateCategory(id, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category", id],
      });
    },
  });

  return {
    updateCategory: updateCategoryMutation.mutate,
    isUpdating: updateCategoryMutation.isPending,
    updateError: updateCategoryMutation.error,
  };
};

export const useUploadCategoryImage = () => {
  const queryClient = useQueryClient();

  const uploadCategoryImageMutation = useMutation({
    mutationFn: (categoryData) => uploadCategoryImage(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return {
    uploadCategory: uploadCategoryImageMutation.mutateAsync,
    isUploading: uploadCategoryImageMutation.isPending,
    uploadError: uploadCategoryImageMutation.error,
  };
};

export const useCategoryChangeStatus = () => {
  const queryClient = useQueryClient();
  const changeCategoryStatusMutation = useMutation({
    mutationFn: ({ id }) => toggleCategoryStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    changeCategoryStatus: changeCategoryStatusMutation.mutate,
    isChanging: changeCategoryStatusMutation.isPending,
  };
};
