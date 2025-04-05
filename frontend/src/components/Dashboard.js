import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src="/logo512.png" alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Welcome to Your Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </header>

      <main style={styles.main}>
        <h2>Features Coming Soon</h2>
        <p>You will soon be able to analyze your portfolio, get reports, and explore toplists right here!</p>
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
