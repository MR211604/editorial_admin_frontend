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
  return userData;
};

export const updateUser = async (userData) => {
  return userData;
};
