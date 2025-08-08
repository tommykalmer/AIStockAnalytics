import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading your dashboard...</p>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src="/logo512.png" alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Welcome, {user.email}</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </header>

      <main style={styles.main}>
        <h2>Your License: {user.license}</h2>
        <p>Registered on: {new Date(user.registered_at).toLocaleDateString()}</p>

        <h3 style={{ marginTop: "40px" }}>Features Coming Soon</h3>
        <ul style={styles.featureList}>
          <li>📊 Daily analysis of your uploaded portfolio</li>
          <li>📁 Downloadable Excel reports</li>
          <li>🔔 Smart notifications</li>
          <li>🌟 Personalized toplist suggestions</li>
        </ul>
      </main>

      <footer style={styles.footer}>
        <p>© 2025 AIStockAnalytics – Your smart investment assistant</p>
      </footer>
    </div>
  );
};
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "10px 30px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  logo: {
    height: "40px",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    margin: 0,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  main: {
    textAlign: "center",
    marginTop: "60px",
  },
  featureList: {
    listStyleType: "none",
    padding: 0,
    fontSize: "18px",
    marginTop: "20px",
    color: "#444",
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    fontSize: "14px",
    color: "#888",
    padding: "20px",
  },
};
export default Dashboard;