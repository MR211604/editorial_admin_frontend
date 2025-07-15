import { fetchWithToken } from "../../../helpers/fetch";

export const getPrivileges = async (page = 1, limit = 10) => {

  try {
    const response = await fetchWithToken(`api/privileges/getPrivileges?limit=${limit}&page=${page}`);
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;

  } catch (error) {
    console.error('Error fetching privileges:', error);
    throw error;
  }

}