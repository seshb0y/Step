from datetime import datetime, timedelta, timezone
from typing import Optional, Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from database import get_db
from models import User

JWT_ALG = "HS256"
ACCESS_SECRET = "CHANGE_ME_ACCESS_SECRET_very_long_random"
REFRESH_SECRET = "CHANGE_ME_REFRESH_SECRET_very_long_random"
ACCESS_TTL_MIN = 60
REFRESH_TTL_DAYS = 7

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def _make_token(data: dict, secret: str, ttl: timedelta) -> str:
    to_encode = data.copy()
    to_encode["exp"] = datetime.now(timezone.utc) + ttl
    return jwt.encode(to_encode, secret, algorithm=JWT_ALG)

def create_access_token(sub: str) -> str:
    return _make_token({"sub": sub, "typ": "access"}, ACCESS_SECRET, timedelta(minutes=ACCESS_TTL_MIN))

def create_refresh_token(sub: str) -> str:
    return _make_token({"sub": sub, "typ": "refresh"}, REFRESH_SECRET, timedelta(days=REFRESH_TTL_DAYS))

def decode_access(token: str) -> dict:
    return jwt.decode(token, ACCESS_SECRET, algorithms=[JWT_ALG])

def decode_refresh(token: str) -> dict:
    return jwt.decode(token, REFRESH_SECRET, algorithms=[JWT_ALG])

def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[Session, Depends(get_db)],
) -> User:
    cred_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Необходима авторизация",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_access(token)
        if payload.get("typ") != "access":
            raise cred_exc
        sub = payload.get("sub")
        if not sub:
            raise cred_exc
    except JWTError:
        raise cred_exc

    user = db.query(User).filter(User.username == sub).first()
    if not user:
        raise cred_exc
    return user
