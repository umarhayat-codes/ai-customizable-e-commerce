from pydantic import BaseModel
from typing import Optional

class CartItemCreate(BaseModel):
    user_id: int
    product_id: str | None = None
    image: str
    title: str
    description: str
    price: str
    color: str
    size: str
    is_customized: bool = False
    design_logo: str | None = None
    quantity: int

class CartItemUpdate(BaseModel):
    user_id: int
    product_id: Optional[str] = None
    image: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[str] = None
    color: Optional[str] = None
    size: Optional[str] = None
    is_customized: Optional[bool] = None
    design_logo: Optional[str] = None
    quantity: Optional[int] = None
