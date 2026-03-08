import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Updated to match local PHP server port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
