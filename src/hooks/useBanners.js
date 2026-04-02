import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBanner,
  getBanners,
  toggleBannerState,
  updateBanner,
} from "../api/banner/bannerService";

export const useBanners = (pagination, rows, sorting, search) => {
  const queryClient = useQueryClient();

  const { data: allBanners, isLoading: isAllBannersLoading } = useQuery({
    queryKey: ["banners", pagination, rows, sorting, search],
    queryFn: () => getBanners(pagination, rows, sorting, search),
  });

  const changeBannerStatus = useMutation({
    mutationFn: ({ id }) => toggleBannerState(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
  });

  return {
    allBanners,
    isAllBannersLoading,

    // Mutations
    changeBannerStatus: changeBannerStatus.mutate,

    // Estados de las mutaciones
    isChangingStatus: changeBannerStatus.isPending,

    // Errores
    changeStatusError: changeBannerStatus.error,
  };
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  const createBannerMutation = useMutation({
    mutationFn: (bannerData) => createBanner(bannerData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banners"],
      });
    },
  });

  return {
    createBanner: createBannerMutation.mutate,
    isCreating: createBannerMutation.isPending,
    createError: createBannerMutation.error,
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
