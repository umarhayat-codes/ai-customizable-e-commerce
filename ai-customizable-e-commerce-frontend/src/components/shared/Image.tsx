import React from "react";
import Image from "next/image";
import { IImageSectionProps } from "@/app/Home.types";

const ImageSection: React.FC<IImageSectionProps> = ({
  imageSrc,
  category,
  title,
  description,
  buttonText,
  secondaryButtonText,
  className = "",
  imageClassName = "",
  bgColor,
  categoryColor,
  titleColor,
  descriptionColor,
  buttonBgColor,
  buttonTextColor,
  secondaryButtonBgColor,
  secondaryButtonTextColor,
  onCategoryClick,
}) => {
  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[715px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className={`object-contain ${imageClassName}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Content Overlay */}
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10 max-w-[80%]">
          {category && (
            <p
              onClick={onCategoryClick}
              className="font-inter text-sm md:text-base font-medium mb-2 border-b-2 inline-block cursor-pointer"
              style={{ color: categoryColor, borderColor: categoryColor }}
            >
              {category}
            </p>
          )}
          <h2
            className="font-inter text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight"
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="font-inter text-sm mb-6 max-w-[400px]"
              style={{ color: descriptionColor }}
            >
              {description}
            </p>
          )}
          <div className="flex flex-wrap gap-4">
            <button
              className="px-6 py-3 font-inter text-sm md:text-base font-semibold transition-all rounded-md"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor,
              }}
            >
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                className="px-6 py-3 font-inter text-sm md:text-base font-semibold transition-all rounded-md"
                style={{
                  backgroundColor: secondaryButtonBgColor,
                  color: secondaryButtonTextColor,
                }}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSection;
