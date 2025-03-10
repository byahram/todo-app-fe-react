import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST
 */
api.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }

    console.log("[API Request] ", request.method?.toUpperCase(), request.url);
    return request;
  },
  (error) => {
    console.error(
      "[API Request Error] ",
      error.response?.status || "No Status",
      error.response?.config?.url || "No URL",
      error.response?.data || "No Data"
    );
    return Promise.reject(new Error(error));
  }
);

/**
 * RESPONSE
 */
api.interceptors.response.use(
  (response) => {
    console.log(
      "[API Response] ",
      response.status,
      response.config.url,
      response.data
    );
    return response;
  },
  (error) => {
    console.error(
      "[API Response Error] ",
      error.response?.status || "No Status",
      error.response?.config?.url || "No URL",
      error.response?.data || "No Data"
    );
    return error.response;
    // return Promise.reject(new Error(error));
  }
);

export default api;
