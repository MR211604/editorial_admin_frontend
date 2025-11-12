import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const getAuthors = async (
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
        `api/authors/getAuthors?limit=${limit}&page=${page}&sort=${sortParam}&direction=${sortOrder}&search=${
          search || ""
        }`
      );
    },
    "Error fetching authors",
    "Error obteniendo autores"
  );
};

//?authorData: { name: string, lastname: string }
export const createAuthor = async (authorData) => {
  return handleApiCall(
    async () => {
      fetchWithToken("api/authors/createAuthor", authorData, "POST");
    },
    "Error creating author",
    "Error creando autor"
  );
};

export const updateAuthor = async (id, authorData) => {
  return handleApiCall(
    async () => {
      fetchWithToken(`api/authors/updateAuthor/${id}`, authorData, "POST");
    },
    "Error updating author",
    "Error actualizando autor"
  );
};

export const deleteAuthor = async (id) => {
  return handleApiCall(
    async () => {
      fetchWithToken(`api/authors/deleteAuthor/${id}`, {}, "POST");
    },
    "Error deleting author",
    "Error eliminando autor"
  );
};
