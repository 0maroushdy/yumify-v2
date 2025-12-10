import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/foods/`;


const foodAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in requests
});

// Add request interceptor to include Bearer token as fallback if cookies don't work
foodAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default foodAPI;