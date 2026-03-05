"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { FiChevronLeft, FiShoppingCart } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ProductGallery from "@/components/product/ProductGallery";
import { useCustomizationDetail } from "@/hooks/useCustomizationDetail";
import { useSearchParams } from "next/navigation";
import { allProducts } from "@/data/products";
import { useSelector } from "react-redux";

const CustomDesignContent = () => {
  const { state, handleEdit, handleAddToCart, isLoading, isEditMode } =
    useCustomizationDetail();

  const reduxState = useSelector((s: any) => s.customize);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id") || reduxState.productId;

  // Find the product based on the stored ID
  const product = allProducts.find((p) => p.id === productId) || allProducts[2];

  const galleryImages = [
    { src: product.image, alt: "Front View" },
    { src: product.image, alt: "Back View", transformClass: "rotate-180" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading preview...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-(--color-final-preview-bg) font-(--font-final-preview-sans) text-(--color-final-preview-text)">
      {/* Top Header */}
      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <Link
          href="/customize"
          className="flex items-center gap-2 text-sm font-semibold text-(--color-final-preview-text-muted) hover:text-black transition-colors"
        >
          <FiChevronLeft size={18} />
          Final Preview
        </Link>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-(--color-final-preview-border)">
        {/* Left Side: Preview Gallery */}
        <div className="bg-(--color-final-preview-main-bg) flex flex-col items-center py-12 px-6 border-r border-(--color-final-preview-border)">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold font-(--font-final-preview-heading) mb-2">
              Your Custom Design
            </h1>
            <p className="text-(--color-final-preview-text-muted) text-lg">
              This is exactly how your product will be delivered
            </p>
          </div>

          <div className="w-full max-w-[600px]">
            <ProductGallery
              images={galleryImages}
              showViews={true}
              uploadedDesign={state.artwork.image}
              placement={state.placement}
              currentView="Front"
            />
          </div>
        </div>

        {/* Right Side: Design Summary */}
        <div className="bg-(--color-final-preview-sidebar-bg) p-10 lg:p-16 flex flex-col gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-8">Design Summary</h2>
            <div className="space-y-6 border-b border-(--color-final-preview-border) pb-8">
              <h3 className="text-lg font-bold">Product Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-(--color-final-preview-text-muted)">
                    Style
                  </span>
                  <span className="font-semibold">{state.details.style}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-(--color-final-preview-text-muted)">
                    Size
                  </span>
                  <span className="font-semibold">{state.details.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-(--color-final-preview-text-muted)">
                    Quantity
                  </span>
                  <span className="font-semibold">
                    {state.details.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-b border-(--color-final-preview-border) pb-8">
            <h3 className="text-lg font-bold">Color</h3>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border border-gray-200"
                style={{ backgroundColor: state.color.value }}
              />
              <span className="text-sm font-medium">{state.color.name}</span>
            </div>
          </div>

          <div className="space-y-4 border-b border-(--color-final-preview-border) pb-8">
            <h3 className="text-lg font-bold">Applied Artwork</h3>
            {state.artwork.image ? (
              <div className="relative w-32 h-32 bg-gray-50 rounded-xl overflow-hidden border border-(--color-final-preview-border)">
                <img
                  src={product.image}
                  alt="Product Base"
                  className="absolute inset-0 w-full h-full object-contain opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src={state.artwork.image}
                    alt="Applied Logo"
                    className="max-w-full max-h-full object-contain drop-shadow-md"
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No artwork applied</p>
            )}
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-xl font-medium text-(--color-final-preview-text-muted)">
              Total
            </span>
            <span className="text-3xl font-bold">${state.productPrice}</span>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-(--color-final-preview-accent) text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <FiShoppingCart size={20} />
              {isEditMode ? "UPDATE CART" : "ADD TO CART"}
            </button>
            <button
              onClick={handleEdit}
              className="w-full py-4 bg-white text-(--color-final-preview-accent) border-2 border-(--color-final-preview-border) rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <HiOutlinePencilAlt size={22} />
              Edit Design
            </button>
          </div>

          <div className="bg-(--color-final-preview-guarantee-bg) border border-(--color-final-preview-guarantee-border) rounded-xl p-6 mt-4">
            <h4 className="text-(--color-final-preview-guarantee-text) font-bold mb-2">
              Quality Guarantee
            </h4>
            <p className="text-(--color-final-preview-guarantee-text) text-sm leading-relaxed">
              Premium materials and professional printing ensure your design
              looks exactly as previewed.
            </p>
          </div>

          <p className="text-xs text-(--color-final-preview-text-muted) leading-relaxed">
            Colors may vary slightly due to monitor settings and printing
            processes. We use high-quality inks to ensure the closest match
            possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function CustomDesignPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <CustomDesignContent />
    </Suspense>
  );
}
