"use client";

import React from "react";
import Link from "next/link";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";
import { NavItem } from "@/types/Header.types";
import Model from "../model/Model";
import useReduxHook from "@/hooks/useReduxHook";

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#", hasDropdown: true },
  { label: "Trending Product", href: "/cateories/trendings" },
  { label: "Contact", href: "/contact" },
];

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { logout, isAuthenticated } = useReduxHook();

  return (
    <header className="relative w-full flex flex-col font-inter">
      {/* Top Banner */}
      <div className="w-full bg-header-top-bg py-3 px-4 flex justify-center items-center">
        <p className="text-header-btn-text text-[10px] sm:text-xs font-bold tracking-widest text-center uppercase">
          Free US Ground shipping on orders of $99 or more.
        </p>
      </div>

      {/* Main Header */}
      <div className="w-full bg-header-main-bg border-b border-header-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-pacifico text-header-text"
            >
              CustomaX
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.label === "Shop") {
                      setIsModalOpen(true);
                    }
                  }}
                  className="text-sm font-poppins font-medium text-header-text flex items-center hover:opacity-70 transition-opacity cursor-pointer"
                >
                  {item.label}
                  <FiChevronDown className="ml-1 text-xs" />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-poppins font-medium text-header-text flex items-center hover:opacity-70 transition-opacity cursor-pointer"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button className="text-header-text hover:opacity-70 transition-opacity">
              <FiSearch className="text-xl sm:text-2xl" />
            </button>
            <button className="text-header-text hover:opacity-70 transition-opacity">
              <FiUser className="text-xl sm:text-2xl" />
            </button>
            <button className="relative text-header-text hover:opacity-70 transition-opacity">
              <FiShoppingBag className="text-xl sm:text-2xl" />
              {/* Optional: Add badge count here */}
            </button>

            {/* Language Selector / Logout Button */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="hidden sm:flex items-center bg-header-btn-bg text-header-btn-text px-4 py-2 rounded-sm cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-sm font-poppins font-medium uppercase">
                  Logout
                </span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center bg-header-btn-bg text-header-btn-text px-4 py-2 rounded-sm cursor-pointer hover:opacity-90 transition-opacity">
                <span className="text-sm font-noto-sans-sc font-medium">
                  US
                </span>
                <FiChevronDown className="ml-2 text-xs" />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-header-text">
              <FiMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Integration */}
      <Model isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
