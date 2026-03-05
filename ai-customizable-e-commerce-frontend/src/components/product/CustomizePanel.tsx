"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiMinus,
  FiUploadCloud,
} from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { CustomizePanelProps } from "@/types/Customization.type";
import { IoColorWandOutline } from "react-icons/io5";

const CustomizePanel: React.FC<CustomizePanelProps> = ({
  state,
  onUpdate,
  onGenerateAI,
  onRefreshSuggestions,
  isLoading,
}) => {
  const [openSection, setOpenSection] = useState<string | null>("BaseColor");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const colors = [
    { name: "Gunmetal", value: "#2C3E50" },
    { name: "Lavender", value: "#B19CD9" },
    { name: "Tan", value: "#D2B48C" },
    { name: "Charcoal", value: "#333333" },
    { name: "White", value: "#FFFFFF" },
  ];

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onUpdate({ uploadedDesign: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-8 w-full p-6 bg-white rounded-2xl  h-fit">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Design Studio</h1>
        <p className="text-gray-500 mt-1">Create your perfect shirt.</p>
      </div>

      {/* Upload Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Upload Design</h2>
        <div
          onClick={handleBrowseClick}
          className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-gray-100/50 transition-all cursor-pointer group"
        >
          <div className="p-4 rounded-full bg-white shadow-sm transition-transform group-hover:scale-110">
            <FiUploadCloud size={32} className="text-gray-600" />
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-800">Drag & drop your design</p>
            <p className="text-xs text-gray-400 mt-1">PNG, PDF up to 10MB</p>
          </div>
          <button className="px-6 py-2 bg-[#1a1a1a] text-white rounded-md text-sm font-medium hover:bg-black transition-colors mt-2">
            Browse Files
          </button>
        </div>
      </div>

      {/* AI Prompt Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Ask AI for Design Suggestions
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Describe your vision or choose a style, and let AI create unique
            designs for you.
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 space-y-4 border border-gray-200">
          <textarea
            className="w-full h-24 bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
            placeholder="Describe your ideal design and style... e.g., 'A minimalist geometric pattern with earth tones'."
            value={state.aiPrompt}
            onChange={(e) => onUpdate({ aiPrompt: e.target.value })}
          />
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">
              Quick suggestions:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Best color combo",
                "Minimal design",
                "Streetwear style",
                "Vintage aesthetic",
              ].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 bg-white border border-gray-100 rounded-md text-[10px] font-semibold text-gray-700 hover:bg-gray-100 shadow-sm"
                  onClick={() => onUpdate({ aiPrompt: tag })}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onGenerateAI}
            className="w-full py-3 bg-[#1e1f28] text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={!state.aiPrompt || !state.aiPrompt.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <HiOutlineRefresh className="animate-spin" size={18} />
                Generating...
              </>
            ) : (
              "Generate Design"
            )}
          </button>
        </div>
      </div>

      {/* AI Generated Suggestions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            AI Generated Suggestions
          </h2>
          <button
            onClick={onRefreshSuggestions}
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Generate More
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {state.suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 border-opacity-50"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
            >
              <div className="aspect-square bg-[#F9F9F9] rounded-xl overflow-hidden relative border border-gray-50">
                <img
                  src={suggestion.image}
                  alt="AI Suggestion"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {suggestion.description ||
                  "Geometric minimalism with balanced proportions"}
              </p>
              <div className="flex gap-2 mt-auto">
                <button
                  className="flex-1 py-2.5 bg-[#1e1f28] text-white rounded-lg text-sm font-bold hover:bg-black transition-colors"
                  onClick={() => onUpdate({ uploadedDesign: suggestion.image })}
                >
                  Apply
                </button>
                <button className="p-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <HiOutlineRefresh size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Section */}
      <div className="space-y-2 border-t border-gray-100 pt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Color</h2>

        {/* Base Color Accordion */}
        <div className="border-b border-gray-100 pb-2">
          <button
            onClick={() => toggleSection("BaseColor")}
            className="flex items-center justify-between w-full py-2 group"
          >
            <span className="text-sm font-medium text-gray-700">
              Base Color
            </span>
            {openSection === "BaseColor" ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {openSection === "BaseColor" && (
            <div className="flex items-center gap-3 py-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => onUpdate({ baseColor: color.value })}
                  className={`w-6 h-6 rounded-full border border-gray-200 relative ${state.baseColor === color.value ? "ring-2 ring-black ring-offset-2" : ""}`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
              <div className="w-px h-6 bg-gray-200 mx-1" />
              <button className="text-gray-400 hover:text-gray-900">
                <IoColorWandOutline size={22} />
              </button>
            </div>
          )}
        </div>

        {/* Sleeves Accordion */}
        <div className="border-b border-gray-100 pb-2">
          <button
            onClick={() => toggleSection("Sleeves")}
            className="flex items-center justify-between w-full py-2"
          >
            <span className="text-sm font-medium text-gray-700">Sleeves</span>
            {openSection === "Sleeves" ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>

        {/* Accents Accordion */}
        <div className="border-b border-gray-100 pb-2">
          <button
            onClick={() => toggleSection("Accents")}
            className="flex items-center justify-between w-full py-2"
          >
            <span className="text-sm font-medium text-gray-700">Accents</span>
            {openSection === "Accents" ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>

      {/* Placement Controls Section */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Placement Controls
          </h2>
          <FiChevronDown />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 w-16">
              Position
            </span>
            <div className="flex gap-2">
              <button className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
                <FaArrowUp size={14} />
              </button>
              <button className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
                <FaArrowDown size={14} />
              </button>
              <button className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
                <FaArrowLeft size={14} />
              </button>
              <button className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
                <FaArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Rotate</span>
            </div>
            <input
              type="range"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              min="0"
              max="360"
              value={state.placement.rotate}
              onChange={(e) =>
                onUpdate({
                  placement: {
                    ...state.placement,
                    rotate: parseInt(e.target.value),
                  },
                })
              }
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Scale</span>
            </div>
            <input
              type="range"
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              min="0.5"
              max="2"
              step="0.1"
              value={state.placement.scale}
              onChange={(e) =>
                onUpdate({
                  placement: {
                    ...state.placement,
                    scale: parseFloat(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePanel;
