"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { allProducts } from "@/data/products";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/redux/slice/AuthSlice";
import { setProductDetails } from "@/redux/slice/CustomizeSlice";
import { ColorOption } from "@/types/Detail.types";

export const useProductDetailHook = (
  imageCount: number,
  colors: ColorOption[],
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [customizeLoading, setCustomizeLoading] = useState(false);

  const productId = searchParams.get("id");
  const cartItemId = searchParams.get("cart_item_id");
  const isEditMode = !!cartItemId;

  const product = allProducts.find((p) => p.id === productId);

  const productData = product || {
    id: "none",
    image: "",
    title: "Product Not Found",
    price: "$ 0.00",
    description: "The requested product could not be found.",
  };

  // Pre-fill color and size when in edit mode
  useEffect(() => {
    if (!isEditMode || !user || !cartItemId || !colors) return;

    const fetchCartItemData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/product/get-cart/${user.id}`,
        );
        if (response.data.status) {
          const cartItem = response.data.data.find(
            (item: any) => item.id.toString() === cartItemId,
          );
          if (cartItem) {
            // Pre-fill color: find matching color option by name
            const matchingColor = Array.isArray(colors)
              ? colors.find((c) => c.name === cartItem.color)
              : undefined;
            if (matchingColor) {
              setSelectedColor(matchingColor.id);
            }
            // Pre-fill size
            if (cartItem.size) {
              setSelectedSize(cartItem.size);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching cart item for edit:", error);
      }
    };

    fetchCartItemData();
  }, [isEditMode, user, cartItemId, colors]);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % imageCount);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  const setIndex = (index: number) => {
    setActiveIndex(index);
  };

  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen);
  const toggleReviews = () => setIsReviewsOpen(!isReviewsOpen);

  const addToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size before adding to cart");
      return;
    }

    if (!user) {
      toast.error("Please sign in to add products to your cart");
      return;
    }

    const selectedColorData = colors.find((c) => c.id === selectedColor);

    setCartLoading(true);
    try {
      if (isEditMode && cartItemId) {
        // UPDATE existing cart item
        const response = await axios.put(
          `http://127.0.0.1:8000/product/update-cart-item/${cartItemId}`,
          {
            user_id: user.id,
            color: selectedColorData?.name || "Selected Color",
            size: selectedSize,
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
            product_id: productData.id,
            image: productData.image,
            title: productData.title,
            description: productData.description || "No description provided",
            price: productData.price,
            color: selectedColorData?.name || "Selected Color",
            size: selectedSize,
            quantity: 1,
          },
        );

        if (response.data.status) {
          toast.success(response.data.message || "Product added to cart!");
          router.push("/cart");
        } else {
          toast.error(response.data.message || "Failed to add product to cart");
        }
      }
    } catch (error: any) {
      console.error("Add to cart error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while adding to cart",
      );
    } finally {
      setCartLoading(false);
    }
  };

  const handleStartCustomizing = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error(
        "Please select both color and size before starting customization",
      );
      return;
    }

    if (!user) {
      toast.error("Please sign in to customize products");
      return;
    }

    setCustomizeLoading(true);
    try {
      const selectedColorData = colors.find((c) => c.id === selectedColor);
      const response = await axios.post(
        "http://127.0.0.1:8000/customize-product/customize-product",
        {
          user_id: user.id,
          product_id: productData.id,
          image: productData.image,
          title: productData.title,
          price: productData.price,
          color: selectedColorData?.name || "Selected Color",
          size: selectedSize,
          design_logo: null,
          placement_data: null,
          quantity: 1,
        },
      );

      if (response.data.status) {
        dispatch(
          setProductDetails({
            id: productData.id,
            title: productData.title,
            price: productData.price,
            image: productData.image,
            color: selectedColorData?.value || "#000000",
            colorName: selectedColorData?.name || "Selected Color",
            size: selectedSize || "M",
          }),
        );
        router.push(`/customize?id=${productData.id}`);
      } else {
        toast.error(
          response.data.message || "Failed to save customization details",
        );
      }
    } catch (error: any) {
      console.error("Customize error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while starting customization",
      );
    } finally {
      setCustomizeLoading(false);
    }
  };

  return {
    productData,
    activeIndex,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    isDetailsOpen,
    toggleDetails,
    isReviewsOpen,
    toggleReviews,
    nextImage,
    prevImage,
    setIndex,
    addToCart,
    handleStartCustomizing,
    cartLoading,
    customizeLoading,
    isEditMode,
  };
};
