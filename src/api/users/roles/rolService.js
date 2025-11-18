import { fetchWithToken } from "../../../helpers/fetch";
import { handleApiCall } from "../../../helpers/formatApi";

export const getRoles = async (page = 1, limit = 10, search = "") => {
  return handleApiCall(
    async () =>
      fetchWithToken(
        `api/rol/getRol?limit=${limit}&page=${page}&search=${search || ""}`
      ),
    "Error fetching roles",
    "Error obteniendo roles"
  );
};

export const createRol = async (rolData) => {
  return handleApiCall(
    async () => fetchWithToken("api/rol/createRol", rolData, "POST"),
    "Error creating role",
    "Error creando rol"
  );
};
