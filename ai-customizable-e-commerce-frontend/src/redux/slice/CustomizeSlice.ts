import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomizeState, PlacementState } from "../../types/Redux.types";

const initialState: CustomizeState = {
  productId: "",
  productTitle: "",
  productPrice: "",
  productImage: "",
  baseColor: "#000000",
  selectedColorName: "Black",
  selectedSize: "M",
  uploadedDesign: null,
  suggestions: [
    {
      id: "1",
      image: "https://placehold.co/100x100?text=Design+1",
      description: "Geometric minimalism with balanced proportions",
    },
    {
      id: "2",
      image: "https://placehold.co/100x100?text=Design+2",
      description: "Geometric minimalism with balanced proportions",
    },
    {
      id: "3",
      image: "https://placehold.co/100x100?text=Design+3",
      description: "Geometric minimalism with balanced proportions",
    },
  ],
  aiPrompt: "",
  placement: {
    position: { x: 0, y: 0 },
    rotate: 0,
    scale: 1,
  },
  currentView: "Front",
  quantity: 1,
};

const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    setProductDetails: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        price: string;
        image: string;
        color: string;
        colorName: string;
        size: string;
      }>,
    ) => {
      state.productId = action.payload.id;
      state.productTitle = action.payload.title;
      state.productPrice = action.payload.price;
      state.productImage = action.payload.image;
      state.baseColor = action.payload.color;
      state.selectedColorName = action.payload.colorName;
      state.selectedSize = action.payload.size;
    },
    updateCustomization: (
      state,
      action: PayloadAction<Partial<CustomizeState>>,
    ) => {
      return { ...state, ...action.payload };
    },
    setUploadedDesign: (state, action: PayloadAction<string | null>) => {
      state.uploadedDesign = action.payload;
    },
    setPlacement: (state, action: PayloadAction<PlacementState>) => {
      state.placement = action.payload;
    },
    resetCustomization: () => initialState,
  },
});

export const {
  setProductDetails,
  updateCustomization,
  setUploadedDesign,
  setPlacement,
  resetCustomization,
} = customizeSlice.actions;

export const selectCustomize = (state: { customize: CustomizeState }) =>
  state.customize;

export default customizeSlice.reducer;
