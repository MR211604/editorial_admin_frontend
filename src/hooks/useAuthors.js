import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAuthor, getAuthors } from "../api/authors/authorsService";

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

  return {
    allAuthors,
    isAllAuthorsLoading,
    // Mutations
    createAuthor: createAuthorMutation.mutate,

    //States
    isCreating: createAuthorMutation.isPending,

    // Errors
    createError: createAuthorMutation.error,
  };
}