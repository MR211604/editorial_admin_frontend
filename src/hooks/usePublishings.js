import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPublishing, getPublishingById, getPublishings, updatePublishing } from "../api/publishings/publishingService";

//Pagination: la pagina actual
//Rows: cantidad de filas por pagina
//Publishing_type: tipo de publicacion (1: libros, 2: revistas, 3: manuales)
export const usePublishings = (pagination, rows, publishing_type, sorting, search, categoryFilter) => {

  const { data: allPublishings, isLoading: isAllPublishingsLoading } = useQuery({
    queryKey: ['publishings', pagination, rows, publishing_type, sorting, search, categoryFilter],
    queryFn: () => getPublishings(pagination, rows, publishing_type, sorting, search, categoryFilter)
  });

  return {
    allPublishings,
    isAllPublishingsLoading,
  };
}

export const useCreatePublishing = () => {
  const queryClient = useQueryClient();

  const createPublishingMutation = useMutation({
    mutationFn: (publishingData) => createPublishing(publishingData),
    onSuccess: () => {
      // Refresh dependent publishing lists after create/update
      queryClient.invalidateQueries({ queryKey: ['publishings'] });
      queryClient.invalidateQueries({ queryKey: ['publishing'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });

  return {
    createPublishing: createPublishingMutation.mutate,
    isCreating: createPublishingMutation.isPending,
    createError: createPublishingMutation.error,
  };
}

export const useUpdatePublishing = (id) => {
  const queryClient = useQueryClient();

  const updatePublishingMutation = useMutation({
    mutationFn: (publishingData) => updatePublishing(id, publishingData),
    onSuccess: () => {
      // Refresh dependent publishing lists after create/update
      queryClient.invalidateQueries({ queryKey: ['publishing', id] });
      queryClient.invalidateQueries({ queryKey: ['publishings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] });
    },
  });

  return {
    updatePublishing: updatePublishingMutation.mutate,
    isUpdating: updatePublishingMutation.isPending,
    updateError: updatePublishingMutation.error,
  };
}

export const usePublishing = (id) => {
  const { data: publishing, isLoading: isPublishingLoading } = useQuery({
    queryKey: ['publishing', id],
    queryFn: () => getPublishingById(id)
  });

  return {
    publishing,
    isPublishingLoading
  };
}
