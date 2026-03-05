from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from config.database import Base

class CheckoutOrder(Base):
    """
    CheckoutOrder model to store order details.
    """
    __tablename__ = "checkout_orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Optional if guest checkout is allowed
    
    # Contact Section
    email = Column(String, nullable=False)
    email_newsletter = Column(Boolean, default=False)
    
    # Delivery Section
    country = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    apartment = Column(String, nullable=True)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    save_information = Column(Boolean, default=False)
    
    # Shipping Method
    shipping_method = Column(String, default="standard")
    
    # Payment Section
    payment_method = Column(String, nullable=False) # 'credit_card', 'paypal', 'klarna'
    
    # Credit Card Details (Stored as requested, but CAUTION in production)
    card_number = Column(String, nullable=True) # Usually only last 4 stored
    expiration_date = Column(String, nullable=True)
    cvv = Column(String, nullable=True) # NEVER STORE CVV in real apps
    name_on_card = Column(String, nullable=True)
    billing_same_as_shipping = Column(Boolean, default=True)
    
    # Remember Me Section
    shop_phone_number = Column(String, nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String, default="pending")
