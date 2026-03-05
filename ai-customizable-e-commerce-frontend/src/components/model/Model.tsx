"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiX, FiZap } from "react-icons/fi";
import { IModelProps, IModelCategory } from "@/types/Home.types";

const categories: IModelCategory[] = [
  {
    id: 1,
    image: "/images/white-hoodies.png",
    title: "Hoodies",
    link: "/cateories/hoodies",
  },
  {
    id: 2,
    image: "/images/black-hoodies.png",
    title: "Shirt",
    link: "/cateories/shirt",
  },
  {
    id: 3,
    image: "/images/shoes-categories.png",
    title: "Shoes",
    link: "/cateories/shoes",
  },
  {
    id: 4,
    image: "/images/cap-hoodies.png",
    title: "Caps",
    link: "/cateories/caps",
  },
  {
    id: 5,
    image: "/images/phone-cases.png",
    title: "phone case",
    badge: "Sold out",
    link: "/cateories/phone",
  },
  {
    id: 6,
    image: "/images/cups.png",
    title: "cups",
    link: "/cateories/cups",
  },
  {
    id: 7,
    image: "/images/bag-hoodies.png",
    title: "Hoodies",
    badge: "New In",
  },
];

const Model: React.FC<IModelProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCategoryClick = (link?: string) => {
    if (link) {
      router.push(link);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-28 px-4 bg-black/10 overflow-y-auto no-scrollbar">
      <div className="relative w-full max-w-[1196px] max-h-[1565px] bg-modal-bg rounded-lg mb-[300px] p-8 sm:p-12 animate-in fade-in zoom-in duration-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_0_20px_rgba(0,0,0,0.05)] border border-modal-border overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-modal-text hover:opacity-70 transition-opacity p-2"
        >
          <FiX className="text-2xl" />
        </button>

        {/* Headings */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-semibold text-[#1a1a1a] mb-4">
            Select a Product to Customize
          </h2>
          <p className="text-lg sm:text-xl font-poppins font-medium text-[#4a4a4a]">
            Start personalizing your unique product
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.link)}
              className="group relative bg-[#f8f9fb] border border-modal-border rounded-xl p-6 flex flex-col items-center justify-between hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            >
              {/* Badge */}
              {category.badge && (
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  <span
                    className={`text-[10px] font-bold uppercase py-1 px-3 rounded-md ${
                      category.badge === "Sold out"
                        ? "bg-[#4a4a4a] text-white"
                        : "bg-[#ffd700] text-[#1a1a1a]"
                    }`}
                  >
                    {category.badge}
                  </span>
                </div>
              )}

              {/* Image Container */}
              <div className="relative w-full aspect-square mb-6">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-contain transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-poppins font-semibold text-modal-text">
                {category.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="flex items-center justify-center gap-2 text-modal-text font-poppins text-sm sm:text-base">
          <FiZap className="text-lg" />
          <p>Customize anything you like and preview in real-time!</p>
        </div>
      </div>
    </div>
  );
};

export default Model;
