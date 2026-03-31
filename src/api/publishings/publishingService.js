import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const getPublishings = async (
  page = 1,
  limit = 10,
  $publishing_type = null,
  sorting,
  search = "",
  categoryFilter,
  state = 1,
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
        `api/publishings/getPublishings?limit=${limit}&page=${page}&publishing_type=${$publishing_type}&sort=${sortParam}&direction=${sortOrder}&search=${search}&category=${
          categoryFilter || ""
        }&state=${state}`,
      );
    },
    "Error recuperando publicaciones",
    "Error obteniendo publicaciones",
  );
};

export const getPublishingById = async (book_url) => {
  return handleApiCall(
    () => fetchWithToken(`api/publishings/getPublishing/${book_url}`),
    "Error fetching publishing by ID",
    "Error obteniendo publicación",
  );
};

export const updatePublishing = async (id, data) => {
  return handleApiCall(
    () =>
      fetchWithToken(`api/publishings/updatePublishing/${id}`, data, "POST"),
    "Error updating publishing",
    "Error actualizando publicación",
  );
};

export const createPublishing = async (data) => {
  return handleApiCall(
    () => fetchWithToken(`api/publishings/createPublishing`, data, "POST"),
    "Error creating publishing",
    "Error creando publicación",
  );
};

export const toggleArchivePublishing = async (id) => {
  return handleApiCall(
    () => fetchWithToken(`api/publishings/updateStatus/${id}`, {}, "POST"),
    "Error actualizando estado de publicación",
    "Error actualizando estado",
  );
};

export const deletePublishing = async (id) => {
  return handleApiCall(
    () => fetchWithToken(`api/publishings/deletePublishing/${id}`, {}, "POST"),
    "Error deleting publishing",
    "Error eliminando publicación",
  );
};
