"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/common/Card";

import CardFeather from "@/components/common/CardFeather";
import ImageSection from "@/components/shared/Image";
import CardReview from "@/components/common/CardReview";
import CustomizeCard from "@/components/common/CustomizeCard";
import {
  FaTshirt,
  FaCloudUploadAlt,
  FaEye,
  FaPalette,
  FaCheckCircle,
} from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/cateories/${category.toLowerCase()}`);
  };

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        {/* Section 1: Hero */}
        <section className="w-full">
          {/* <ImageSection
            imageSrc="/images/u-product-u-design-1.png"
            title="Your Product, Your Design"
            description="Customize, create, and preview your perfect product before you order. Our AI assistant helps you design products that match your unique style."
            buttonText="Start Customizing"
            secondaryButtonText="Watch Demo"
            bgColor="#ffffff"
            titleColor="var(--color-hero-text)"
            descriptionColor="var(--color-hero-text)"
            buttonBgColor="var(--color-hero-btn-primary-bg)"
            buttonTextColor="var(--color-hero-btn-primary-text)"
            secondaryButtonBgColor="var(--color-hero-btn-secondary-bg)"
            secondaryButtonTextColor="var(--color-hero-btn-secondary-text)"
          /> */}
          <Image
            src="/images/u-product-u-design.png"
            alt="Your Product Your Design"
            width={1920}
            height={615}
            className="w-full object-cover max-h-[715px]"
            priority
          />
        </section>

        {/* Section 2: Product Categories */}
        <section className="max-w-[1240px] mx-auto py-16 px-4">
          <h2 className="font-poppins text-[32px] font-bold text-center mb-12">
            Explore Products Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <Link href="/cateories/hoodies">
              <Card image="/images/white-hoodies.png" title="Hoodies" />
            </Link>
            <Link href="/cateories/shirt">
              <Card
                image="/images/black-hoodies.png"
                title="Hoodies"
                label="Sold out"
                labelBg="#000000"
              />
            </Link>
            <Link href="/cateories/shoes">
              <Card image="/images/boot-hoodies.png" title="Hoodies" />
            </Link>
            <Link href="/cateories/caps">
              <Card
                image="/images/bag-hoodies.png"
                title="Hoodies"
                label="New In"
                labelBg="#ffd700"
              />
            </Link>
            <Link href="/cateories/caps">
              <Card image="/images/cap-hoodies.png" title="Caps" />
            </Link>
            <Link href="/cateories/phone">
              <Card
                image="/images/phone-cases.png"
                title="Phone Cases"
                label="Sold out"
                labelBg="#000000"
              />
            </Link>
            <Link href="/cateories/trendings">
              <Card image="/images/cups.png" title="Cups" />
            </Link>
          </div>
        </section>

        {/* Section 3: Apply Design */}
        <section className="w-full bg-[#f8f9fb]">
          <Image
            src="/images/apply-design.png"
            alt="Apply Your Design"
            width={1920}
            height={805}
            className="w-full object-cover max-h-[805px]"
          />
        </section>
        {/* Section 4: Customize Before You Buy */}
        <section className="max-w-[1240px] mx-auto py-20 px-4">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#1E1F28] mb-12 max-w-[500px]">
            Customize Before You Buy – <br />
            Your Product, Your Way
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardFeather
              icon={<FaTshirt />}
              title="Wide Product Selection"
              description="From hoodies and t-shirts to sneakers, mugs, tote bags, and caps – pick any product to start customizing."
            />
            <CardFeather
              icon={<FaCloudUploadAlt />}
              title="Upload or Generate AI Design"
              description="Upload your artwork, logos, or prints, or simply drag and place them exactly where you want."
            />
            <CardFeather
              icon={<FaEye />}
              title="Real-Time Mockup Preview"
              description="See your creation come to life instantly on realistic product mockups before you order."
            />
            <CardFeather
              icon={<FaPalette />}
              title="Fine-Tune Every Detail"
              description="Adjust colors, patterns, and placements until your product is exactly as you imagined."
            />
            <CardFeather
              icon={<FaCheckCircle />}
              title="Place Order"
              description="Finalize your design and place your order with confidence – every product is uniquely yours."
            />
          </div>
        </section>

        {/* Section 5: Popular Custom Designs */}

        <ImageSection
          imageSrc="/images/popular-custom-design.png"
          category="Shirts"
          title="Popular Custom Designs"
          buttonText="Explore Now"
          bgColor="#ffffff"
          titleColor="#1a1a1a"
          categoryColor="#1a1a1a"
          buttonBgColor="#1a1a1a"
          buttonTextColor="#ffffff"
          onCategoryClick={() => handleCategoryClick("shirt")}
        />

        {/* Section 6: Shoes & Hoodies Categories */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-10">
          <ImageSection
            imageSrc="/images/shoes-categories.png"
            category="Shoes"
            title="Design your shoes your way, unlimited style."
            buttonText="Customize Now"
            bgColor="var(--color-category-card-bg)"
            categoryColor="var(--color-category-card-text-dark)"
            titleColor="var(--color-category-card-text-dark)"
            buttonBgColor="var(--color-category-card-btn-bg-dark)"
            buttonTextColor="var(--color-category-card-text-light)"
            onCategoryClick={() => handleCategoryClick("shoes")}
          />
          <ImageSection
            imageSrc="/images/hoodies-categories.png"
            category="Hoodies"
            title="Customize your hoodie with your design, unlimited creativity, style."
            buttonText="Customize Now"
            bgColor="var(--color-category-card-bg)"
            categoryColor="var(--color-category-card-text-light)"
            titleColor="var(--color-category-card-text-light)"
            buttonBgColor="var(--color-category-card-btn-bg-light)"
            buttonTextColor="var(--color-category-card-text-dark)"
            onCategoryClick={() => handleCategoryClick("hoodies")}
          />
        </section>

        {/* Section 7: Review Cards */}
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

        {/* Section 8: Customize Your Exclusive Product */}
        <CustomizeCard
          image="/images/customize-product.png"
          heading="Create Your Exclusive Product Now"
          subtext="Upload, design, and preview your product fully before placing your order."
          buttonText="Start Customizing"
        />
      </main>

      <Footer />
    </div>
  );
}
