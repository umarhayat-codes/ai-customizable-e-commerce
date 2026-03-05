"use client";

import { useState } from "react";
import axios from "axios";
import {
  CustomizationState,
  DesignSuggestion,
} from "@/types/Customization.type";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomize,
  updateCustomization as updateReduxCustomization,
} from "@/redux/slice/CustomizeSlice";
import { useEffect } from "react";
import { selectUser } from "@/redux/slice/AuthSlice";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const INITIAL_SUGGESTIONS: DesignSuggestion[] = [
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
];

// Create axios instance with credentials for cookies
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
  withCredentials: true, // Enables automatic cookie transmission
});

export const useCustomization = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector(selectCustomize);
  const user = useSelector(selectUser);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [state, setState] = useState<CustomizationState>({
    baseColor: reduxState.baseColor || "#000000",
    sleevesColor: reduxState.baseColor || "#000000",
    accentsColor: reduxState.baseColor || "#000000",
    uploadedDesign: reduxState.uploadedDesign,
    suggestions: INITIAL_SUGGESTIONS,
    aiPrompt: reduxState.aiPrompt || "",
    placement: reduxState.placement,
    currentView: reduxState.currentView,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch from database on mount if user and product exist
  useEffect(() => {
    const fetchCustomization = async () => {
      if (!user || !productId) return;

      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `/customize-product/get-customization?user_id=${user.id}&product_id=${productId}`,
        );

        if (response.data.status && response.data.data) {
          const dbData = response.data.data;
          setState((prev) => ({
            ...prev,
            baseColor: dbData.color_value || dbData.color || prev.baseColor,
            uploadedDesign: dbData.design_logo || null,
            placement: dbData.placement_data
              ? JSON.parse(dbData.placement_data)
              : prev.placement,
          }));
          // Also sync to Redux for other components
          dispatch(
            updateReduxCustomization({
              baseColor: dbData.color_value || dbData.color,
              uploadedDesign: dbData.design_logo || null,
              placement: dbData.placement_data
                ? JSON.parse(dbData.placement_data)
                : undefined,
              productTitle: dbData.title,
              productPrice: dbData.price,
            }),
          );
        }
      } catch (err: any) {
        console.error("Fetch customization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomization();
  }, [user, productId, dispatch]);

  // Sync Redux -> Local State if Redux has data (Legacy support/fallback)
  useEffect(() => {
    if (reduxState.productId && !isLoading) {
      setState((prev) => ({
        ...prev,
        baseColor: reduxState.baseColor || prev.baseColor,
        uploadedDesign: reduxState.uploadedDesign || prev.uploadedDesign,
        placement: reduxState.placement || prev.placement,
        aiPrompt: reduxState.aiPrompt || prev.aiPrompt,
      }));
    }
  }, [reduxState.productId]);

  // Sync Local State -> Redux
  const updateState = (updates: Partial<CustomizationState>) => {
    const newState = { ...state, ...updates };
    setState(newState);
    dispatch(updateReduxCustomization(updates));

    // If certain fields changed, auto-save to DB
    if (
      "uploadedDesign" in updates ||
      "placement" in updates ||
      "baseColor" in updates
    ) {
      handleSave(newState);
    }
  };

  const handleSave = async (currentState: CustomizationState) => {
    if (!user || !productId) return;

    try {
      await axiosInstance.post("/customize-product/customize-product", {
        user_id: user.id,
        product_id: productId,
        image: reduxState.productImage || "", // Ensure base image is preserved
        title: reduxState.productTitle || "Custom Item",
        price: reduxState.productPrice || "$0.00",
        color: currentState.baseColor,
        size: reduxState.selectedSize || "M",
        design_logo: currentState.uploadedDesign,
        placement_data: JSON.stringify(currentState.placement),
        quantity: reduxState.quantity || 1,
      });
    } catch (err) {
      console.error("Auto-save error:", err);
    }
  };

  const handleGenerateAI = async () => {
    // Validate that prompt is not empty
    if (!state.aiPrompt || state.aiPrompt.trim() === "") {
      setError("Please enter a design description");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Generating AI design for:", state.aiPrompt);

      // Prepare the request payload
      const requestPayload = {
        aiPrompt: state.aiPrompt,
        baseColor: state.baseColor,
        sleevesColor: state.sleevesColor,
        accentsColor: state.accentsColor,
        uploadedDesign: state.uploadedDesign,
        placement: state.placement,
        currentView: state.currentView,
        productName: "T-Shirt", // Default product name
      };

      // Call the backend API
      const response = await axiosInstance.post(
        "/customize/generate-design",
        requestPayload,
      );

      // Handle successful response
      if (response.data.status === "success" && response.data.data) {
        const generatedSuggestions: DesignSuggestion[] = response.data.data.map(
          (item: any, index: number) => ({
            id: `generated-${Date.now()}-${index}`,
            image: `data:image/png;base64,${item.image_base64}`,
            description: item.enhanced_prompt || "AI-generated design",
          }),
        );

        // Update state with new suggestions
        updateState({
          suggestions: generatedSuggestions,
        });

        console.log("Successfully generated designs:", generatedSuggestions);
      } else {
        throw new Error(response.data.message || "Failed to generate designs");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to generate AI designs. Please try again.";
      setError(errorMessage);
      console.error("Design generation error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshSuggestions = async () => {
    // Simply call handleGenerateAI again to refresh with same prompt
    if (state.aiPrompt.trim() !== "") {
      await handleGenerateAI();
    } else {
      setError("Please enter a design description first");
    }
  };

  const handleFileUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    updateState({ uploadedDesign: url });
  };

  return {
    state,
    updateState,
    handleGenerateAI,
    handleRefreshSuggestions,
    handleFileUpload,
    isLoading,
    error,
    setError,
  };
};
