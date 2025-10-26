import { fetchWithToken } from "../../helpers/fetch";

export const getPublishings = async (
  page = 1,
  limit = 10,
  $publishing_type = null,
  sorting,
  search = "",
  categoryFilter,
  isArchived = 0
) => {
  try {
    //backend_url/api/publishings?limit=10&page=1&publishing_type=2&sort=title&direction=desc
    let sortParam = "";
    let sortOrder = "";
    if (Array.isArray(sorting) && sorting.length > 0) {
      sortParam = sorting.map((sort) => sort.id).join(",");
      sortOrder = sorting.map((sort) => (sort.desc ? "desc" : "asc")).join(",");
    }

    const response = await fetchWithToken(
      `api/publishings/getPublishings?limit=${limit}&page=${page}&publishing_type=${$publishing_type}&sort=${sortParam}&direction=${sortOrder}&search=${search}&category=${
        categoryFilter || ""
      }&is_archived=${isArchived}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;
  } catch (error) {
    console.error("Error fetching publishings:", error);
    throw error;
  }
};

export const getPublishingById = async (id) => {
  try {
    const response = await fetchWithToken(
      `api/publishings/getPublishing/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    return response;
  } catch (error) {
    console.error("Error fetching publishing by ID:", error);
    throw error;
  }
};

export const updatePublishing = async (id, data) => {
  try {
    const response = await fetchWithToken(
      `api/publishings/updatePublishing/${id}`,
      data,
      "POST"
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.message} - ${JSON.stringify(
          response.errors
        )}`
      );
    }
    return response;
  } catch (error) {
    console.error("Error updating publishing:", error);
    throw error;
  }
};

export const createPublishing = async (data) => {
  try {
    const response = await fetchWithToken(
      `api/publishings/createPublishing`,
      data,
      "POST"
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.message} - ${JSON.stringify(
          response.errors
        )}`
      );
    }
    return response;
  } catch (error) {
    console.error("Error creating publishing:", error);
    throw error;
  }
};

export const toggleArchivePublishing = async (id, isArchived) => {
  try {
    const response = await fetchWithToken(
      `api/publishings/updateStatus/${id}`,
      { is_archived: isArchived }, // Permite modificar el estado de la publicacion
      "POST"
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.message} - ${JSON.stringify(
          response.errors
        )}`
      );
    }
    return response;
  } catch (error) {
    console.error("Error creating publishing:", error);
    throw error;
  }
};

export const deletePublishing = async (id) => {
  try {
    const response = await fetchWithToken(
      `api/publishings/deletePublishing/${id}`,
      {},
      "POST"
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.message} - ${JSON.stringify(
          response.errors
        )}`
      );
    }
    return response;
  } catch (error) {
    console.error("Error creating publishing:", error);
    throw error;
  }
};
