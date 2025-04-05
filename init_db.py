print("🔍 Detta är rätt init_db.py!")


from backend.database import Base, engine, SessionLocal
from backend.models import User
from backend.auth import get_password_hash
from sqlalchemy.exc import IntegrityError

# Skapa alla tabeller
Base.metadata.create_all(bind=engine)

def is_database_empty():
    db = SessionLocal()
    try:
        return db.query(User).count() == 0
    finally:
        db.close()

def create_initial_admin():
    db = SessionLocal()
    try:
        admin_user = User(
            username="admin@aistockanalytics.com",
            hashed_password=get_password_hash("admin123"),
            license="guld",
            is_admin=True,
            is_temp_free=True,
        )
        db.add(admin_user)
        db.commit()
        print("✅ Admin user created: admin@aistockanalytics.com / admin123")
    except IntegrityError:
        db.rollback()
        print("⚠️ Admin user creation failed – user might already exist.")
    finally:
        db.close()

# Kontrollera om databasen är tom innan admin skapas
if is_database_empty():
    create_initial_admin()
else:
    print("ℹ️ Database already contains users. No admin created.")
