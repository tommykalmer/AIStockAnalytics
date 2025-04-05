// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:8000"; // Byt vid behov till din server-URL

export async function login(email, password) {
  try {
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    const response = await axios.post(`${API_URL}/login`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const token = response.data.access_token;
    localStorage.setItem("token", token);

    return { success: true };
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return {
      success: false,
      message:
        error.response?.data?.detail ||
        "Login failed. Please check your credentials.",
    };
  }
}
