import { fetchWithToken } from "../../helpers/fetch";

export const getCategories = async (getAll) => {
  try {
    const response = await fetchWithToken(
      `api/categories/getCategories?getAll=${getAll}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await fetchWithToken(`api/categories/getCategory/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error(`Error fetching category: ${error.message}`);
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await fetchWithToken(
      "api/categories/createCategory",
      categoryData,
      "POST"
    );

    if (!response.ok) {
      const err = new Error(response.message || "Error creating category");
      err.status = response.error;
      err.errors = response.errors;
      err.response = response;
      throw err;
    }
    return response;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await fetchWithToken(
      `api/categories/updateCategory/${id}`,
      categoryData,
      "POST"
    );

    if (!response.ok) {
      const err = new Error(response.message || "Error updating category");
      err.status = response.error;
      err.errors = response.errors;
      err.response = response;
      throw err;
    }
    return response;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const toggleCategoryStatus = async (id) => {
  try {
    const response = await fetchWithToken(
      `api/categories/toggleState/${id}`,
      {},
      "POST"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.message}`);
    }
    return response;
  } catch (error) {
    console.error("Error creating publishing:", error);
    throw error;
  }
};
