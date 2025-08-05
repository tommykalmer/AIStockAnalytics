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
            <li>📈 Daily AI-powered hybrid scores for 1,400+ stocks across multiple markets</li>
            <li>🧠 Machine learning–optimized signals tailored to your chosen sector</li>
            <li>🔬 Separate technical and fundamental scoring (optional)</li>
            <li>📊 Exportable Excel reports with full data and sector breakdowns</li>
            <li>📥 One-click access to detailed analysis — no setup, no noise</li>
          </ul>
        </section>


        <section style={styles.section}>
          <h2>Licenses & Pricing</h2>
        
          <div style={styles.licenseBox}>
            <div>
              <h3>Basic – 9 €/month</h3>
              <p>
                ✔ Hybrid-score for the entire market<br />
                ✔ Not sector-optimized<br />
                ✔ Monthly billing, prepaid
              </p>
            </div>
            <div>
              <h3>SektorPro – 29 €/month</h3>
              <p>
                ✔ Hybrid-score for one chosen sector<br />
                ✔ ML-optimized signals per sector<br />
                ✔ Monthly billing, prepaid
              </p>
            </div>
            <div>
              <h3>Pro+ – 69 €/month</h3>
              <p>
                ✔ All sectors included<br />
                ✔ ML-optimization per sector<br />
                ✔ All available signals and features<br />
                ✔ Monthly billing, prepaid
              </p>
            </div>
          </div>
        
          <h2 style={{ marginTop: "60px" }}>Add-ons</h2>
          <ul style={styles.featuresList}>
            <li>➕ <strong>Technical score (separate):</strong> +5 €/month</li>
            <li>➕ <strong>Fundamental score (separate):</strong> +5 €/month</li>
            <li>➕ <strong>Fundamental key figures (metadata):</strong> +9 €/month</li>
            <li>➕ <strong>Extra sector (SektorPro):</strong> +7 €/month per extra sector</li>
            <li>➕ <strong>Slack/webhook integration:</strong> +5 €/month per account</li>
          </ul>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
            All add-ons billed prorated at purchase, synced with your license cycle.
          </p>
        
          <h2 style={{ marginTop: "60px" }}>One-time Reports</h2>
          <ul style={styles.featuresList}>
            <li>📁 <strong>Single sector, one day:</strong> 9 €</li>
            <li>📁 <strong>All sectors, one day:</strong> 19 €</li>
            <li>📁 <strong>All sectors + metadata:</strong> 25 €</li>
          </ul>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
            Instant delivery after payment. No subscription required.<br />
            Ideal for sampling the system before subscribing.
          </p>
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
