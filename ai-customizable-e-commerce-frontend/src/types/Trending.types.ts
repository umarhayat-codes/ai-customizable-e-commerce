export interface ICardProps {
  image: string;
  title: string;
  price?: string;
  label?: string;
  labelBg?: string;
  titleFont?: string;
  priceFont?: string;
  titleColor?: string;
  priceColor?: string;
  imageWidth?: number;
  imageHeight?: number;
  onClick?: () => void;
}

export interface ITrendingCustomizeCardProps {
  image: string;
  heading: string;
  subtext: string;
  price: string;
  buttonText: string;
  bgColor?: string;
  leftCardBg?: string;
  headingColor?: string;
  subtextColor?: string;
  priceColor?: string;
  buttonBgColor?: string;
  buttonBorderColor?: string;
  headingFont?: string;
  subtextFont?: string;
  priceFont?: string;
  alignment?: "start" | "center";
}
