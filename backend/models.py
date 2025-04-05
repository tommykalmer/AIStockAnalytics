from sqlalchemy import Column, Integer, String, DateTime, Boolean
from backend.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    license = Column(String, default="gratis")  # "gratis", "premium", "guld"
    is_admin = Column(Boolean, default=False)
    is_temp_free = Column(Boolean, default=False)
    registered_at = Column(DateTime, default=datetime.utcnow)
