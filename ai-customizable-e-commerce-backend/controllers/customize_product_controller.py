from pydantic import BaseModel
from typing import Optional

class CustomizedProductCreate(BaseModel):
    user_id: int
    product_id: str
    image: str
    title: str
    price: str
    color: str
    size: str
    design_logo: Optional[str] = None
    placement_data: Optional[str] = None
    quantity: int = 1
