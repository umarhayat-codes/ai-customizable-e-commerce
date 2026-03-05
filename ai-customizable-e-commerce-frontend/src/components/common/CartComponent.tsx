"use client";

import React from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { CartItem } from "@/types/Cart.types";

interface CartComponentProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onEdit: (item: CartItem) => void;
  onPreview: (item: CartItem) => void;
}

const CartComponent: React.FC<CartComponentProps> = ({
  items,
  onRemove,
  onUpdateQuantity,
  onEdit,
  onPreview,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative flex flex-col md:flex-row bg-white border border-[#E5E7EB] rounded-lg p-4 md:p-6 gap-6"
        >
          {/* Product Image Section */}
          <div className="relative w-full md:w-[150px] aspect-square bg-[#F8F9FB] rounded-md overflow-hidden flex items-center justify-center shrink-0">
            {/* Overlay Label */}
            {item.includesCustomization && (
              <div className="absolute top-0 left-0 w-full bg-black/80 py-1 flex items-center justify-center z-10">
                <span className="text-[10px] text-white font-medium uppercase tracking-wide">
                  Customized Product
                </span>
              </div>
            )}
            {/* T-shirt image */}
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-2"
              />
              {/* Logo Overlay for customized products */}
              {item.includesCustomization && item.design_logo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-[30%] h-[30%] mt-[-10%]">
                    <Image
                      src={item.design_logo}
                      alt="Design Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-color-category-card-text-dark font-poppins">
                {item.name}
              </h3>
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 mb-6">
              <p className="text-sm font-poppins text-gray-500">
                <span className="text-gray-600 font-medium">Color:</span>{" "}
                {item.color}
              </p>
              <p className="text-sm font-poppins text-gray-500">
                <span className="text-gray-600 font-medium">Description:</span>{" "}
                {item.print}
              </p>
              <p className="text-sm font-poppins text-gray-500">
                <span className="text-gray-600 font-medium">Size:</span>{" "}
                {item.size}
              </p>
              <p className="text-sm font-poppins text-gray-500">
                <span className="text-gray-600 font-medium">Quantity:</span>{" "}
                {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-6 mt-auto">
              <button
                onClick={() => onEdit(item)}
                disabled={!item.product_id}
                className={`text-sm font-medium underline hover:no-underline transition-all ${
                  item.product_id
                    ? "text-gray-800 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed no-underline"
                }`}
              >
                Edit Design
              </button>
              <button
                onClick={() => onPreview(item)}
                className="text-sm font-medium text-gray-800 underline hover:no-underline transition-all"
              >
                View Preview
              </button>
            </div>
          </div>

          {/* Price Section - Desktop Right Side / Mobile Bottom */}
          <div className="flex flex-col items-end justify-end self-end md:self-auto md:absolute md:bottom-6 md:right-6 text-right">
            <span className="text-2xl font-bold text-gray-900 font-poppins">
              ${item.price}
            </span>
            <span className="text-[10px] text-gray-500 mt-1 uppercase">
              Includes customization
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartComponent;
