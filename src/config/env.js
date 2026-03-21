export const env = {
  API_URL: import.meta.env.VITE_EDITORIAL_LOCAL_API_URL || "/api",
  BASE_URL: import.meta.env.BASE_URL || "/",
  RESOURCE_URL:
    import.meta.env.VITE_EDITORIAL_LOCAL_RESOURCE_URL || "/editorial_files",
};
