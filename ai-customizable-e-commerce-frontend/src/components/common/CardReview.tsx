import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IReviewCardProps } from "@/app/Home.types";

const CardReview: React.FC<IReviewCardProps> = ({
  image,
  rating,
  text,
  customerName,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={`Review by ${customerName}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${
              i < rating ? "text-[#FFA500]" : "text-[#E5E7EB]"
            } text-lg`}
          />
        ))}
      </div>
      <p className="font-inter text-[16px] leading-[1.6] text-(--color-review-text) mb-4 flex-grow">
        {text}
      </p>
      <div className="text-right">
        <span className="font-inter text-[16px] font-medium text-(--color-review-text)">
          — {customerName}
        </span>
      </div>
    </div>
  );
};

export default CardReview;
