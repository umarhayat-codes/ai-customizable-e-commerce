from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from models.customize_product_model import CustomizedProduct
from controllers.customize_product_controller import CustomizedProductCreate

customize_product_routes = APIRouter()

@customize_product_routes.post("/customize-product")
def customize_product(item: CustomizedProductCreate, db: Session = Depends(get_db)):
    """
    API endpoint to save customized product details.
    """
    try:
        # Check if customization already exists for this user and product
        existing_customization = db.query(CustomizedProduct).filter(
            CustomizedProduct.user_id == item.user_id,
            CustomizedProduct.product_id == item.product_id
        ).first()

        if existing_customization:
            # Update existing customization
            existing_customization.image = item.image
            existing_customization.design_logo = item.design_logo
            existing_customization.placement_data = item.placement_data
            existing_customization.title = item.title
            existing_customization.price = item.price
            existing_customization.color = item.color
            existing_customization.size = item.size
            existing_customization.quantity = item.quantity
            db.commit()
            db.refresh(existing_customization)
            
            return {
                "status": True,
                "message": "Customization details updated successfully",
                "data": {
                    "id": existing_customization.id,
                    "title": existing_customization.title
                }
            }
        else:
            # Create new customization
            new_customization = CustomizedProduct(
                user_id=item.user_id,
                product_id=item.product_id,
                image=item.image,
                design_logo=item.design_logo,
                placement_data=item.placement_data,
                title=item.title,
                price=item.price,
                color=item.color,
                size=item.size,
                quantity=item.quantity
            )
            db.add(new_customization)
            db.commit()
            db.refresh(new_customization)
            
            return {
                "status": True,
                "message": "Customization details saved successfully",
                "data": {
                    "id": new_customization.id,
                    "title": new_customization.title
                }
            }
    except Exception as e:
        return {
            "status": False,
            "message": f"Error saving customization details: {str(e)}",
            "data": None
        }

@customize_product_routes.get("/get-customization")
def get_customization(user_id: int, product_id: str, db: Session = Depends(get_db)):
    """
    API endpoint to fetch customization details for a specific user and product.
    """
    try:
        customization = db.query(CustomizedProduct).filter(
            CustomizedProduct.user_id == user_id,
            CustomizedProduct.product_id == product_id
        ).first()

        if not customization:
            return {
                "status": False,
                "message": "Customization not found",
                "data": None
            }

        return {
            "status": True,
            "message": "Customization details fetched successfully",
            "data": customization
        }
    except Exception as e:
        return {
            "status": False,
            "message": f"Error fetching customization: {str(e)}",
            "data": None
        }
