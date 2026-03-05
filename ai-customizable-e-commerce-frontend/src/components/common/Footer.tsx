"use client";

import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa6";
import { FooterSection, SocialIcon } from "@/types/Footer.types";

const Footer: React.FC = () => {
  const shopLinks: FooterSection = {
    title: "SHOP",
    links: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Trending products", href: "/trending" },
      { label: "Contact", href: "/contact" },
    ],
  };

  const supportLinks: FooterSection = {
    title: "CUSTOMER SUPPORT",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  };

  const socialIcons: SocialIcon[] = [
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "Facebook", icon: FaFacebookF, href: "#" },
    { name: "TikTok", icon: FaTiktok, href: "#" },
  ];

  return (
    <footer className="font-inter bg-footer-bg text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Col 1: Brand */}
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl text-white font-pacifico">CustomaX</h2>
          <p className="text-white/80 leading-relaxed max-w-xs">
            Design, customize, and order products exactly the way you imagine.
          </p>
        </div>

        {/* Col 2: Shop */}
        <div>
          <h3 className="text-lg font-bold mb-6 tracking-wide">
            {shopLinks.title}
          </h3>
          <ul className="flex flex-col gap-4">
            {shopLinks.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Customer Support */}
        <div>
          <h3 className="text-lg font-bold mb-6 tracking-wide">
            {supportLinks.title}
          </h3>
          <ul className="flex flex-col gap-4">
            {supportLinks.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Stay Updated */}
        <div>
          <h3 className="text-lg font-bold mb-6 tracking-wide">STAY UPDATED</h3>
          <p className="text-white/80 mb-6 font-inter">
            New drops, trends, and exclusive offers.
          </p>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Your email"
                className="w-full font-inter bg-footer-input-bg border border-footer-border py-3 px-4 rounded-sm text-white placeholder:text-text-white/40 focus:outline-none focus:border-text-white/40 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-text-white text-black font-semibold py-3 rounded-sm hover:bg-text-white/90 transition-colors"
              style={{ fontFamily: "Inter" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Border Line */}
      <div className="w-full h-[1px] bg-footer-border mb-8"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-text-white/60 text-sm font-inter">
          © 2025. All Rights Reserved
        </p>
        <div className="flex gap-4">
          {socialIcons.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-text-white text-black hover:bg-text-white/90 transition-all shadow-sm"
                aria-label={social.name}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
