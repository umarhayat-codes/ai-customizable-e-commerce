"use client";

import { useRouter } from "next/navigation";

export const useCategoryHook = () => {
  const router = useRouter();

  const handleProductClick = (productId: string) => {
    router.push(`/productDetail?id=${productId}`);
  };

  return {
    handleProductClick,
  };
};
