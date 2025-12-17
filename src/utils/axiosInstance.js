import axios from "axios";
import { config } from "../../config.js";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to check if token is expired
function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true; // if token is invalid or can’t be decoded
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Check token expiry before sending the request
      if (isTokenExpired(token)) {
        console.warn("Token expired. Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("currentUserData");
        localStorage.removeItem("branchData");
        window.location.href = "/login";
        return Promise.reject(new Error("Token expired"));
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUserData");
      localStorage.removeItem("branchData");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
