from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import RegisterIn, LoginIn, UserOut, TokenPair, RefreshIn
from auth import hash_password, verify_password, create_access_token, create_refresh_token, get_current_user, decode_refresh

router = APIRouter(prefix="", tags=["auth"])

@router.post("/register", response_model=UserOut, status_code=201)
def register(payload: RegisterIn, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == payload.username).first():
        raise HTTPException(status_code=400, detail="username уже занят")
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="email уже используется")

    user = User(
        username=payload.username,
        email=payload.email,
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login", response_model=TokenPair)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == payload.username).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверные учётные данные")

    return TokenPair(
        access_token=create_access_token(user.username),
        refresh_token=create_refresh_token(user.username),
    )

@router.post("/refresh", response_model=TokenPair)
def refresh_token(body: RefreshIn, db: Session = Depends(get_db)):
    try:
        payload = decode_refresh(body.refresh_token)
        if payload.get("typ") != "refresh":
            raise HTTPException(status_code=401, detail="Не валидный refresh токен")
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Не валидный refresh токен")
    except Exception:
        raise HTTPException(status_code=401, detail="Не валидный/просроченный refresh токен")

    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="Пользователь не найден")

    return TokenPair(
        access_token=create_access_token(username),
        refresh_token=create_refresh_token(username),
    )

@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user
