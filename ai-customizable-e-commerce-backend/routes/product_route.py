from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from config.database import get_db
from models.product_model import CartItem
from controllers.product_controller import CartItemCreate, CartItemUpdate

product_routes = APIRouter()

@product_routes.post("/add-to-cart")
def add_to_cart(item: CartItemCreate, db: Session = Depends(get_db)):
    """
    API endpoint to add a product to the cart.
    """
    try:
        new_item = CartItem(
            user_id=item.user_id,
            product_id=item.product_id,
            image=item.image,
            title=item.title,
            description=item.description,
            price=item.price,
            color=item.color,
            size=item.size,
            is_customized=1 if item.is_customized else 0,
            design_logo=item.design_logo,
            quantity=item.quantity
        )
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        
        return {
            "status": True,
            "message": "Product added to cart successfully",
            "data": {
                "id": new_item.id,
                "title": new_item.title
            }
        }
    except Exception as e:
        return {
            "status": False,
            "message": f"Error adding to cart: {str(e)}",
            "data": None
        }

@product_routes.get("/get-cart/{user_id}")
def get_cart_items(user_id: int, db: Session = Depends(get_db)):
    """
    API endpoint to fetch all cart items for a specific user.
    """
    try:
        cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()
        return {
            "status": True,
            "message": "Cart items fetched successfully",
            "data": cart_items
        }
    except Exception as e:
        return {
            "status": False,
            "message": f"Error fetching cart items: {str(e)}",
            "data": []
        }

@product_routes.put("/update-cart-item/{item_id}")
def update_cart_item(item_id: int, item: CartItemUpdate, db: Session = Depends(get_db)):
    """
    API endpoint to update an existing cart item (for edit design flow).
    Only updates fields that are provided (non-None).
    """
    try:
        cart_item = db.query(CartItem).filter(
            CartItem.id == item_id,
            CartItem.user_id == item.user_id
        ).first()

        if not cart_item:
            return {
                "status": False,
                "message": "Cart item not found",
                "data": None
            }

        # Update only non-None fields
        update_data = item.model_dump(exclude_unset=True, exclude_none=True)
        # Remove user_id from update data (it's used for lookup, not update)
        update_data.pop("user_id", None)

        # Handle is_customized conversion
        if "is_customized" in update_data:
            update_data["is_customized"] = 1 if update_data["is_customized"] else 0

        for field, value in update_data.items():
            setattr(cart_item, field, value)

        db.commit()
        db.refresh(cart_item)

        return {
            "status": True,
            "message": "Cart item updated successfully",
            "data": {
                "id": cart_item.id,
                "title": cart_item.title
            }
        }
    except Exception as e:
        return {
            "status": False,
            "message": f"Error updating cart item: {str(e)}",
            "data": None
        }

@product_routes.delete("/delete-cart-item")
def delete_cart_item(user_id: int, item_id: int, db: Session = Depends(get_db)):
    """
    API endpoint to delete a product from the cart.
    """
    try:
        cart_item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == user_id).first()
        
        if not cart_item:
            return {
                "status": False,
                "message": "Product not found in cart",
                "data": None
            }
            
        db.delete(cart_item)
        db.commit()
        
        return {
            "status": True,
            "message": "Product removed from cart successfully",
            "data": None
        }
    except Exception as e:
        return {
            "status": False,
            "message": f"Error deleting product: {str(e)}",
            "data": None
        }
