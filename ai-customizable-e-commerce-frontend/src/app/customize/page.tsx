"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import ProductGallery from "@/components/product/ProductGallery";
import CustomizePanel from "@/components/product/CustomizePanel";
import { useCustomization } from "@/hooks/useCustomization";
import { useSearchParams, useRouter } from "next/navigation";
import { allProducts } from "@/data/products";

import { toast } from "react-toastify";

const CustomizeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const cartItemId = searchParams.get("cart_item_id");
  const product = allProducts.find((p) => p.id === productId) || allProducts[2]; // Default to index 2 if not found

  const {
    state,
    updateState,
    handleGenerateAI,
    handleRefreshSuggestions,
    isLoading,
  } = useCustomization();

  // Mock gallery images based on the product
  const galleryImages = [
    { src: product.image, alt: "Front View" },
    { src: product.image, alt: "Back View", transformClass: "rotate-180" },
    { src: product.image, alt: "Left View", transformClass: "rotate-90" },
    { src: product.image, alt: "Right View", transformClass: "-rotate-90" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Back Link */}
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <Link
          href={`/productDetail?id=${product.id}`}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          <FiChevronLeft size={18} />
          Back to Collections
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-start">
        {/* Left Side: Product Gallery with specific background */}
        <div className="w-full bg-[#F5F5F580] px-6 py-10 min-h-[calc(100vh-60px)] flex flex-col items-center">
          <ProductGallery
            images={galleryImages}
            showControls={true}
            showViews={true}
            currentView={state.currentView}
            onViewChange={(view) => updateState({ currentView: view })}
            uploadedDesign={state.uploadedDesign}
            placement={state.placement}
            renderBottomAction={() => (
              <button
                onClick={() => {
                  if (!state.uploadedDesign) {
                    toast.error("Please add a logo design before previewing");
                    return;
                  }
                  const editParam = cartItemId
                    ? `&cart_item_id=${cartItemId}`
                    : "";
                  router.push(`/customDesign?id=${productId}${editParam}`);
                }}
                className="w-full py-4 bg-[#1e1f28] text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity mt-4 shadow-lg"
              >
                Preview Final Design
              </button>
            )}
          />
        </div>

        {/* Right Side: Customize Panel */}
        <div className="w-full px-6 py-10 bg-white">
          <CustomizePanel
            state={state}
            onUpdate={updateState}
            onRefreshSuggestions={handleRefreshSuggestions}
            onGenerateAI={handleGenerateAI}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default function CustomizePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <CustomizeContent />
    </Suspense>
  );
}
