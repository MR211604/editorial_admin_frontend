import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const getBanners = async (
  page = 1,
  limit = 10,
  sorting = null,
  search = "",
) => {
  return handleApiCall(
    async () => {
      let sortParam = "";
      let sortOrder = "";
      if (Array.isArray(sorting) && sorting.length > 0) {
        sortParam = sorting.map((sort) => sort.id).join(",");
        sortOrder = sorting
          .map((sort) => (sort.desc ? "desc" : "asc"))
          .join(",");
      }
      return await fetchWithToken(
        `api/banners/getBanners?limit=${limit}&page=${page}&sort=${sortParam}&direction=${sortOrder}&search=${
          search || ""
        }`,
      );
    },
    "Error fetching banners",
    "Error obteniendo banners",
  );
};

export const toggleBannerState = async (id) => {
  return handleApiCall(
    async () => fetchWithToken(`api/banners/toggleState/${id}`, {}, "POST"),
    "Error toggling banner state",
    "Error alternando estado de banner",
  );
};

export const updateBanner = async (id, bannerData) => {
  return handleApiCall(
    async () =>
      fetchWithToken(`api/banners/updateBanner/${id}`, bannerData, "POST"),
    "Error updating banner",
    "Error actualizando banner",
  );
};

export const createBanner = async (bannerData) => {
  return handleApiCall(
    async () => fetchWithToken("api/banners/createBanner", bannerData, "POST"),
    "Error creating banner",
    "Error creando banner",
  );
};
