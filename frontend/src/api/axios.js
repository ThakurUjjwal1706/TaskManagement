import axios from "axios";

// Use Vercel environment variable first,
// fallback to Render backend URL if env variable is missing.
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://taskmanagement-1sfa.onrender.com";

const API = axios.create({
  baseURL: `${BASE_URL.replace(/\/$/, "")}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Debugging: check which URL is actually being used
console.log("API Base URL:", API.defaults.baseURL);

// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("taskmanager_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized responses globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("taskmanager_token");
      localStorage.removeItem("taskmanager_user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;