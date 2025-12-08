/**
 * Helper para obtener la URL correcta de imágenes estáticas
 * Maneja automáticamente el base path en desarrollo y producción
 */
export function getImagePath(path) {
  // import.meta.env.BASE_URL es "/" en desarrollo y "/editorial2026/" en producción
  const basePath = import.meta.env.BASE_URL;

  // Si el path ya empieza con /, lo quitamos para evitar doble slash
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${basePath}${cleanPath}`;
}
