from sqlalchemy import Column, Integer, String, ForeignKey
from config.database import Base

class CustomizedProduct(Base):
    """
    Model to store products being customized by users.
    """
    __tablename__ = "customized_products"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(String)
    image = Column(String)
    design_logo = Column(String, nullable=True)
    placement_data = Column(String, nullable=True)
    title = Column(String)
    price = Column(String)
    color = Column(String)
    size = Column(String)
    quantity = Column(Integer, default=1)
