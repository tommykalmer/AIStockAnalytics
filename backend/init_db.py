from backend.database import Base, engine
from backend import models

print("Skapar databasen och tabellerna...")
Base.metadata.create_all(bind=engine)
print("✅ Databas klar! Tabellen 'users' är skapad.")
