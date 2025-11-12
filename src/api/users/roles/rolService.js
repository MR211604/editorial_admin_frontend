import { fetchWithToken } from "../../../helpers/fetch";
import { handleApiCall } from "../../../helpers/formatApi";

export const getRoles = async (page = 1, limit = 10) => {
  return handleApiCall(
    async () => {
      fetchWithToken(`api/rol/getRol?limit=${limit}&page=${page}`);
    },
    "Error fetching roles",
    "Error obteniendo roles"
  );
};
