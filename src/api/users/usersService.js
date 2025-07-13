import { fetchWithToken } from "../../helpers/fetch";

export const getUsers = async (page = 1, limit = 10) => {
  try {
    const response = await fetchWithToken(`api/users/getUsers?limit=${limit}&page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export const createUser = async (userData) => {
  return userData;
}

export const updateUser = async (userData) => {
  return userData;
}