import { fetchWithToken } from "../../helpers/fetch";

export const getAuthors = async (
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
      `api/authors/getAuthors?limit=${limit}&page=${page}&sort=${sortParam}&direction=${sortOrder}&search=${
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

//?authorData: { name: string, lastname: string }
export const createAuthor = async (authorData) => {
  try {
    const response = await fetchWithToken(
      "api/authors/createAuthor",
      authorData,
      "POST"
    );
    if (!response.ok) {
      const err = new Error(response.message || "Error creating author");
      err.status = response.error;
      err.errors = response.errors;
      err.response = response;
      throw err;
    }
    return response;
  } catch (error) {
    console.error("Error creating author:", error);
    throw error;
  }
};

export const updateAuthor = async (id, authorData) => {
  try {
    const response = await fetchWithToken(
      `api/authors/updateAuthor/${id}`,
      authorData,
      "POST"
    );
    if (!response.ok) {
      const err = new Error(response.message || "Error updating author");
      err.status = response.error;
      err.errors = response.errors;
      err.response = response;
      throw err;
    }
    return response;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    const response = await fetchWithToken(
      `api/authors/deleteAuthor/${id}`,
      {},
      "POST"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.message}`);
    }
    return response;
  } catch (error) {
    console.error("Error deleting author:", error);
    throw error;
  }
};
