const backend_url = import.meta.env.EDITORIAL_LOCAL_API_URL;

export const getPublishings = async (page = 1, limit = 10, $publishing_type = null) => {
  try {
    const response = await fetch(`${backend_url}/publishings?page=${page}&limit=${limit}&publishing_type=${$publishing_type}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching publishings:', error);
    throw error;
  }
}