import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPublishing,
  deletePublishing,
  getPublishingById,
  getPublishings,
  toggleArchivePublishing,
  updatePublishing,
} from "../api/publishings/publishingService";

//Pagination: la pagina actual
//Rows: cantidad de filas por pagina
//Publishing_type: tipo de publicacion (1: libros, 2: revistas)
export const usePublishings = (
  pagination,
  rows,
  publishing_type,
  sorting,
  search,
  categoryFilter,
  state,
) => {
  const { data: allPublishings, isLoading: isAllPublishingsLoading } = useQuery(
    {
      queryKey: [
        "publishings",
        pagination,
        rows,
        publishing_type,
        sorting,
        search,
        categoryFilter,
        state,
      ],
      queryFn: () =>
        getPublishings(
          pagination,
          rows,
          publishing_type,
          sorting,
          search,
          categoryFilter,
          state,
        ),
    },
  );

  return {
    allPublishings,
    isAllPublishingsLoading,
  };
};

export const useCreatePublishing = () => {
  const queryClient = useQueryClient();

  const createPublishingMutation = useMutation({
    mutationFn: (publishingData) => createPublishing(publishingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishings"] });
      queryClient.invalidateQueries({ queryKey: ["publishing"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] });
    },
  });

  return {
    createPublishing: createPublishingMutation.mutate,
    isCreating: createPublishingMutation.isPending,
    createError: createPublishingMutation.error,
  };
};

export const usePublishing = (id) => {
  const { data: publishing, isLoading: isPublishingLoading } = useQuery({
    queryKey: ["publishing", id],
    queryFn: () => getPublishingById(id),
  });

  return {
    publishing,
    isPublishingLoading,
  };
};

export const useUpdatePublishing = (id) => {
  const queryClient = useQueryClient();

  const updatePublishingMutation = useMutation({
    mutationFn: (publishingData) => updatePublishing(id, publishingData),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["publishings"] }),
        queryClient.invalidateQueries({ queryKey: ["publishing"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard-summary"] }),
      ]);
    },
  });

  return {
    updatePublishing: updatePublishingMutation.mutate,
    isUpdating: updatePublishingMutation.isPending,
    updateError: updatePublishingMutation.error,
  };
};

export const useArchivePublishing = () => {
  const queryClient = useQueryClient();
  const archivePublishingMutation = useMutation({
    mutationFn: ({ id }) => toggleArchivePublishing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishings"] });
    },
  });

  return {
    archivePublishing: archivePublishingMutation.mutate,
    isArchiving: archivePublishingMutation.isPending,
  };
};

export const useDeletePublishing = (id) => {
  const queryClient = useQueryClient();

  const deletePublishingMutation = useMutation({
    mutationFn: () => deletePublishing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishings"] });
    },
  });

  return {
    deletePublishingMutation: deletePublishingMutation.mutate,
    isDeleting: deletePublishingMutation.isPending,
  };
};
