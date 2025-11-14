import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const getUsers = async (
  page = 1,
  limit = 10,
  sorting = null,
  search = ""
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
        `api/users/getUsers?limit=${limit}&page=${page}&sort=${sortParam}&direction=${sortOrder}&search=${
          search || ""
        }`
      );
    },
    "Error recuperando usuarios",
    "Error obteniendo usuarios"
  );
};

export const createUser = async (userData) => {
  return handleApiCall(
    async () => fetchWithToken("api/users/createUser", userData, "POST"),
    "Error creating user",
    "Error creando usuario"
  );
};

export const updateUser = async (id, userData) => {
  return handleApiCall(
    async () => fetchWithToken(`api/users/updateUser/${id}`, userData, "POST"),
    "Error updating user",
    "Error actualizando usuario"
  );
};

export const toggleUserState = async (id) => {
  return handleApiCall(
    async () => fetchWithToken(`api/users/toggleActive/${id}`, {}, "POST"),
    "Error toggling user state",
    "Error alternando estado de usuario"
  );
};
