/**
 * Genera una URL amigable a partir de un título dado.
 * Convierte el título a minúsculas, reemplaza espacios por guiones bajos,
 * y elimina caracteres especiales, manteniendo letras (incluyendo acentuadas) y guiones bajos.
 *
 * @param {string} title - El título a convertir en URL.
 * @returns {string} La URL generada.
 */

export const generateUrlFromTitle = (title) => {
  if (!title) return "";

  // Convertir a minúsculas
  let url = title.toLowerCase();

  // Normalizar caracteres Unicode y eliminar diacríticos (tildes)
  url = url.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Reemplazar espacios por guiones bajos
  url = url.replace(/\s+/g, "_");

  // Eliminar caracteres especiales y mantener solo letras (incluyendo acentuadas) y guiones bajos
  url = url.replace(/[^a-záéíóúñü0-9_]/g, "");

  // Reducir múltiples guiones bajos consecutivos a uno solo
  url = url.replace(/_+/g, "_");

  // Eliminar guiones bajos al inicio y al final
  url = url.replace(/^_+|_+$/g, "");

  return url;
};
