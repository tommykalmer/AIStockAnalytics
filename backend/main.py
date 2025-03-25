# Importera FastAPI - ett modernt, snabbt webbramverk för API-utveckling
from fastapi import FastAPI, HTTPException

# Skapa ett FastAPI-objekt som vår app kommer använda
app = FastAPI()

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
from datetime import date

# Här skulle du senare koppla mot betalning
@app.post("/buy_toplist")
def buy_toplist():
    today = str(date.today())
    
    # Kolla om användaren redan köpt dagens lista
    if today in mock_user.get("purchased_reports", []):
        return {"status": "already_purchased", "message": "Du har redan köpt dagens topplista"}

    # Spara köpet (i verkligheten - skriv till databas)
    mock_user.setdefault("purchased_reports", []).append(today)
    
    return {"status": "success", "message": f"Topplistan för {today} är köpt och tillgänglig"}
