"use client";

import React from "react";
import {
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaTruck,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";
import Link from "next/link";
import { ColorOption, SizeOption, Review } from "@/types/Detail.types";

interface ProductInfoProps {
  id: string;
  title: string;
  price: string;
  description: string;
  colors: ColorOption[];
  sizes: SizeOption[];
  reviews: Review[];
  selectedColor: string;
  setSelectedColor: (id: string) => void;
  selectedSize: string;
  setSelectedSize: (id: string) => void;
  isDetailsOpen: boolean;
  toggleDetails: () => void;
  isReviewsOpen: boolean;
  toggleReviews: () => void;
  onAddToCart: () => void;
  onStartCustomizing: () => void;
  cartLoading: boolean;
  customizeLoading: boolean;
  isEditMode?: boolean;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  id,
  title,
  price,
  description,
  colors,
  sizes,
  reviews,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  isDetailsOpen,
  toggleDetails,
  isReviewsOpen,
  toggleReviews,
  onAddToCart,
  onStartCustomizing,
  cartLoading,
  customizeLoading,
  isEditMode = false,
}) => {
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="flex flex-col space-y-6 font-poppins">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-(--color-text-gray)">
          PREMIUM COLLECTION
        </span>
        <h1 className="mt-1 text-3xl font-bold text-(--color-product-text)">
          {title}
        </h1>
        <p className="mt-2 text-sm text-(--color-text-description)">
          {description}
        </p>
      </div>

      <div className="text-2xl font-bold text-(--color-product-text)">
        {price}
      </div>

      {/* Color Selection */}
      <div>
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="font-medium text-(--color-product-text)">
            Color{" "}
            <span className="text-(--color-text-gray)">
              ({colors.find((c) => c.id === selectedColor)?.name})
            </span>
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                selectedColor === color.id
                  ? "border-black scale-110"
                  : "border-transparent"
              }`}
            >
              {color.isSplit ? (
                <div className="w-full h-full rounded-full overflow-hidden flex transform -rotate-45">
                  <div
                    style={{ backgroundColor: color.color1 }}
                    className="flex-1"
                  />
                  <div
                    style={{ backgroundColor: color.color2 }}
                    className="flex-1"
                  />
                </div>
              ) : (
                <div
                  style={{ backgroundColor: color.value }}
                  className="w-full h-full rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="font-medium text-(--color-product-text)">Size</span>
          <button
            onClick={toggleReviews}
            className="text-(--color-product-text)"
          >
            {isReviewsOpen ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size.id)}
              disabled={size.disabled}
              className={`px-4 py-2 text-xs font-medium border rounded transition-all min-w-[50px] ${
                selectedSize === size.id
                  ? "bg-white border-black text-black"
                  : size.disabled
                    ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                    : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              {size.label}
            </button>
          ))}
          <button className="ml-auto text-xs underline text-gray-500">
            Size Guide
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 pt-4 border-t border-(--color-border-light)">
        {!isEditMode && (
          <button
            onClick={onStartCustomizing}
            disabled={customizeLoading}
            className="w-full py-4 bg-[#1e1f28] text-white font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors rounded flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {customizeLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "START CUSTOMIZING"
            )}
          </button>
        )}
        <button
          onClick={onAddToCart}
          disabled={cartLoading}
          className={`w-full py-4 font-bold text-xs uppercase tracking-widest transition-colors rounded flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            isEditMode
              ? "bg-[#1e1f28] text-white hover:bg-black"
              : "bg-white border border-[#1e1f28] text-[#1e1f28] hover:bg-gray-50"
          }`}
        >
          {cartLoading ? (
            <div
              className={`w-4 h-4 border-2 rounded-full animate-spin ${
                isEditMode
                  ? "border-white border-t-transparent"
                  : "border-[#1e1f28] border-t-transparent"
              }`}
            />
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {isEditMode ? "UPDATE CART" : "ADD TO CART"}
            </>
          )}
        </button>
      </div>

      {/* Accordions */}
      <div className="border-t border-(--color-border-light)">
        <button
          onClick={toggleDetails}
          className="w-full py-4 flex justify-between items-center text-sm font-medium text-(--color-product-text)"
        >
          Product Details
          {isDetailsOpen ? (
            <FaChevronUp size={12} />
          ) : (
            <FaChevronDown size={12} />
          )}
        </button>
        {isDetailsOpen && (
          <div className="pb-4 text-sm text-(--color-text-description)">
            Elevate your everyday style with our Essential Cotton Tee. Crafted
            from 100% premium combed cotton, it offers unparalleled comfort and
            durability. This versatile piece serves as the perfect canvas for
            your custom designs.
          </div>
        )}

        <button
          onClick={toggleReviews}
          className="w-full py-4 flex justify-between items-center text-sm font-medium text-(--color-product-text) border-t border-(--color-border-light)"
        >
          Customer Reviews
          {isReviewsOpen ? (
            <FaChevronUp size={12} />
          ) : (
            <FaChevronDown size={12} />
          )}
        </button>
        {isReviewsOpen && (
          <div className="pb-4 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-(--color-star-active)">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(avgRating)
                        ? ""
                        : "text-(--color-star-inactive)"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-(--color-product-text)">
                ({reviews.length})
              </span>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-semibold text-sm text-(--color-product-text)">
                        {review.author}
                      </span>
                    </div>
                    <div className="flex text-(--color-star-active)">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={12}
                          className={
                            i < review.rating
                              ? ""
                              : "text-(--color-star-inactive)"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-(--color-text-description) leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-6 text-xs font-semibold underline text-(--color-product-text)">
              View All Reviews
            </button>
          </div>
        )}
      </div>

      {/* Footer Policies */}
      <div className="grid grid-cols-3 gap-4 pt-8 border-t border-(--color-border-light) text-center">
        <div className="flex flex-col items-center">
          <FaTruck size={24} className="mb-2 text-[#1e1f28]" />
          <span className="text-[10px] font-bold uppercase tracking-tight">
            FREE SHIPPING
          </span>
        </div>
        <div className="flex flex-col items-center border-x border-(--color-border-light)">
          <FaUndo size={24} className="mb-2 text-[#1e1f28]" />
          <span className="text-[10px] font-bold uppercase tracking-tight">
            30-Day Returns
          </span>
        </div>
        <div className="flex flex-col items-center">
          <FaShieldAlt size={24} className="mb-2 text-[#1e1f28]" />
          <span className="text-[10px] font-bold uppercase tracking-tight">
            1-Year Warranty
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
