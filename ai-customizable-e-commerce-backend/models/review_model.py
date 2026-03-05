from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base

class Review(Base):
    """
    Review model to store product reviews.
    Attributes:
        id (int): Primary key.
        user_id (int): ID of the user who wrote the review.
        rating (int): Rating given by the user (1-5).
        review (str): The review text.
    """
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Integer)
    review = Column(String)

    user = relationship("User", back_populates="reviews")
