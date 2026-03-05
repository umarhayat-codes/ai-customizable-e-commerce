from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from controllers import review_controller
from models.review_model import Review
from typing import List

review_routes = APIRouter()

@review_routes.post("/")
def create_review(review_data: review_controller.ReviewCreate, db: Session = Depends(get_db)):
    try:
        db_review = Review(
            user_id=review_data.user_id,
            rating=review_data.rating,
            review=review_data.review
        )
        db.add(db_review)
        db.commit()
        db.refresh(db_review)
        
        return {
            "data": {
                "id": db_review.id,
                "user_id": db_review.user_id,
                "rating": db_review.rating,
                "review": db_review.review
            },
            "message": "Review added successfully",
            "status": "success"
        }
    except Exception as e:
        return {
            "data": None,
            "message": str(e),
            "status": "error"
        }

@review_routes.get("/")
def get_reviews(db: Session = Depends(get_db)):
    try:
        reviews = db.query(Review).all()
        reviews_array = []

        for r in reviews:
            reviews_array.append({
                "id": r.id,
                "user_id": r.user_id,
                "rating": r.rating,
                "review": r.review
            })
        return {
            "data": reviews_array,
            "message": "Reviews fetched successfully",
            "status": "success"
        }
    except Exception as e:
        return {
            "data": None,
            "message": str(e),
            "status": "error"
        }
