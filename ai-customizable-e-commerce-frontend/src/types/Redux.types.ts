export interface PlacementState {
  position: { x: number; y: number };
  rotate: number;
  scale: number;
}

export interface DesignSuggestion {
  id: string;
  image: string;
  description?: string;
}

export interface CustomizeState {
  productId: string;
  productTitle: string;
  productPrice: string;
  productImage: string;
  baseColor: string;
  selectedColorName: string;
  selectedSize: string;
  uploadedDesign: string | null;
  suggestions: DesignSuggestion[];
  aiPrompt: string;
  placement: PlacementState;
  currentView: "Front" | "Back" | "Left" | "Right";
  quantity: number;
}
