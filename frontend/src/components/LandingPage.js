import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <img src="/logo512.png" alt="AIStockAnalytics Logo" style={styles.logo} />
        <nav>
          <Link to="/login" style={styles.navLink}>Login</Link>
          <Link to="/register" style={styles.navButton}>Get Started</Link>
        </nav>
      </header>

      <main style={styles.main}>
        <h1 style={styles.heroTitle}>Smarter Investing Starts Here</h1>
        <p style={styles.heroText}>
          Welcome to <strong>AIStockAnalytics</strong> — your personal AI-powered assistant for portfolio analysis,
          market insights, and intelligent decision-making.
        </p>
        <Link to="/register" style={styles.ctaButton}>Create Your Free Account</Link>

        <section style={styles.section}>
          <h2>What You Can Do</h2>
          <ul style={styles.featuresList}>
            <li>📊 Analyze your stock portfolio with daily AI-driven insights</li>
            <li>📈 Get buy/sell recommendations based on real market data</li>
            <li>🔍 Track technical & fundamental indicators in real-time</li>
            <li>📥 Download full analysis reports in Excel</li>
            <li>📬 Receive smart alerts when your stocks move</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2>Licenses</h2>
          <div style={styles.licenseBox}>
            <div>
              <h3>Free</h3>
              <p>✔ Basic analysis tools<br />✔ 5 stocks per day<br />✔ Access to community updates</p>
            </div>
            <div>
              <h3>Premium</h3>
              <p>✔ Full portfolio analysis<br />✔ Priority support<br />✔ Toplist features<br />✔ Unlimited stocks</p>
            </div>
            <div>
              <h3>Gold</h3>
              <p>✔ All Premium features<br />✔ Advanced ML reports<br />✔ Personalized email alerts<br />✔ Early access to new tools</p>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>© 2025 AIStockAnalytics. Built with ❤️ for smart investors.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fdfdfd",
    margin: 0,
    padding: 0,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  logo: {
    height: "48px",
  },
  navLink: {
    marginRight: "20px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  navButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  main: {
    padding: "60px 20px",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  heroText: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#555",
  },
  ctaButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px 30px",
    fontSize: "16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  section: {
    marginTop: "80px",
    textAlign: "left",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  featuresList: {
    marginTop: "20px",
    lineHeight: "1.8",
    fontSize: "16px",
    color: "#333",
  },
  licenseBox: {
    display: "flex",
    justifyContent: "space-around",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  footer: {
    marginTop: "80px",
    padding: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#888",
    borderTop: "1px solid #eee",
  },
};

export default LandingPage;
