import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const getCategoryTypes = async (page = 1, limit = 10) => {
  return handleApiCall(
    async () =>
      fetchWithToken(
        `api/categoryTypes/getCategoryTypes?limit=${limit}&page=${page}`
      ),
    "Error fetching category types",
    "Error obteniendo los tipos de categorías"
  );
};
