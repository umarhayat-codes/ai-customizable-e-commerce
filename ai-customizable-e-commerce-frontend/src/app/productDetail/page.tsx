"use client";

import React, { Suspense } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ReviewForm from "@/components/product/ReviewForm";
import {
  ProductImage,
  ColorOption,
  SizeOption,
  Review,
} from "@/types/Detail.types";
import { useProductDetailHook } from "@/hooks/useProductDetailHook";
import { useReviewHook } from "@/hooks/useReviewHook";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/AuthSlice";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const MOCK_COLORS: ColorOption[] = [
  { id: "gunmetal", name: "Gunmetal / Black Leather", value: "#3d3d3d" },
  {
    id: "two-tone",
    name: "Brown / White",
    value: "",
    isSplit: true,
    color1: "#8b4513",
    color2: "#ffffff",
  },
  { id: "light-gray", name: "Light Gray", value: "#d3d3d3" },
  { id: "dark-blue", name: "Dark Blue", value: "#00008b" },
  { id: "black", name: "Classic Black", value: "#000000" },
  { id: "charcoal", name: "Charcoal", value: "#36454f" },
  { id: "navy", name: "Navy", value: "#000080" },
];

const MOCK_SIZES: SizeOption[] = [
  { id: "XS", label: "XS" },
  { id: "S", label: "S" },
  { id: "M", label: "M" },
  { id: "L", label: "L" },
  { id: "XL", label: "XL" },
];

function ProductDetailContent() {
  const {
    productData,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    isDetailsOpen,
    toggleDetails,
    isReviewsOpen,
    toggleReviews,
    addToCart,
    handleStartCustomizing,
    cartLoading,
    customizeLoading,
    isEditMode,
  } = useProductDetailHook(4, MOCK_COLORS);

  const { reviews, addReview, loading } = useReviewHook();

  // Map backend reviews to frontend Review type expected by ProductInfo
  const formattedReviews: Review[] = reviews.map((r) => ({
    id: r.id.toString(),
    author: `User ${r.user_id}`, // In a real app, you'd fetch the user's name
    rating: r.rating,
    comment: r.review,
    avatar: `https://i.pravatar.cc/150?u=${r.user_id}`,
  }));

  const productImages: ProductImage[] = [
    {
      src: productData.image,
      alt: `${productData.title} - Front View`,
      transformClass: "[transform:perspective(1000px)_rotateY(0deg)]",
    },
    {
      src: productData.image,
      alt: `${productData.title} - Back View`,
      transformClass: "[transform:perspective(1000px)_scaleX(-1)]",
    },
    {
      src: productData.image,
      alt: `${productData.title} - Right Side View`,
      transformClass: "[transform:perspective(1000px)_rotateY(-35deg)]",
    },
    {
      src: productData.image,
      alt: `${productData.title} - Left Side View`,
      transformClass: "[transform:perspective(1000px)_rotateY(35deg)]",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-(--color-product-bg) pt-20 pb-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {/* Breadcrumb - simple for now to match image layout */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 px-4">
            <span>Products</span>
            <span>›</span>
            <span className="text-gray-900">{productData.title}</span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">
            {/* Left Side: Product Gallery & Review Form */}
            <section className="lg:col-span-7">
              <h2 className="sr-only">Product Media</h2>
              <ProductGallery images={productImages} />
              <div className="max-w-2xl mx-auto lg:mx-0">
                <ReviewForm onAddReview={addReview} isLoading={loading} />
              </div>
            </section>

            {/* Right Side: Product Info */}
            <section className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0 lg:col-span-5">
              <ProductInfo
                id={productData.id}
                title={productData.title}
                price={productData.price}
                description={
                  productData.description ||
                  "Customize and preview your design instantly."
                }
                colors={MOCK_COLORS}
                sizes={MOCK_SIZES}
                reviews={formattedReviews}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                isDetailsOpen={isDetailsOpen}
                toggleDetails={toggleDetails}
                isReviewsOpen={isReviewsOpen}
                toggleReviews={toggleReviews}
                onAddToCart={addToCart}
                onStartCustomizing={handleStartCustomizing}
                cartLoading={cartLoading}
                customizeLoading={customizeLoading}
                isEditMode={isEditMode}
              />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
