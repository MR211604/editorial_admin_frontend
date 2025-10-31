import { fetchWithToken } from "../../helpers/fetch";

export const createPublishingDetail = async (data) => {
  try {
    const response = await fetchWithToken(
      "api/publishingDetails/createPublishingDetail",
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
    console.error("Error creating publishing detail:", error);
    throw error;
  }
};

export const updatePublishingDetail = async (id, data) => {
  try {
    const response = await fetchWithToken(
      `api/publishingDetails/updatePublishingDetail/${id}`,
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
    console.error("Error updating publishing detail:", error);
    throw error;
  }
};

export const deletePublishingDetail = async (id) => {
  try {
    const response = await fetchWithToken(
      `api/publishingDetails/deletePublishingDetail/${id}`,
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
    console.error("Error deleting publishing detail:", error);
    throw error;
  }
};
