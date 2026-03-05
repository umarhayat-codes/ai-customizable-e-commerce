import { CardFeatherProps } from "@/types/Home.types";
import React from "react";

const CardFeather: React.FC<CardFeatherProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="relative p-[1px] rounded-[12px] bg-[var(--border-gradient)] h-full">
      <div className="bg-white rounded-[11px] p-8 flex flex-col items-start gap-4 h-full shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#1E1F28] flex items-center justify-center text-white text-xl">
          {icon}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-poppins text-lg font-bold text-[#1E1F28] leading-tight">
            {title}
          </h3>
          <p className="font-inter text-sm text-[#4A4A4A] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFeather;
