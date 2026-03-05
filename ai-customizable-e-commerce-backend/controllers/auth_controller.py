from typing import Annotated
from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    firstName : str 
    lastName : str
    email: str
    password: str

class UserLogin(BaseModel):
    email : Annotated[str,Field(pattern=r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]
    password : Annotated[str,Field(min_length=6)]
    