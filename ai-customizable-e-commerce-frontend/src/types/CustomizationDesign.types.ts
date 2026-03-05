import { PlacementState } from "./Customization.type";

export interface DesignSummaryDetails {
  style: string;
  size: string;
  quantity: number;
}

export interface AppliedArtwork {
  image: string;
  name?: string;
}

export interface SelectedColor {
  name: string;
  value: string;
}

export interface CustomizationDetailState {
  productTitle: string;
  productPrice: number;
  details: DesignSummaryDetails;
  color: SelectedColor;
  artwork: AppliedArtwork;
  placement: PlacementState;
  mainImage: string;
  otherImages: string[];
}

export interface CustomizationDetailProps {
  state: CustomizationDetailState;
  onEdit: () => void;
  onAddToCart: () => void;
}
