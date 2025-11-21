export const generateUrlFromTitle = (title) => {
  if (!title) return "";

  // Convertir a minúsculas
  let url = title.toLowerCase();

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
