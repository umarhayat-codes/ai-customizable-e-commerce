from sqlalchemy import Column, Integer, String
from config.database import Base
from sqlalchemy.orm import relationship  
class User(Base):
    """
    User model for authentication and user management.
    Attributes:
        id (int): Primary key.
        name (str): Full name of the user.
        email (str): Unique email address.
        password (str): Hashed password.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)  

    reviews = relationship("Review", back_populates="user")


