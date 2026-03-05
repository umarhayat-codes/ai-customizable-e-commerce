from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from config.database import get_db
from controllers.checkout_controller import CheckoutRequest, StandardResponse
from models.checkout_model import CheckoutOrder
import logging

logger = logging.getLogger(__name__)

checkout_routes = APIRouter()

@checkout_routes.post("", response_model=StandardResponse)
async def process_checkout(request: CheckoutRequest, db: Session = Depends(get_db)):
    try:
        # Create new order record
        new_order = CheckoutOrder(
            user_id=request.userId,
            email=request.contact.email,
            email_newsletter=request.contact.emailNewsletter,
            country=request.delivery.country,
            first_name=request.delivery.firstName,
            last_name=request.delivery.lastName,
            address=request.delivery.address,
            apartment=request.delivery.apartment,
            city=request.delivery.city,
            state=request.delivery.state,
            postal_code=request.delivery.postalCode,
            phone=request.delivery.phone,
            save_information=request.delivery.saveInformation,
            shipping_method=request.shippingMethod,
            payment_method=request.paymentMethod,
            billing_same_as_shipping=request.billingAddressSameAsShipping,
            shop_phone_number=request.shopPhoneNumber
        )
        
        # If credit card, add card details
        if request.paymentMethod == "credit_card" and request.cardDetails:
            new_order.card_number = request.cardDetails.cardNumber
            new_order.expiration_date = request.cardDetails.expirationDate
            new_order.cvv = request.cardDetails.cvv
            new_order.name_on_card = request.cardDetails.nameOnCard
            
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
        
        return StandardResponse(
            status="success",
            message="Order placed successfully",
            data={"order_id": new_order.id}
        )
        
    except Exception as e:
        db.rollback()
        logger.error(f"Error during checkout: {str(e)}")
        return StandardResponse(
            status="error",
            message=f"Something went wrong: {str(e)}",
            data=None
        )
