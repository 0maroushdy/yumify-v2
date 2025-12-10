import axios from "axios";

const BASE_URL = "http://localhost:5000/api/foods/";


const foodAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in requests
});

export default foodAPI;