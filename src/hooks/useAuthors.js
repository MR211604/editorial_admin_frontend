import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAuthor, getAuthors, updateAuthor } from "../api/authors/authorsService";

export const useAuthors = (pagination, rows, sorting, search) => {

  const queryClient = useQueryClient();

  const { data: allAuthors, isLoading: isAllAuthorsLoading } = useQuery({
    queryKey: ['authors', pagination, rows, sorting, search],
    queryFn: () => getAuthors(pagination, rows, sorting, search)
  });

  const createAuthorMutation = useMutation({
    mutationFn: (authorData) => createAuthor(authorData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authors']
      })
    }
  })

  const updateAuthorMutation = useMutation({
    mutationFn: (authorData) => updateAuthor(authorData), 
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authors']
      })
    }
  })

  return {
    allAuthors,
    isAllAuthorsLoading,
    // Mutations
    createAuthor: createAuthorMutation.mutate,
    updateAuthor: updateAuthorMutation.mutate,
    //States
    isCreating: createAuthorMutation.isPending,
    isUpdating: updateAuthorMutation.isPending,

    // Errors
    createError: createAuthorMutation.error,
    updateError: updateAuthorMutation.error,
  };
}