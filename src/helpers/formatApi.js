/**
 * Formateador de respuestas de la API
 * @param {Object} response - Respuesta de la API
 * @param {string} defaultMessage - Mensaje por defecto si no viene en la respuesta
 * @throws {Error} Error formateado con status, errors y response
 * @returns {Object} La respuesta si es exitosa
 */
export const handleApiResponse = (
  response,
  defaultMessage = "Error en la solicitud"
) => {
  if (!response.ok) {
    const err = new Error(response.message || defaultMessage);
    err.status = response.error;
    err.errors = response.errors;
    err.response = response;
    throw err;
  }
  return response;
};

/**
 * llamadas a la API con manejo de errores estandarizado
 * @param {Function} apiCall - Función asíncrona que realiza la llamada a la API
 * @param {string} errorContext - Contexto del error para logging
 * @param {string} defaultErrorMessage - Mensaje de error por defecto
 */
export const handleApiCall = async (
  apiCall,
  errorContext,
  defaultErrorMessage
) => {
  try {
    const response = await apiCall();
    return handleApiResponse(response, defaultErrorMessage);
  } catch (error) {
    console.error(`${errorContext}:`, error);
    throw error;
  }
};
