export interface DesignSuggestion {
  id: string;
  image: string;
  description?: string;
}

export interface PlacementState {
  position: { x: number; y: number };
  rotate: number;
  scale: number;
}

export interface CustomizationState {
  baseColor: string;
  sleevesColor: string;
  accentsColor: string;
  uploadedDesign: string | null;
  suggestions: DesignSuggestion[];
  aiPrompt: string;
  placement: PlacementState;
  currentView: "Front" | "Back" | "Left" | "Right";
}

export interface CustomizePanelProps {
  state: CustomizationState;
  onUpdate: (updates: Partial<CustomizationState>) => void;
  onGenerateAI: () => void;
  onRefreshSuggestions: () => void;
  isLoading: boolean;
}
