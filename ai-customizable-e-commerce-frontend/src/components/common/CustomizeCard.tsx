import React from "react";
import Image from "next/image";
import { ICustomizeCardProps } from "@/types/Category.types";

const CustomizeCard: React.FC<ICustomizeCardProps> = ({
  image,
  heading,
  subtext,
  buttonText,
  bgColor = "var(--color-customize-bg)",
  leftCardBg = "transparent",
  headingColor = "var(--color-customize-heading)",
  subtextColor = "var(--color-customize-text)",
  buttonBgColor = "var(--color-customize-btn-bg)",
  buttonBorderColor = "transparent",
  headingFont = "var(--font-poppins)",
  subtextFont = "var(--font-inter)",
  price,
  priceColor = "var(--color-customize-text)",
  priceFont = "var(--font-inter)",
  imageFit,
  alignment = "start",
  onClick,
}) => {
  return (
    <section className="w-full px-4 pb-8 md:px-10 lg:px-20 xlg:px-30 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
        {/* Left Card: Image */}
        <div
          className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: leftCardBg }}
        >
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt="Customize Product"
              fill
              className={
                imageFit
                  ? imageFit === "contain"
                    ? "object-contain p-4"
                    : "object-cover"
                  : leftCardBg !== "transparent"
                    ? "object-contain p-4"
                    : "object-cover"
              }
              priority
            />
          </div>
        </div>

        {/* Right Card: Content */}
        <div
          className={`h-full flex flex-col justify-center p-8 md:p-12 lg:p-10 xl:p-16  ${
            alignment === "center" ? "items-center text-center" : "items-start"
          }`}
          style={{ backgroundColor: bgColor }}
        >
          <h2
            className="text-2xl md:text-3xl lg:text-2xl xl:text-4xl font-semibold mb-8 leading-tight"
            style={{ color: headingColor, fontFamily: headingFont }}
          >
            {heading}
          </h2>
          <p
            className="text-lg md:text-lg lg:text-base xl:text-lg font-normal mb-8 lg:mb-4 max-w-md leading-relaxed"
            style={{ color: subtextColor, fontFamily: subtextFont }}
          >
            {subtext}
          </p>
          {price && (
            <div
              className="text-2xl md:text-3xl lg:text-xl xlg:text-2xl font-bold mb-8"
              style={{ color: priceColor, fontFamily: priceFont }}
            >
              {price}
            </div>
          )}
          <button
            onClick={onClick}
            className="px-8 py-4 lg:px-6 lg:py-3 xl:px-8 xl:py-4 text-white font-medium text-lg transition-transform hover:scale-105 active:scale-95 rounded-sm border"
            style={{
              backgroundColor: buttonBgColor,
              borderColor: buttonBorderColor,
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomizeCard;
