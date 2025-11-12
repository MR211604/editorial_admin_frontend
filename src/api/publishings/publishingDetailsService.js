import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const createPublishingDetail = async (data) => {
  return handleApiCall(
    async () =>
      fetchWithToken(
        "api/publishingDetails/createPublishingDetail",
        data,
        "POST"
      ),
    "Error creating publishing detail",
    "Error creando detalle de publicación"
  );
};

export const updatePublishingDetail = async (id, data) => {
  return handleApiCall(
    async () =>
      fetchWithToken(
        `api/publishingDetails/updatePublishingDetail/${id}`,
        data,
        "POST"
      ),
    "Error updating publishing detail",
    "Error actualizando detalle de publicación"
  );
};

export const deletePublishingDetail = async (id) => {
  return handleApiCall(
    async () =>
      fetchWithToken(
        `api/publishingDetails/deletePublishingDetail/${id}`,
        {},
        "POST"
      ),
    "Error deleting publishing detail",
    "Error eliminando detalle de publicación"
  );
};
