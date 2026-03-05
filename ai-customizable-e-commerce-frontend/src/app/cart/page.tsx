"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CartComponent from "@/components/common/CartComponent";
import useCartHook from "@/hooks/useCartHook";

const CartPage: React.FC = () => {
  const router = useRouter();
  const {
    items,
    summary,
    removeItem,
    updateQuantity,
    editItem,
    previewItem,
    openPreview,
    closePreview,
  } = useCartHook();

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <Header />

      <main className="flex-grow bg-white py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">
              Your Cart
            </h1>
            <p className="text-gray-500 font-poppins">
              Review your customized products before checkout
            </p>
          </div>

          {/* Cart Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left Side: Cart Items */}
            <div className="lg:col-span-2">
              {items.length > 0 ? (
                <CartComponent
                  items={items}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                  onEdit={editItem}
                  onPreview={openPreview}
                />
              ) : (
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-10 text-center">
                  <p className="text-gray-500 font-poppins mb-4">
                    Your cart is empty.
                  </p>
                  <Link
                    href="/"
                    className="inline-block bg-color-auth-btn-bg text-white px-8 py-3 rounded-sm font-medium hover:opacity-90 transition-opacity uppercase text-sm"
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full">
              <div className="bg-[#F8F9FB] border border-[#E5E7EB] rounded-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 font-poppins mb-8">
                  Product Details
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm font-poppins text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-semibold text-gray-900">
                      ${summary.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-poppins text-gray-600">
                    <span>Customization Charges</span>
                    <span className="font-semibold text-gray-900">
                      ${summary.customizationCharges.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-poppins text-gray-600">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-gray-900">
                      ${summary.shipping.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-blue-100 pt-6 mb-8 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900 font-poppins uppercase">
                    Total
                  </span>
                  <span className="text-3xl font-bold text-gray-900 font-poppins">
                    ${summary.total.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-[#1A1A1A] text-white py-4 rounded-sm font-bold text-sm tracking-wider hover:opacity-90 transition-opacity uppercase"
                  >
                    Proceed to Checkout
                  </button>
                  <Link
                    href="/"
                    className="w-full flex items-center justify-center border border-[#E5E7EB] bg-white text-[#1A1A1A] py-4 rounded-sm font-bold text-sm tracking-wider hover:bg-gray-50 transition-colors uppercase"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors z-20"
            >
              <IoClose size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Preview */}
              <div className="relative aspect-square bg-[#F8F9FB] flex items-center justify-center">
                <Image
                  src={previewItem.image}
                  alt={previewItem.name}
                  fill
                  className="object-contain p-8"
                />
                {previewItem.includesCustomization &&
                  previewItem.design_logo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative w-[40%] h-[40%] mt-[-10%]">
                        <Image
                          src={previewItem.design_logo}
                          alt="Design Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
              </div>

              {/* Product Details info */}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-poppins">
                  {previewItem.name}
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-500">
                    <span className="font-semibold text-gray-700">Color:</span>{" "}
                    {previewItem.color}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold text-gray-700">Size:</span>{" "}
                    {previewItem.size}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold text-gray-700">
                      Description:
                    </span>{" "}
                    {previewItem.print}
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-3xl font-bold text-gray-900">
                      ${previewItem.price}
                    </p>
                    {previewItem.includesCustomization && (
                      <span className="text-xs text-gray-400 uppercase tracking-wider">
                        Customized Product
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CartPage;
