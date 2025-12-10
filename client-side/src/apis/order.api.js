
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/orders/`;

const orderAPI = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, 
});

// Add request interceptor to include Bearer token as fallback if cookies don't work
orderAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default orderAPI;