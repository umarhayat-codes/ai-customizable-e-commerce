"use client";

import React, { useState } from "react";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { ContactFormValues } from "@/types/Contact.types";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormValues>({
    fullName: "",
    email: "",
    orderId: "",
    message: "",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-white px-4 py-12 md:py-20 md:px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-x-12 gap-y-12">
            {/* Title Section */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 tracking-tight">
                We're Here To Help
              </h1>
              <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                Our dedicated support team is available to assist you with any
                questions about your order, customization options, or account.
              </p>
            </div>

            {/* Left Side: Contact Form */}
            <div className="space-y-8">
              <form className="space-y-5 max-w-xl">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border border-gray-300 rounded-sm p-4 text-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 rounded-sm p-4 text-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Order ID (Optional)"
                    className="w-full border border-gray-300 rounded-sm p-4 text-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                    value={formData.orderId}
                    onChange={(e) =>
                      setFormData({ ...formData, orderId: e.target.value })
                    }
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Message"
                    rows={6}
                    className="w-full border border-gray-300 rounded-sm p-4 text-black focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1a1b24] text-white py-4 rounded-sm font-medium hover:bg-black transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Side: Info Card */}
            <div className="flex flex-col">
              <div className="bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-sm p-10 space-y-12">
                {/* Call Us Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-black p-3.5 rounded-full shrink-0 flex items-center justify-center">
                      <IoCallOutline className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-black">Call To Us</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-base leading-relaxed">
                      We are available 24/7, 7 days a week.
                    </p>
                    <p className="text-black font-semibold text-lg">
                      Phone: +8801611112222
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Write Us Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-black p-3.5 rounded-full shrink-0 flex items-center justify-center">
                      <IoMailOutline className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      Write To Us
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-base leading-relaxed">
                      Fill out our form and we will contact you within 24 hours.
                    </p>
                    <p className="text-black font-semibold text-base">
                      Emails: support@exclusive.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
