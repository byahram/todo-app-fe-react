import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    // authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});

/**
 * REQUEST
 */
api.interceptors.request.use(
  (request) => {
    console.log(
      "[API Request] ",
      request.method?.toUpperCase(),
      request.url,
      request
    );
    return request;
  },
  (error) => {
    console.error("[API Request Error] ", error);
    return Promise.reject(error);
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
      error.response?.status,
      error.response?.config?.url,
      error.response?.data
    );
    return Promise.reject(error);
  }
);

export default api;
