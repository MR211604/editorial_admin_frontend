import { fetchWithToken } from "../../../helpers/fetch";

export const getRoles = async (page = 1, limit = 10,) => {
  try {
    const response = await fetchWithToken(`api/rol/getRol?limit=${limit}&page=${page}`);
    console.log('Response from getRoles:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
}