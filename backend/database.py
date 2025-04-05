from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///C:/Users/tommy/OneDrive/Documents/GitHub/AIStockAnalytics/aistockanalytics.db"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

from sqlalchemy.orm import Session
from . import models

def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()

