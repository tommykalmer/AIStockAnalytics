from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Skapa databasfilen SQLite lokalt
DATABASE_URL = "sqlite:///./aistockanalytics.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Skapa en session som används av alla db-anrop
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Bas för alla modeller
Base = declarative_base()

