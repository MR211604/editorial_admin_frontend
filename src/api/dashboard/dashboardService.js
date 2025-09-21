import { fetchWithToken } from "../../helpers/fetch";

/**
 * Servicio que obtiene el resumen de libros y revistas del dashboard.
 * Llama al endpoint /api/dashboard/summary
 * Lanza error si la petición falla
 * Normaliza la respuesta para valores numéricos
 */ 

export const getDashboardSummary = async () => {
  const response = await fetchWithToken("api/dashboard/summary");

  if (!response?.ok) {
    const message = response?.message || "No se pudo obtener el resumen del dashboard";
    throw new Error(message);
  }

  return {
    books: response?.data?.books ?? 0,
    magazines: response?.data?.magazines ?? 0,
  };
};
