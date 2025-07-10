const backend_url = import.meta.env.VITE_EDITORIAL_LOCAL_API_URL;

export const getMagazines = async (page = 1, limit = 10, $magazine_type = null, sorting, search) => {
  try {
    // Construct sorting parameters
    let sortParam = '';
    let sortOrder = '';
    if (Array.isArray(sorting) && sorting.length > 0) {
      sortParam = sorting.map(sort => sort.id).join(',');
      sortOrder = sorting.map(sort => sort.desc ? 'desc' : 'asc').join(',');
    }

    // Fetch magazines from the API
    const response = await fetch(`${backend_url}/api/magazines?limit=${limit}&page=${page}&magazine_type=${$magazine_type}&sort=${sortParam}&direction=${sortOrder}&search=${search}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching magazines:', error);
    throw error;
  }
}