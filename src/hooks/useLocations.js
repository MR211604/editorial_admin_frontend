import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLocation,
  getLocations,
  toggleLocationState,
  updateLocation,
  uploadLocationImage,
} from "../api/locations/locationsService";

export const useLocations = () => {
  const query = useQuery({
    queryKey: ["editorialLocations"],
    queryFn: getLocations,
  });

  return {
    locations: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};

export const useLocationMutations = () => {
  const queryClient = useQueryClient();
  const refreshLocations = () =>
    queryClient.invalidateQueries({ queryKey: ["editorialLocations"] });

  const createMutation = useMutation({
    mutationFn: createLocation,
    onSuccess: refreshLocations,
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, locationData }) => updateLocation(id, locationData),
    onSuccess: refreshLocations,
  });
  const toggleMutation = useMutation({
    mutationFn: toggleLocationState,
    onSuccess: refreshLocations,
  });
  const uploadMutation = useMutation({ mutationFn: uploadLocationImage });

  return {
    createLocation: createMutation.mutateAsync,
    updateLocation: updateMutation.mutateAsync,
    toggleLocationState: toggleMutation.mutateAsync,
    uploadLocationImage: uploadMutation.mutateAsync,
    isSaving:
      createMutation.isPending ||
      updateMutation.isPending ||
      uploadMutation.isPending,
  };
};
