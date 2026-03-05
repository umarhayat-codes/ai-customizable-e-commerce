import { PlacementState } from "./Customization.type";

export interface ProductImage {
  src: string;
  alt: string;
  transformClass?: string;
}

export type CustomizationView = "Front" | "Back" | "Left" | "Right";

export interface ProductGalleryProps {
  images: ProductImage[];
  showControls?: boolean;
  showViews?: boolean;
  onViewChange?: (view: CustomizationView) => void;
  currentView?: CustomizationView;
  renderBottomAction?: () => React.ReactNode;
  uploadedDesign?: string | null;
  placement?: PlacementState;
}

export interface ColorOption {
  id: string;
  name: string;
  value: string; // Hex code or image path
  isSplit?: boolean; // For two-tone options
  color1?: string;
  color2?: string;
}

export interface SizeOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface ProductInfoProps {
  title: string;
  price: string;
  description: string;
  colors: ColorOption[];
  sizes: SizeOption[];
  reviews: Review[];
  overallRating: number;
  reviewCount: number;
}
