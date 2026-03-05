from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes import auth_route, review_route, customize_route, product_route, customize_product_route, checkout_route


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],  # Must be specific origins when using credentials
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_route.auth_routes, prefix='/auth')
app.include_router(review_route.review_routes, prefix='/reviews')
app.include_router(customize_route.customize_routes, prefix='/customize')
app.include_router(product_route.product_routes, prefix='/product')
app.include_router(customize_product_route.customize_product_routes, prefix='/customize-product')
app.include_router(checkout_route.checkout_routes, prefix='/checkout')
