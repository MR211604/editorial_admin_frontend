export const getImageURL = (path) => {
  if (!path) return "";
  return `${import.meta.env.VITE_EDITORIAL_LOCAL_API_URL}/${path}`;
};
