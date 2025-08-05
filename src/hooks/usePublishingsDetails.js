import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPublishingDetail, updatePublishingDetail } from "../api/publishings/publishingDetailsService";

export const useCreatePublishingDetail = () => {
  const queryClient = useQueryClient();

  const createPublishingDetailMutation = useMutation({
    mutationFn: (data) => createPublishingDetail(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['publishings']
      });
    }
  });

  return {
    createPublishingDetail: createPublishingDetailMutation.mutate,
    isCreating: createPublishingDetailMutation.isPending,
    createError: createPublishingDetailMutation.error,
  };
}

export const useUpdatePublishingDetail = (id) => {
  const queryClient = useQueryClient();

  const updatePublishingDetailMutation = useMutation({
    queryKey: ['publishing', id],
    mutationFn: (data) => updatePublishingDetail(id, data), // Assuming the same function is used for update
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['publishing', id]
      });
    }
  });

  return {
    updatePublishingDetail: updatePublishingDetailMutation.mutate,
    isUpdating: updatePublishingDetailMutation.isPending,
    updateError: updatePublishingDetailMutation.error,
  };
}