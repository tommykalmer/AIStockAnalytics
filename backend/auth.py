from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, Depends, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend import models
from backend import database

router = APIRouter()

# === JWT-konfiguration ===
SECRET_KEY = "your-secret-key"  # byt till säkrare nyckel i produktion
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# === Lösenordshantering ===
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


# === Hjälpfunktioner ===
def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user_by_username(db, username)
    if user is None:
        raise credentials_exception
    return user


# === Modell för registrering ===
class UserCreate(BaseModel):
    email: str
    password: str
    license: str = "gratis"

# === Skapa ny användare ===
from sqlalchemy.exc import IntegrityError

# === Create new user ===
@router.post("/create_user")
def create_user(user: UserCreate, db: Session = Depends(database.get_db)):
    print("👉 CREATE_USER CALLED")
    print("✉️ Email:", user.email)
    print("🔒 Password:", user.password)
    print("🔑 License:", user.license)
    try:
        existing_user = db.query(models.User).filter(models.User.username == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email is already registered")

        new_user = models.User(
            username=user.email,
            hashed_password=get_password_hash(user.password),
            license=user.license,
            registered_at=datetime.utcnow()
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print("✅ User created")
        return {"message": "User successfully registered"}
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email is already registered")
    except Exception as e:
        db.rollback()
        print("❌ ERROR:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


# === Login ===
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# === Skyddad route (exempel) ===
@router.get("/protected")
def protected_route(current_user: models.User = Depends(get_current_user)):
    return {"message": f"Welcome, {current_user.username}! This is a protected route."}
