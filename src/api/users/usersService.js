import { fetchWithToken } from "../../helpers/fetch";

export const getUsers = async (
  page = 1,
  limit = 10,
  sorting = null,
  search = ""
) => {
  try {
    let sortParam = "";
    let sortOrder = "";
    if (Array.isArray(sorting) && sorting.length > 0) {
      sortParam = sorting.map((sort) => sort.id).join(",");
      sortOrder = sorting.map((sort) => (sort.desc ? "desc" : "asc")).join(",");
    }

    const response = await fetchWithToken(
      `api/users/getUsers?limit=${limit}&page=${page}&sort=${sortParam}&direction=${sortOrder}&search=${
        search || ""
      }`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetchWithToken(
      "api/users/createUser",
      userData,
      "POST"
    );
    if (!response.ok) {
      throw new Error(`Error creando usuario: ${response.message}`);
    }
    return response;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await fetchWithToken(
      `api/users/updateUser/${id}`,
      userData,
      "POST"
    );
    if (!response.ok) {
      const err = new Error(response.message || "Error updating user");
      err.status = response.error;
      err.errors = response.errors;
      err.response = response;
      throw err;
    }
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const toggleUserState = async (id) => {
  try {
    const response = await fetchWithToken(
      `api/users/toggleActive/${id}`,
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
