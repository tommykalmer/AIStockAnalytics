import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [form, setForm] = useState({ email: "", password: "", license: "gratis" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/create_user", form);
      setMessage("Registrering lyckades!");
    } catch (error) {
      setMessage("Registrering misslyckades: " + (error.response?.data?.detail || "Något gick fel"));
    }
  };

  return (
    <div>
      <h2>Registrera dig</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-post"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br />
        <input
          type="password"
          placeholder="Lösenord"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br />
        <select
          value={form.license}
          onChange={(e) => setForm({ ...form, license: e.target.value })}
        >
          <option value="gratis">Gratis</option>
          <option value="premium">Premium</option>
          <option value="guld">Guld</option>
        </select><br />
        <button type="submit">Registrera</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;
