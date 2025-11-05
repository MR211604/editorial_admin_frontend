import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAuthor,
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from "../api/authors/authorsService";

export const useAuthors = (pagination, rows, sorting, search) => {
  const queryClient = useQueryClient();

  const {
    data: allAuthors,
    isLoading: isAllAuthorsLoading,
    isPending: isAllAuthorsPending,
  } = useQuery({
    queryKey: ["authors", pagination, rows, sorting, search],
    queryFn: () => getAuthors(pagination, rows, sorting, search),
    keepPreviousData: true,
  });

  const createAuthorMutation = useMutation({
    mutationFn: (authorData) => createAuthor(authorData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authors"],
      });
    },
  });

  return {
    allAuthors,
    isAllAuthorsLoading,
    isAllAuthorsPending,
    // Mutations
    createAuthor: createAuthorMutation.mutate,
    //States
    isCreating: createAuthorMutation.isPending,
    // Errors
    createError: createAuthorMutation.error,
  };
};

export const useUpdateAuthor = (id) => {
  const queryClient = useQueryClient();

  const updateAuthorMutation = useMutation({
    mutationFn: (authorData) => updateAuthor(id, authorData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authors"],
      });
      queryClient.invalidateQueries({
        queryKey: ["publishings"],
      });
    },
  });

  return {
    updateAuthor: updateAuthorMutation.mutate,
    isUpdating: updateAuthorMutation.isPending,
    updateError: updateAuthorMutation.error,
  };
};

export const useDeleteAuthor = (id) => {
  const queryClient = useQueryClient();

  const deleteAuthorMutation = useMutation({
    mutationFn: () => deleteAuthor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authors"],
      });
      queryClient.invalidateQueries({
        queryKey: ["publishings"],
      });
    },
  });

  return {
    deleteAuthor: deleteAuthorMutation.mutate,
    isDeleting: deleteAuthorMutation.isPending,
    deleteError: deleteAuthorMutation.error,
  };
};
