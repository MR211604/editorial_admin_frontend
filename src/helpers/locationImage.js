export const getLocationImageUrl = (image) => {
  if (!image) return "";
  if (/^(https?:)?\/\//i.test(image) || image.startsWith("data:")) return image;
  return "";
};
