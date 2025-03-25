# Importera FastAPI - ett modernt, snabbt webbramverk för API-utveckling
from fastapi import FastAPI

# Skapa ett FastAPI-objekt som vår app kommer använda
app = FastAPI()

# -------------------------------------------
# ROT-endpoint - Testa att API:t fungerar
# -------------------------------------------
# När du surfar till http://127.0.0.1:8000/
# returnerar denna funktion ett meddelande
@app.get("/")
def read_root():
    return {"message": "AIStockAnalytics backend is running"}

# -------------------------------------------
# Simulerad endpoint - Generera analysrapport
# -------------------------------------------
# Tänk att frontend en dag anropar:
# http://127.0.0.1:8000/generate_report
# Då körs denna funktion som låtsas skapa en analys
@app.get("/generate_report")
def generate_report():
    # Här kommer du senare lägga in din riktiga analyskod
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
    # Här kommer vi senare koppla till databas och hämta användarens portfölj
    fake_portfolio = [
        {"ticker": "AAPL", "amount": 10},
        {"ticker": "RHM.DE", "amount": 5},
        {"ticker": "VOLV-B.ST", "amount": 20}
    ]
    return {"portfolio": fake_portfolio}
