// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:8000"; // Justera vid behov

export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username: email,
      password: password,
    });
    const token = response.data.access_token;
    localStorage.setItem("token", token);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.detail || "Inloggning misslyckades",
    };
  }
}
