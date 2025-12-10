import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/cart/`;


const cartAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
   withCredentials: true, // Include cookies for authentication
});

// Add request interceptor to include Bearer token as fallback if cookies don't work
cartAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default cartAPI;