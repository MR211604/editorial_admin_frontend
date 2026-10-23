import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const getDocuments = async () =>
  handleApiCall(
    async () => fetchWithToken("api/documents/getDocuments"),
    "Error fetching editorial documents",
    "Error obteniendo documentos",
  );

export const createDocument = async (documentData) =>
  handleApiCall(
    async () =>
      fetchWithToken("api/documents/createDocument", documentData, "POST"),
    "Error creating editorial document",
    "Error creando documento",
  );

export const updateDocument = async (id, documentData) =>
  handleApiCall(
    async () =>
      fetchWithToken(
        `api/documents/updateDocument/${id}`,
        documentData,
        "POST",
      ),
    "Error updating editorial document",
    "Error actualizando documento",
  );

export const toggleDocumentState = async (id) =>
  handleApiCall(
    async () =>
      fetchWithToken(`api/documents/toggleState/${id}`, {}, "POST"),
    "Error toggling editorial document state",
    "Error cambiando estado del documento",
  );

export const uploadDocumentImage = async (formData) =>
  handleApiCall(
    async () =>
      fetchWithToken("api/documents/uploadDocumentImage", formData, "POST"),
    "Error uploading editorial document image",
    "Error al subir imagen del documento",
  );
