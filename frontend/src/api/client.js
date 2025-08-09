// frontend/src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // proxas av Netlify till din Render-backend
});

export default api;