import { env } from "../config/env";

export const getRelativeLocationImagePath = (image) => {
  if (!image || /^data:/i.test(image)) return image || "";

  let path = image;
  const isAbsoluteUrl = /^(https?:)?\/\//i.test(image);

  if (isAbsoluteUrl) {
    try {
      path = new URL(image.startsWith("//") ? `https:${image}` : image).pathname;
    } catch {
      return image;
    }
  }

  const cleanPath = path.replace(/^\/+/, "");
  const locationPathIndex = cleanPath.indexOf("imageslocations/");

  if (locationPathIndex >= 0) {
    return cleanPath.slice(locationPathIndex);
  }

  return isAbsoluteUrl ? image : cleanPath;
};

export const getLocationImageUrl = (image) => {
  if (!image) return "";

  const relativePath = getRelativeLocationImagePath(image);
  if (/^(https?:)?\/\//i.test(relativePath) || /^data:/i.test(relativePath)) {
    return relativePath;
  }

  const cleanPath = relativePath.replace(/^\/+/, "");
  if (cleanPath.startsWith("img/logos_ubicaciones/")) {
    return `${env.BASE_URL}${cleanPath}`;
  }

  const filename = cleanPath.startsWith("imageslocations/")
    ? cleanPath.slice("imageslocations/".length)
    : cleanPath;
  const imagesUrl = env.LOCATION_IMAGES_URL.replace(/\/+$/, "");
  return `${imagesUrl}/${filename}`;
};
