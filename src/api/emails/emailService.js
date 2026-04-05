import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const getEmails = async (
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
        `api/emails/getEmails?limit=${limit}&page=${page}&sort=${sortParam}&direction=${sortOrder}&search=${
          search || ""
        }`,
      );
    },
    "Error fetching emails",
    "Error obteniendo correos",
  );
};
