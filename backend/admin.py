from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, database
from backend.auth import get_current_user
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["admin"])

# Pydantic schema
class UserUpdate(BaseModel):
    license: str = None
    is_admin: bool = None
    is_temp_free: bool = None
    reset_password: bool = None  # Flagga för att återställa lösenordet

# Adminskydd
def admin_required(current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Access denied")
    return current_user

# Hämta alla användare
@router.get("/users")
def get_all_users(db: Session = Depends(database.get_db), current_user: models.User = Depends(admin_required)):
    return db.query(models.User).all()

# Uppdatera användare
@router.put("/users/{user_id}")
def update_user(user_id: int, updates: UserUpdate, db: Session = Depends(database.get_db), current_user: models.User = Depends(admin_required)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if updates.license is not None:
        user.license = updates.license
    if updates.is_admin is not None:
        user.is_admin = updates.is_admin
    if updates.is_temp_free is not None:
        user.is_temp_free = updates.is_temp_free
    if updates.reset_password:
        user.password = "reset_required"  # Placeholder – du kan göra ett mer avancerat flöde sen

    db.commit()
    db.refresh(user)
    return user
