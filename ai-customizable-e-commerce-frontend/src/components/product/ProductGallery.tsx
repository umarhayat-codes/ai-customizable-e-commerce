"use client";

import React from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoArrowUndoOutline, IoArrowRedoOutline } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import { ProductGalleryProps, CustomizationView } from "@/types/Detail.types";
import { useProductDetailHook } from "@/hooks/useProductDetailHook";

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  showControls = false,
  showViews = false,
  onViewChange,
  currentView = "Front",
  renderBottomAction,
  uploadedDesign,
  placement,
}) => {
  const { activeIndex, nextImage, prevImage, setIndex } = useProductDetailHook(
    images.length,
  );

  if (!images || images.length === 0) return null;

  const views: CustomizationView[] = ["Front", "Back", "Left", "Right"];

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {/* Main Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-(--color-product-gallery-bg) group">
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          fill
          className={`object-contain transition-all duration-500 ease-in-out ${images[activeIndex].transformClass || ""}`}
          priority
        />

        {/* Logo Overlay */}
        {uploadedDesign && currentView === "Front" && activeIndex === 0 && (
          <div
            className="absolute pointer-events-none z-10"
            style={{
              left: "50%",
              top: "50%",
              width: "120px",
              height: "120px",
              transform: `translate(calc(-50% + ${placement?.position.x || 0}px), calc(-50% + ${placement?.position.y || 0}px)) rotate(${placement?.rotate || 0}deg) scale(${placement?.scale || 1})`,
            }}
          >
            <img
              src={uploadedDesign}
              alt="Design Logo"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Customization Controls (Undo/Redo/Refresh) */}
        {showControls && (
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button className="p-2 rounded-full bg-white/80 hover:bg-white text-(--color-product-text) shadow-sm transition-all duration-200">
              <IoArrowUndoOutline size={20} />
            </button>
            <button className="p-2 rounded-full bg-white/80 hover:bg-white text-(--color-product-text) shadow-sm transition-all duration-200">
              <HiOutlineRefresh size={20} />
            </button>
            <button className="p-2 rounded-full bg-white/80 hover:bg-white text-(--color-product-text) shadow-sm transition-all duration-200">
              <IoArrowRedoOutline size={20} />
            </button>
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-(--color-product-arrow-bg) text-(--color-product-text) opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-(--color-product-arrow-hover) shadow-md z-10"
          aria-label="Previous image"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-(--color-product-arrow-bg) text-(--color-product-text) opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-(--color-product-arrow-hover) shadow-md z-10"
          aria-label="Next image"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setIndex(index)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
              activeIndex === index
                ? "border-(--color-product-thumbnail-active) ring-2 ring-(--color-product-thumbnail-active)/20"
                : "border-(--color-product-thumbnail-border) opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-contain p-1 ${image.transformClass || ""}`}
            />
            {/* Logo Overlay on Thumbnail for Front View */}
            {uploadedDesign && index === 0 && (
              <div
                className="absolute pointer-events-none z-10"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "24px",
                  height: "24px",
                  transform: `translate(calc(-50% + ${(placement?.position.x || 0) * 0.2}px), calc(-50% + ${(placement?.position.y || 0) * 0.2}px)) rotate(${placement?.rotate || 0}deg) scale(${(placement?.scale || 1) * 0.5})`,
                }}
              >
                <img
                  src={uploadedDesign}
                  alt="Design Logo Small"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* View Selection Buttons */}
      {showViews && (
        <div className="flex items-center justify-center gap-3">
          {views.map((view) => (
            <button
              key={view}
              onClick={() => onViewChange?.(view)}
              className={`px-8 py-2 rounded-md transition-all duration-200 text-sm font-medium border ${
                currentView === view
                  ? "bg-(--color-product-text) text-white border-(--color-product-text)"
                  : "bg-white text-(--color-product-text) border-gray-200 hover:border-gray-400"
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Action Button */}
      {renderBottomAction && (
        <div className="mt-2 w-full">{renderBottomAction()}</div>
      )}
    </div>
  );
};

export default ProductGallery;
