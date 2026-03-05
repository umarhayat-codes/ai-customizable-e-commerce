"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCustomize } from "@/redux/slice/CustomizeSlice";
import { selectUser } from "@/redux/slice/AuthSlice";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { CustomizationDetailState } from "../types/CustomizationDesign.types";
import { useRouter } from "next/navigation";

export const useCustomizationDetail = () => {
  const router = useRouter();
  const reduxState = useSelector(selectCustomize);
  const user = useSelector(selectUser);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const cartItemId = searchParams.get("cart_item_id");
  const isEditMode = !!cartItemId;

  const [state, setState] = useState<CustomizationDetailState>({
    productTitle: "Your Custom Design",
    productPrice: 0,
    details: {
      style: "Premium Cotton Tee",
      size: "Large",
      quantity: 1,
    },
    color: {
      name: "Black",
      value: "#1a1a1a",
    },
    artwork: {
      image: "",
    },
    placement: {
      position: { x: 0, y: 0 },
      rotate: 0,
      scale: 1,
    },
    mainImage: "",
    otherImages: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFromDB = async () => {
      if (!user || !productId) return;

      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/customize-product/get-customization?user_id=${user.id}&product_id=${productId}`,
        );

        if (response.data.status && response.data.data) {
          const dbData = response.data.data;
          setState({
            productTitle: dbData.title || "Custom Design",
            productPrice: dbData.price
              ? parseFloat(dbData.price.replace(/[^0-9.]/g, ""))
              : 0,
            details: {
              style: dbData.title || "Custom Item",
              size: dbData.size || "M",
              quantity: dbData.quantity || 1,
            },
            color: {
              name: dbData.color || "Selected Color",
              value: dbData.color_value || "#000000",
            },
            artwork: {
              image: dbData.design_logo || "",
            },
            placement: dbData.placement_data
              ? JSON.parse(dbData.placement_data)
              : {
                  position: { x: 0, y: 0 },
                  rotate: 0,
                  scale: 1,
                },
            mainImage: dbData.image || "",
            otherImages: [],
          });
        }
      } catch (error) {
        console.error("Error fetching customization from DB:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFromDB();
  }, [user, productId]);

  // Fallback to Redux if DB fetch failed or not available (Sync for consistency)
  useEffect(() => {
    if (reduxState.productId && !isLoading) {
      setState((prev) => ({
        ...prev,
        productTitle: reduxState.productTitle || prev.productTitle,
        productPrice: reduxState.productPrice
          ? parseFloat(reduxState.productPrice.replace(/[^0-9.]/g, ""))
          : prev.productPrice,
        details: {
          ...prev.details,
          size: reduxState.selectedSize || prev.details.size,
        },
        color: {
          name: reduxState.selectedColorName || prev.color.name,
          value: reduxState.baseColor || prev.color.value,
        },
        artwork: {
          image: reduxState.uploadedDesign || prev.artwork.image,
        },
        placement: reduxState.placement || prev.placement,
        mainImage: reduxState.productImage || prev.mainImage,
      }));
    }
  }, [reduxState]);

  const handleEdit = () => {
    const editParam = cartItemId ? `&cart_item_id=${cartItemId}` : "";
    router.push(
      `/customize?id=${reduxState.productId || productId}${editParam}`,
    );
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please log in to add items to cart");
      return;
    }

    try {
      if (isEditMode && cartItemId) {
        // UPDATE existing cart item
        const response = await axios.put(
          `http://127.0.0.1:8000/product/update-cart-item/${cartItemId}`,
          {
            user_id: user.id,
            color: state.color.name,
            size: state.details.size,
            is_customized: true,
            design_logo: state.artwork.image,
          },
        );

        if (response.data.status) {
          toast.success("Cart item updated successfully!");
          router.push("/cart");
        } else {
          toast.error(response.data.message || "Failed to update cart item");
        }
      } else {
        // CREATE new cart item
        const response = await axios.post(
          "http://127.0.0.1:8000/product/add-to-cart",
          {
            user_id: user.id,
            product_id: productId,
            image: state.mainImage,
            title: state.productTitle,
            description: "Customized Product",
            price: `$ ${state.productPrice.toFixed(2)}`,
            color: state.color.name,
            size: state.details.size,
            quantity: 1,
            is_customized: true,
            design_logo: state.artwork.image,
          },
        );

        if (response.data.status) {
          toast.success("Product added to cart!");
          router.push("/cart");
        } else {
          toast.error(response.data.message || "Failed to add to cart");
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to cart");
    }
  };

  return {
    state,
    isLoading,
    isEditMode,
    handleEdit,
    handleAddToCart,
  };
};
