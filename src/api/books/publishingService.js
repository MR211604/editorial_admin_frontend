const backend_url = import.meta.env.VITE_EDITORIAL_LOCAL_API_URL;

export const getPublishings = async (page = 1, limit = 10, $publishing_type = null) => {
  try {
    const response = await fetch(`${backend_url}/api/publishings?limit=${limit}&page=${page}&publishing_type=${$publishing_type}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching publishings:', error);
    throw error;
  }
}