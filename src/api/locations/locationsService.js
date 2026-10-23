import { fetchWithToken } from "../../helpers/fetch";
import { handleApiCall } from "../../helpers/formatApi";

export const getLocations = async () =>
  handleApiCall(
    async () => fetchWithToken("api/locations/getLocations"),
    "Error fetching editorial locations",
    "Error obteniendo ubicaciones",
  );

export const createLocation = async (locationData) =>
  handleApiCall(
    async () =>
      fetchWithToken("api/locations/createLocation", locationData, "POST"),
    "Error creating editorial location",
    "Error creando ubicación",
  );

export const updateLocation = async (id, locationData) =>
  handleApiCall(
    async () =>
      fetchWithToken(
        `api/locations/updateLocation/${id}`,
        locationData,
        "POST",
      ),
    "Error updating editorial location",
    "Error actualizando ubicación",
  );

export const toggleLocationState = async (id) =>
  handleApiCall(
    async () =>
      fetchWithToken(`api/locations/toggleState/${id}`, {}, "POST"),
    "Error changing editorial location state",
    "Error cambiando estado de la ubicación",
  );

export const uploadLocationImage = async (formData) =>
  handleApiCall(
    async () =>
      fetchWithToken("api/locations/uploadLocationImage", formData, "POST"),
    "Error uploading editorial location image",
    "Error al subir el logo de la ubicación",
  );
