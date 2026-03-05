"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import Card from "@/components/common/Card";
import CustomizeCard from "@/components/common/CustomizeCard";
import { ITrendingCustomizeCardProps } from "@/types/Trending.types";
import CardReview from "@/components/common/CardReview";
import { useCategoryHook } from "@/hooks/useCategoryHook";
import { trendingData } from "@/data/products";

export default function TrendingsPage() {
  return (
    <div className="bg-white">
      <Header />
      <main className="min-h-screen">
        {/* Hero Section: Customize trending*/}
        <section className="w-full">
          <Image
            src="/images/trending/trending-customize.png"
            alt="Your Product Your trending"
            width={1920}
            height={715}
            className="w-full object-cover max-h-[715px]"
            priority
          />
        </section>

        {/* Trending Now Section */}
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <h2 className="font-poppins text-[32px] md:text-[40px] font-semibold text-trending-heading mb-10">
            Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingData.map((product, index) => (
              <Card
                key={index}
                image={product.image}
                title={product.title}
                price={product.price}
                label={product.label}
                labelBg={product.labelType === "sold" ? "#4A4A4A" : "#FFD700"}
                titleFont="font-inter"
                priceFont="font-noto-sans-sc"
                titleColor="text-trending-text"
                priceColor="text-trending-text"
              />
            ))}
          </div>
        </section>

        {/* Trending Customize Section */}
        <CustomizeCard
          image="/images/trending/trending-shop.png"
          heading="Step Into the Hottest Sneakers"
          subtext="Trending now — customize your style, preview your design, and shop confidently."
          price="$120"
          buttonText="Shop This"
          // bgColor="var(--color-trending-customize-bg)"
          leftCardBg="#111111"
          imageFit="cover"
          headingColor="var(--color-trending-customize-heading)"
          subtextColor="var(--color-trending-customize-subtext)"
          priceColor="var(--color-trending-customize-price)"
          buttonBgColor="#1e1f28"
          buttonBorderColor="var(--color-trending-customize-btn-border)"
          headingFont="var(--font-poppins)"
          subtextFont="var(--font-inter)"
          priceFont="var(--font-inter)"
        />

        <section className="w-full">
          <Image
            src="/images/trending/hero-section-trending-2.png"
            alt="Your Product Your trending"
            width={1920}
            height={586}
            className="w-full object-cover max-h-[586px]"
            priority
          />
        </section>

        <section className="bg-white py-20 px-4">
          <div className="max-w-[1240px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
              <h2 className="font-poppins text-[30px] md:text-[30px] font-bold leading-[1.2] text-[#1a1a1a] max-w-[400px]">
                Real Designs. Real <br /> Reviews.
              </h2>
              <p className="font-inter text-[16px] text-[#4b4b55] max-w-[480px] md:text-right">
                See how customers turn simple ideas into{" "}
                <span className="font-semibold">premium, fully customized</span>{" "}
                products with the help of AI-powered design generation, smart
                color suggestions, and real-time previews.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              <CardReview
                image="/images/review-1.png"
                rating={4}
                text="My hoodie turned out perfect! The AI design suggestions made customization easy."
                customerName="Ayesha K."
              />
              <CardReview
                image="/images/review-2.png"
                rating={5}
                text="I ordered 2 mugs and the AI suggestions helped me design them perfectly. Both were delivered exactly as I created!"
                customerName="Zainab M."
              />
              <CardReview
                image="/images/review-3.png"
                rating={5}
                text="I customized my cap exactly how I wanted it, and it arrived perfectly! The fit and colors are spot on."
                customerName="Omar S."
              />
            </div>

            {/* View More Button */}
            <div className="flex justify-end">
              <button className="bg-[#2b2b35] text-white px-8 py-3 font-inter font-medium hover:bg-black transition-colors">
                View More
              </button>
            </div>
          </div>
        </section>

        <CustomizeCard
          image="/images/shoes/create-perfect-shoes.png"
          heading="Create Your Perfect Pair"
          subtext="Customize your shoes in real-time. Choose colors, patterns, and add your personal touch."
          buttonText="Customize Your Shoe Now"
          bgColor="var(--color-caps-right-bg)"
          //   leftCardBg="var(--color-caps-left-bg)"
          headingColor="var(--color-caps-heading)"
          subtextColor="var(--color-caps-subtext)"
          buttonBgColor="var(--color-caps-btn-bg)"
          buttonBorderColor="var(--color-caps-btn-border)"
          headingFont="var(--font-noto-sans-sc)"
          subtextFont="var(--font-inter)"
          // alignment="center"
        />
      </main>

      <Footer />
    </div>
  );
}
