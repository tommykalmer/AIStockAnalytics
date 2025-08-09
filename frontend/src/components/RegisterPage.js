import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

const RegisterPage = () => {
  const [form, setForm] = useState({ email: "", password: "", license: "gratis" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/create_user", form); // ✅ använder api-klienten
      setMessage("Registration successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const detail =
        error.response?.data?.detail ||
        (error.message?.includes("Network") ? "Network error: check API URL/CORS" : "Something went wrong");
      setMessage("Registration failed: " + detail);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={styles.input}
            required
          />
          <select
            value={form.license}
            onChange={(e) => setForm({ ...form, license: e.target.value })}
            style={styles.input}
          >
            <option value="gratis">Free</option>
            <option value="premium">Premium</option>
            <option value="guld">Gold</option>
          </select>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = { /* …dina styles oförändrade… */ };

export default RegisterPage;