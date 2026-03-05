from sqlalchemy import Column, Integer, String, ForeignKey
from config.database import Base

class CartItem(Base):
    """
    CartItem model to store items added to the cart.
    Attributes:
        id (int): Primary key.
        user_id (int): ID of the user who owns the cart.
        image (str): Image URL of the product.
        title (str): Title/Name of the product.
        description (str): Description of the product.
        price (str): Price of the product (e.g., "$ 25.00").
        color (str): Selected color of the product.
        size (str): Selected size of the product.
        quantity (int): Number of items.
    """
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    image = Column(String)
    title = Column(String)
    description = Column(String)
    price = Column(String)
    color = Column(String)
    size = Column(String)
    product_id = Column(String, nullable=True)
    is_customized = Column(Integer, default=0)  # Use 0 for false, 1 for true
    design_logo = Column(String, nullable=True)
    quantity = Column(Integer, default=1)
