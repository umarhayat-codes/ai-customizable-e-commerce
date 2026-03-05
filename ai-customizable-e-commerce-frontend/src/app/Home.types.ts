import { ReactNode } from "react";

export interface ICardProps {
  image: string;
  title: string;
  label?: string;
  labelBg?: string;
}

export interface ICategory {
  image: string;
  title: string;
  label?: string;
}

export interface CardFeatherProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface IImageSectionProps {
  imageSrc: string;
  category: string;
  title: string;
  description?: string;
  buttonText: string;
  className?: string;
  imageClassName?: string;
  bgColor?: string;
  categoryColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  secondaryButtonText?: string;
  secondaryButtonBgColor?: string;
  secondaryButtonTextColor?: string;
  onCategoryClick?: () => void;
}

export interface IReviewCardProps {
  image: string;
  rating: number;
  text: string;
  customerName: string;
}

export interface ICustomizeCardProps {
  image: string;
  heading: string;
  subtext: string;
  buttonText: string;
  bgColor?: string;
  headingColor?: string;
  subtextColor?: string;
  buttonBgColor?: string;
  headingFont?: string;
  subtextFont?: string;
}
