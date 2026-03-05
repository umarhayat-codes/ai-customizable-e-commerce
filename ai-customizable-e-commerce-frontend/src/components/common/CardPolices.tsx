"use client";

import React from "react";
import { CardPolicesProps } from "@/types/Category.types";

const CardPolices: React.FC<CardPolicesProps> = ({
  policies,
  backgroundColor = "var(--color-policy-bg)",
  titleColor = "var(--color-policy-title)",
  descriptionColor = "var(--color-policy-desc)",
  titleFont = "font-noto-sans-sc",
  descriptionFont = "font-inter",
}) => {
  return (
    <section
      style={{ backgroundColor }}
      className="w-full py-10 md:py-14 lg:max-h-[210px] flex items-center justify-center"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
          {policies.map((policy, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <h3
                className={`uppercase ${titleFont} text-[12px] md:text-[14px] font-medium mb-2`}
                style={{ color: titleColor }}
              >
                {policy.title}
              </h3>
              <p
                className={`${descriptionFont} font-semibold text-[14px]  max-w-[300px] leading-relaxed`}
                style={{ color: descriptionColor }}
              >
                {policy.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardPolices;
