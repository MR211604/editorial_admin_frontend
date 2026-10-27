const MAX_COVER_SIZE_BYTES = 5_000_000;
const ALLOWED_COVER_TYPES = ["image/jpeg", "image/png"];

const getCoverFile = (files) => {
  const file = files?.[0];
  return file && typeof file === "object" && typeof file.size === "number"
    ? file
    : null;
};

export const validateCoverFileSize = (files) => {
  const file = getCoverFile(files);
  if (!file) return true;

  return (
    file.size <= MAX_COVER_SIZE_BYTES ||
    "La imagen de portada no debe superar 5 MB"
  );
};

export const validateCoverFileType = (files) => {
  const file = getCoverFile(files);
  if (!file) return true;

  return (
    ALLOWED_COVER_TYPES.includes(file.type) ||
    "Solo se permiten imágenes JPG o PNG"
  );
};
