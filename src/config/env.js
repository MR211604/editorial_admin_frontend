const apiUrl = import.meta.env.VITE_EDITORIAL_LOCAL_API_URL || "/api";

export const env = {
  API_URL: apiUrl,
  BASE_URL: import.meta.env.BASE_URL || "/",
  LOCATION_IMAGES_URL:
    import.meta.env.VITE_EDITORIAL_LOCATION_IMAGES_URL ||
    `${apiUrl.replace(/\/+$/, "")}/imageslocations`,
  CONTENT_IMAGES_URL:
    import.meta.env.VITE_EDITORIAL_CONTENT_IMAGES_URL ||
    `${apiUrl.replace(/\/+$/, "")}/imagescontent`,
  RESOURCE_URL:
    import.meta.env.VITE_EDITORIAL_LOCAL_RESOURCE_URL || "/editorial_files",
};
