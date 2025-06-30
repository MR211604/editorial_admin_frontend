const backend_url = import.meta.env.VITE_EDITORIAL_LOCAL_API_URL;

export const getUsers = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${backend_url}/api/users/getUsers?limit=${limit}&page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}