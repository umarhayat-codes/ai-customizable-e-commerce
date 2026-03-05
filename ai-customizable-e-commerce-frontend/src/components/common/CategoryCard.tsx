"use client";

import Image from "next/image";
import { CategoryCardProps } from "@/types/Category.types";

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  price,
  description,
  label,
  labelType,
  titleFont,
  descriptionFont,
  priceFont,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col gap-4 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div className="relative aspect-square w-full  overflow-hidden group">
        {label && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-wider z-10 ${
              labelType === "sold"
                ? "bg-[#4A4A4A] text-white"
                : "bg-[#FFD700] text-[#4A4A4A]"
            }`}
          >
            {label}
          </div>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-2 px-2 pb-4">
        <div className="flex justify-between items-start gap-4">
          <h3
            className="text-[#4A4A4A]  text-[18px]  font-medium leading-tight"
            style={{ fontFamily: titleFont }}
          >
            {title}
          </h3>
          <span
            className="text-[#4A4A4A]  text-[16px]  font-medium"
            style={{ fontFamily: priceFont }}
          >
            {price}
          </span>
        </div>
        <p
          className="text-[#4A4A4A] font-bold  text-[14px]  leading-relaxed"
          style={{ fontFamily: descriptionFont }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
