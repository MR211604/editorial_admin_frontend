import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const getCategories = async (getAll) => {
  return handleApiCall(
    async () => fetchWithToken(`api/categories/getCategories?getAll=${getAll}`),
    "Error fetching categories",
    "Error obteniendo categorias"
  );
};

export const getCategoryById = async (id) => {
  return handleApiCall(
    async () => fetchWithToken(`api/categories/getCategory/${id}`),
    "Error fetching category by ID",
    "Error obteniendo categoria"
  );
};

export const createCategory = async (categoryData) => {
  return handleApiCall(
    async () =>
      fetchWithToken("api/categories/createCategory", categoryData, "POST"),
    "Error creating category",
    "Error creando categoria"
  );
};

export const updateCategory = async (id, categoryData) => {
  return handleApiCall(
    async () =>
      fetchWithToken(
        `api/categories/updateCategory/${id}`,
        categoryData,
        "POST"
      ),
    "Error updating category",
    "Error actualizando categoria"
  );
};

export const toggleCategoryStatus = async (id) => {
  return handleApiCall(
    async () =>
      fetchWithToken(`api/categories/toggleCategoryStatus/${id}`, {}, "POST"),
    "Error toggling category status",
    "Error cambiando estado de categoria"
  );
};
