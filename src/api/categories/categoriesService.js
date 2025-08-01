import { fetchWithToken } from "../../helpers/fetch";

export const getCategories = async () => {
  try {

    const response = await fetchWithToken('api/categories/getCategories');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;

  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error(`Error fetching categories: ${error.message}`);
  }
}