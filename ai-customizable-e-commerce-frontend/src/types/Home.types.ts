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
  category?: string;
  title: string;
  description?: string;
  buttonText: string;
  secondaryButtonText?: string;
  className?: string;
  imageClassName?: string;
  bgColor?: string;
  titleColor?: string;
  categoryColor?: string;
  descriptionColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  secondaryButtonBgColor?: string;
  secondaryButtonTextColor?: string;
}

export interface IModelCategory {
  id: number;
  image: string;
  title: string;
  badge?: string;
  link?: string;
}

export interface IModelProps {
  isOpen: boolean;
  onClose: () => void;
}
