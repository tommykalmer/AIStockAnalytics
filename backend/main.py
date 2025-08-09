# main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date
from pydantic import BaseModel

from backend.database import SessionLocal
from backend import models
from backend.auth import router as auth_router
from backend.auth import get_password_hash

# === Initiera FastAPI ===
app = FastAPI()

# === Lägg till CORS om frontend ska kommunicera ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",                  # För utveckling lokalt
        "https://<din-netlify-site>.netlify.app"  # Byt till din riktiga Netlify-URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Lägg till auth-routern ===
app.include_router(auth_router)

# -------------------------------------------
# ROT-endpoint - Testa att API:t fungerar
# -------------------------------------------
@app.get("/")
def read_root():
    return {"message": "AIStockAnalytics backend is running"}

# -------------------------------------------
# Simulerad endpoint - Generera analysrapport
# -------------------------------------------
@app.get("/generate_report")
def generate_report():
    return {
        "status": "success",
        "message": "Din analysrapport är genererad (simulerad)",
        "report_url": "/data/sample_report.xlsx"
    }

# -------------------------------------------
# Simulerad endpoint - Hämta användarens portfölj
# -------------------------------------------
@app.get("/get_portfolio")
def get_portfolio():
    fake_portfolio = [
        {"ticker": "AAPL", "amount": 10},
        {"ticker": "RHM.DE", "amount": 5},
        {"ticker": "VOLV-B.ST", "amount": 20}
    ]
    return {"portfolio": fake_portfolio}

# -------------------------------------------
# Simulerad användare med licens
# -------------------------------------------
mock_user = {
    "user_id": 1,
    "email": "kund@exempel.com",
    "license": "premium",  # "gratis", "premium" eller "guld"
    "portfolio_count": 18
}

# -------------------------------------------
# Kontroll av licens och portföljstorlek
# -------------------------------------------
@app.get("/check_license")
def check_license():
    if mock_user["license"] == "gratis" and mock_user["portfolio_count"] > 10:
        raise HTTPException(status_code=403, detail="Max 10 aktier i gratisversionen")
    return {"status": "ok", "message": f"Licensnivå: {mock_user['license']}"}

# -------------------------------------------
# Mock endpoint för att köpa dagens topplista
# -------------------------------------------
@app.post("/buy_toplist")
def buy_toplist():
    today = str(date.today())

    if today in mock_user.get("purchased_reports", []):
        return {"status": "already_purchased", "message": "Du har redan köpt dagens topplista"}

    mock_user.setdefault("purchased_reports", []).append(today)
    return {"status": "success", "message": f"Topplistan för {today} är köpt och tillgänglig"}

# === Databasfunktion ===
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



from backend import admin
app.include_router(admin.router)

