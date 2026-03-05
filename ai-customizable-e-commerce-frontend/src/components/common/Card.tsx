import Image from "next/image";
import { ICardProps } from "@/types/Trending.types";

const Card: React.FC<ICardProps> = ({
  image,
  title,
  price,
  label,
  labelBg,
  titleFont = "font-inter",
  priceFont = "font-noto-sans-sc",
  titleColor = "text-trending-text",
  priceColor = "text-trending-text",
  imageWidth = 200,
  imageHeight = 280,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col items-start justify-center p-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-[320px] flex items-center justify-center mb-4 bg-white rounded-lg">
        {label && (
          <span
            className="absolute top-4 left-0 px-2 py-1 text-[10px] font-bold text-white rounded-[2px] z-10"
            style={{ backgroundColor: labelBg || "#000" }}
          >
            {label}
          </span>
        )}
        <Image
          src={image}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={`${titleFont} text-[18px] font-medium ${titleColor}`}>
          {title}
        </h3>
        {price && (
          <p className={`${priceFont} text-[16px] ${priceColor}`}>{price}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
