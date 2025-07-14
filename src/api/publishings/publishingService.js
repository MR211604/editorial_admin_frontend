import { fetchWithToken } from "../../helpers/fetch";

export const getPublishings = async (page = 1, limit = 10, $publishing_type = null, sorting, search, categoryFilter) => {
  try {

    //backend_url/api/publishings?limit=10&page=1&publishing_type=2&sort=title&direction=desc
    let sortParam = '';
    let sortOrder = '';
    if (Array.isArray(sorting) && sorting.length > 0) {
      sortParam = sorting.map(sort => sort.id).join(',');
      sortOrder = sorting.map(sort => sort.desc ? 'desc' : 'asc').join(',');
    }

    const response = await fetchWithToken(`api/publishings/getPublishings?limit=${limit}&page=${page}&publishing_type=${$publishing_type}&sort=${sortParam}&direction=${sortOrder}&search=${search}&category=${categoryFilter}`);
    console.log('Response from getPublishings:', response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;
  } catch (error) {
    console.error('Error fetching publishings:', error);
    throw error;
  }
}