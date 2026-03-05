export interface CategoryCardProps {
  image: string;
  title: string;
  price: string;
  description: string;
  label?: string;
  labelType?: "sold" | "new";
  titleFont?: string;
  descriptionFont?: string;
  priceFont?: string;
  onClick?: () => void;
}

export interface PolicyItem {
  title: string;
  description: string;
}

export interface CardPolicesProps {
  policies: PolicyItem[];
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  titleFont?: string;
  descriptionFont?: string;
}

export interface ICustomizeCardProps {
  image: string;
  heading: string;
  subtext: string;
  buttonText: string;
  bgColor?: string;
  leftCardBg?: string;
  headingColor?: string;
  subtextColor?: string;
  buttonBgColor?: string;
  buttonBorderColor?: string;
  headingFont?: string;
  subtextFont?: string;
  price?: string;
  priceColor?: string;
  priceFont?: string;
  imageFit?: "cover" | "contain";
  alignment?: "start" | "center";
  onClick?: () => void;
}
