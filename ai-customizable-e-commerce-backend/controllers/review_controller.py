from pydantic import BaseModel
from typing import List, Optional

# Pydantic Schemas
class ReviewBase(BaseModel):
    user_id: int
    rating: int
    review: str

class ReviewCreate(ReviewBase):
    pass

class ReviewResponse(ReviewBase):
    id: int
    
    class Config:
        from_attributes = True
