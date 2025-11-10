import { fetchWithToken } from "../../helpers/fetch";

export const getCategoryTypes = async (page = 1, limit = 10) => {
  try {
    const response = await fetchWithToken(
      `api/categoryTypes/getCategoryTypes?limit=${limit}&page=${page}`
    );
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.errors = response.errors;
      throw error;
    }
    return response;
  } catch (error) {
    console.error("Error fetching category types:", error);
    throw error;
  }
};
