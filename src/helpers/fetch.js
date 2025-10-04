const baseURL = import.meta.env.VITE_EDITORIAL_LOCAL_API_URL;

export const fetchWithoutToken = async (endpoint, data, method) => {
  if (method === "GET") {
    const response = await fetch(`${baseURL}/${endpoint}`);
    return await response.json();
  } else {
    const response = await fetch(`${baseURL}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
};

export const fetchWithToken = async (endpoint, data, method = "GET") => {
  const token = localStorage.getItem("token") || "";
  if (method === "GET") {
    const response = await fetch(`${baseURL}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    return await response.json();
  } else {
    const isFormData = data instanceof FormData;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(`${baseURL}/${endpoint}`, {
      method: method,
      headers: headers,
      body: isFormData ? data : JSON.stringify(data),
    });

    return await response.json();
  }
};
