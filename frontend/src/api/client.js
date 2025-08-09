// frontend/src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // sätts i .env
});

export default api;