"use client";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { useCategoryHook } from "@/hooks/useCategoryHook";
import CategoryCard from "@/components/common/CategoryCard";
import { IoIosArrowDown } from "react-icons/io";
import CardPolices from "@/components/common/CardPolices";
import { PolicyItem } from "@/types/Category.types";
import CustomizeCard from "@/components/common/CustomizeCard";

import { shirtData } from "@/data/products";

const policiesData: PolicyItem[] = [
  {
    title: "Free Premium Shipping",
    description: "Free ground shipping on orders of $99 or more in the U.S.",
  },
  {
    title: "Free Returns in 14 Days",
    description:
      "We offer a generous 14-day return policy, allowing you to shop with confidence.",
  },
  {
    title: "Product Protection",
    description:
      "Your product is protected against manufacturing defects for a worry-free purchase experience.",
  },
];

export default function ShirtPage() {
  const { handleProductClick } = useCategoryHook();

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main>
        {/* Hero Section: Customize Caps - No padding, flush with top/sides */}
        <section className="w-full">
          <Image
            src="/images/hoodies/hero-section-hoodies.png"
            alt="Your Hoodies Your Design"
            width={1920}
            height={715}
            className="w-full object-cover max-h-[715px]"
            priority
          />
        </section>
        {/* Product Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 py-4 border-y border-gray-100 font-noto-sans-sc text-[#4A4A4A]">
            <div className="flex items-center gap-8 text-[14px] md:text-[16px]">
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                Color <IoIosArrowDown />
              </button>
              <div className="flex items-center gap-3">
                <span>In stock only</span>
                <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8 text-[14px] md:text-[16px]">
              <span>7 products</span>
              <button className="flex items-center gap-2 hover:opacity-70 transition-opacity font-medium">
                Sort by: <span className="font-bold">price</span>{" "}
                <IoIosArrowDown />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 ">
            {shirtData.map((shirt, index) => (
              <CategoryCard
                key={index}
                {...shirt}
                titleFont="var(--font-noto-sans-sc)"
                descriptionFont="var(--font-adlam-display)"
                priceFont="var(--font-noto-sans-sc)"
                onClick={() => handleProductClick(shirt.id)}
              />
            ))}
          </div>
        </div>
        {/* Policy Section */}
        <CardPolices policies={policiesData} />

        {/* Customize Section */}
        <CustomizeCard
          image="/images/shirt/customize-shirt.png"
          heading="Find Your Perfect Shirt"
          subtext="Design your shirt your way — upload your own design, preview it in real time, or let AI create one for you."
          buttonText="Customize Your Shirt Now"
          bgColor="var(--color-caps-right-bg)"
          leftCardBg="var(--color-caps-left-bg)"
          headingColor="var(--color-caps-heading)"
          subtextColor="var(--color-caps-subtext)"
          buttonBgColor="var(--color-caps-btn-bg)"
          buttonBorderColor="var(--color-caps-btn-border)"
          headingFont="var(--font-noto-sans-sc)"
          subtextFont="var(--font-inter)"
          onClick={() => handleProductClick("casual-oversized-tee")}
          // alignment="center"
        />
      </main>
      <Footer />
    </div>
  );
}
