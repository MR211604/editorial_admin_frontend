const backend_url = import.meta.env.VITE_EDITORIAL_LOCAL_API_URL;

export const getPublishings = async (page = 1, limit = 10, $publishing_type = null, sorting) => {
  try {

    //backend_url/api/publishings?limit=10&page=1&publishing_type=2&sort=title&direction=desc
    let sortParam = '';
    let sortOrder = '';
    if (Array.isArray(sorting) && sorting.length > 0) {
      sortParam = sorting.map(sort => sort.id).join(',');
      sortOrder = sorting.map(sort => sort.desc ? 'desc' : 'asc').join(',');
    }

    const response = await fetch(`${backend_url}/api/publishings?limit=${limit}&page=${page}&publishing_type=${$publishing_type}&sort=${sortParam}&direction=${sortOrder}`);
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