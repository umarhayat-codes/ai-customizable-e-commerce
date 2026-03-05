from pydantic import BaseModel, EmailStr
from typing import Optional, List

class ContactSchema(BaseModel):
    email: str
    emailNewsletter: bool

class DeliverySchema(BaseModel):
    country: str
    firstName: str
    lastName: str
    address: str
    apartment: Optional[str] = None
    city: str
    state: str
    postalCode: str
    phone: str
    saveInformation: bool

class CardDetailsSchema(BaseModel):
    cardNumber: Optional[str] = None
    expirationDate: Optional[str] = None
    cvv: Optional[str] = None
    nameOnCard: Optional[str] = None

class CheckoutRequest(BaseModel):
    userId: Optional[int] = None
    contact: ContactSchema
    delivery: DeliverySchema
    paymentMethod: str
    cardDetails: Optional[CardDetailsSchema] = None
    billingAddressSameAsShipping: bool
    shopPhoneNumber: Optional[str] = None
    shippingMethod: str = "standard"

class StandardResponse(BaseModel):
    status: str
    message: str
    data: Optional[dict] = None
