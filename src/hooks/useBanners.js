import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBanners,
  toggleBannerState,
  updateBanner,
} from "../api/banner/bannerService";

export const useBanners = (pagination, rows, sorting, search, isActive) => {
  const queryClient = useQueryClient();

  const { data: allBanners, isLoading: isAllBannersLoading } = useQuery({
    queryKey: ["banners", pagination, rows, sorting, search, isActive],
    queryFn: () => getBanners(pagination, rows, sorting, search, isActive),
  });

  const changeBannerStatus = useMutation({
    mutationFn: ({ id }) => toggleBannerState(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    allBanners,
    isAllBannersLoading,

    // Mutations
    changeUserStatus: changeBannerStatus.mutate,

    // Estados de las mutaciones
    isChangingStatus: changeBannerStatus.isPending,

    // Errores
    changeStatusError: changeBannerStatus.error,
  };
};

export const useUpdateBanner = (id) => {
  const queryClient = useQueryClient();
  const updateBannerMutation = useMutation({
    mutationFn: (bannerData) => updateBanner(id, bannerData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
  });

  return {
    updateBanner: updateBannerMutation.mutate,
    isUpdating: updateBannerMutation.isPending,
    updateError: updateBannerMutation.error,
  };
};
