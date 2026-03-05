from fastapi import APIRouter, Depends, HTTPException, Header, Cookie, Response
from controllers.auth_controller import UserCreate, UserLogin
from typing import Optional


auth_routes = APIRouter()

from sqlalchemy.orm import Session
from models.auth_model import User
from config.database import get_db
from utils.utils import hash_password, verify_password, verify_token


@auth_routes.get('/me')
def get_user_data(access_token: Optional[str] = Cookie(None)):
    try:
        print("DEBUG /auth/me: Received cookie:", access_token)
        if not access_token:
            raise HTTPException(
                status_code=401,
                detail="Not authenticated"
            )
        
        # Verify the token
        payload = verify_token(access_token)
        
        if payload is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid or expired token"
            )
        
        # Return user data from token payload
        return {
            "data": {
                "id": payload.get("id"),
                "email": payload.get("sub"),
                "name": payload.get("name")
            },
            "message": "User data retrieved successfully",
            "status": "success"
        }
    
    except HTTPException:
        raise
    except Exception as e:
        return {
            "data": None,
            "message": str(e),
            "status": "error"
        }


@auth_routes.post('/register')
def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            return {
                "data": None,
                "message": "Email already registered",
                "status": "error"
            }

        # Merge first and last name
        full_name = f"{user.firstName} {user.lastName}"

        # Hash password
        hashed_pwd = hash_password(user.password)

        # Create new user instance
        new_user = User(
            name=full_name,
            email=user.email,
            password=hashed_pwd
        )

        # Add to DB
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print("DEBUG register: New user created", new_user.email)
        return {
            "data": {
                "id": new_user.id,
                "name": new_user.name,
                "email": new_user.email
            },
            "message": "Register Successfully",
            "status": "success"
        }
    except Exception as e:
        print("error register",str(e))
        return {
            "data": None,
            "message": str(e),
            "status": "error"
        }

@auth_routes.post('/login')
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    try:
        # Check if user exists
        db_user = db.query(User).filter(User.email == user.email).first()
        if not db_user:
            return {
                "data": None,
                "message": "User Not Found",
                "status": "error"
            }

        # Verify password
        is_valid_password = verify_password(user.password, db_user.password)
        
        if not is_valid_password:
            return {
                "data": None,
                "message": "Invalid Password",
                "status": "error"
            }

        # Successful login - create access token
        from utils.utils import create_access_token
        access_token = create_access_token(
            data={"sub": db_user.email, "id": db_user.id, "name": db_user.name}
        )

        # Set token in HTTP-only cookie
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,  # Set to True in production with HTTPS
            samesite="lax",
            path="/",  # Make cookie available for all paths
            domain="localhost",  # Share cookie across ports (3000 & 8000)
            max_age=7 * 24 * 60 * 60  # 7 days
        )
        print("DEBUG login: Cookie set with token:", access_token[:20] if access_token else None)
        return {
            "data": {
                "id": db_user.id,
                "name": db_user.name,
                "email": db_user.email
            },
            "message": "User Login Successfully",
            "status": "success"
        }

    except Exception as e:
        print("error login",str(e))
        return {
            "data": None,
            "message": str(e),
            "status": "error"
        }

@auth_routes.post('/supabase-sync')
def supabase_sync(payload: dict, response: Response, db: Session = Depends(get_db)):
    try:
        email = payload.get("email")
        name = payload.get("name")
        supabase_id = payload.get("supabase_id")

        if not email:
            return {
                "data": None,
                "message": "Email is required",
                "status": "error"
            }

        # Check if user exists
        db_user = db.query(User).filter(User.email == email).first()

        if not db_user:
            # Create new user for social login
            db_user = User(
                name=name or email.split('@')[0],
                email=email,
                password=None  # Social login users don't have a local password
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            print(f"DEBUG sync: Created new user {email}")
        else:
            print(f"DEBUG sync: Existing user found {email}")

        # Generate access token
        from utils.utils import create_access_token
        access_token = create_access_token(
            data={"sub": db_user.email, "id": db_user.id, "name": db_user.name}
        )

        # Set token in HTTP-only cookie (same config as /login)
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            path="/",
            domain="localhost",
            max_age=7 * 24 * 60 * 60
        )

        return {
            "data": {
                "id": db_user.id,
                "name": db_user.name,
                "email": db_user.email
            },
            "message": "User synced successfully",
            "status": "success"
        }

    except Exception as e:
        print("error supabase-sync", str(e))
        return {
            "data": None,
            "message": str(e),
            "status": "error"
        }

@auth_routes.post('/logout')
def logout(response: Response):
    """Logout user by clearing the access token cookie"""
    try:
        response.delete_cookie(
            key="access_token",
            httponly=True,
            secure=False,  # Set to True in production with HTTPS
            samesite="lax",
            path="/",
            domain="localhost"  # Must match the domain used when setting the cookie
        )
        
        return {
            "data": None,
            "message": "Logout Successfully",
            "status": "success"
        }
    
    except Exception as e:
        return {
            "data": None,
            "message": str(e),
            "status": "error"
        }