"use client";

import { useState, useMemo, useEffect } from "react";
import { CartItem, CartSummary, UseCartReturn } from "@/types/Cart.types";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slice/AuthSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const useCartHook = (): UseCartReturn => {
  const [previewItem, setPreviewItem] = useState<CartItem | null>(null);
  const user = useSelector(selectUser);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openPreview = (item: CartItem) => {
    setPreviewItem(item);
  };

  const closePreview = () => {
    setPreviewItem(null);
  };

  const fetchCartItems = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/product/get-cart/${user.id}`,
      );
      if (response.data.status) {
        const mappedItems: CartItem[] = response.data.data.map((item: any) => ({
          id: item.id.toString(),
          name: item.title,
          color: item.color,
          print: item.description, // Reusing description as print for now
          size: item.size,
          quantity: item.quantity,
          price: parseFloat(item.price.replace(/[^0-9.]/g, "")),
          image: item.image,
          product_id: item.product_id || null,
          design_logo: item.design_logo,
          includesCustomization: item.is_customized === 1,
        }));
        setItems(mappedItems);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const summary = useMemo<CartSummary>(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    // As per user request: add 5 price in customization, add 8 for estimate shipping
    const customizationCharges = items.length > 0 ? 5.0 : 0;
    const shipping = items.length > 0 ? 8.0 : 0;
    const total = subtotal + customizationCharges + shipping;

    return {
      subtotal,
      customizationCharges,
      shipping,
      total,
    };
  }, [items]);

  const updateQuantity = (id: string, newQuantity: number) => {
    // Note: In a real app, you'd also update the backend
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item,
      ),
    );
  };

  const removeItem = async (id: string) => {
    if (!user) return;
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/product/delete-cart-item?user_id=${user.id}&item_id=${id}`,
      );
      if (response.data.status) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        toast.success("Product removed from cart successfully");
      } else {
        toast.error(response.data.message || "Failed to remove product");
        console.error("Failed to delete item:", response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting cart item");
      console.error("Error deleting cart item:", error);
    }
  };

  const editItem = (item: CartItem) => {
    if (!item.product_id) {
      toast.error("This item cannot be edited (missing product info)");
      return;
    }

    if (item.includesCustomization) {
      // Customized product → go to customize page
      router.push(`/customize?id=${item.product_id}&cart_item_id=${item.id}`);
    } else {
      // Non-customized product → go to product detail page
      router.push(
        `/productDetail?id=${item.product_id}&cart_item_id=${item.id}`,
      );
    }
  };

  return {
    items,
    summary,
    previewItem,
    updateQuantity,
    removeItem,
    editItem,
    openPreview,
    closePreview,
  };
};

export default useCartHook;
