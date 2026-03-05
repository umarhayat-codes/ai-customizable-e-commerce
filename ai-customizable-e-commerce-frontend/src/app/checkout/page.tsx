"use client";

import Link from "next/link";
import Header from "@/components/common/Header";
import {
  IoChevronDown,
  IoPencil,
  IoSearch,
  IoCheckmarkCircle,
  IoLockClosed,
  IoHelpCircleOutline,
} from "react-icons/io5";
import { FiSmartphone } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from "react-icons/fa";
import { SiKlarna } from "react-icons/si";
import { useCheckOutHook } from "@/hooks/useCheckOutHook";
import CheckOutInput from "@/components/shared/CheckOutInput";
import CheckOutCard from "@/components/shared/CheckOutCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckOutPage = () => {
  const {
    formState,
    cartItems,
    summary,
    loading,
    handleContactChange,
    handleDeliveryChange,
    handlePaymentMethodChange,
    handleCardDetailsChange,
    handleBillingToggle,
    handleShopPhoneChange,
    handleSubmit,
  } = useCheckOutHook();

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-[var(--color-checkout-bg)] font-[var(--font-checkout-main)] text-[var(--color-checkout-text)] overflow-x-hidden">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] relative">
          {/* Left Side - Form */}
          <div className="p-6 lg:p-12 space-y-10 bg-[var(--color-checkout-bg)] z-10">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold tracking-tight">
                Checkout
              </h1>
              <IoPencil className="w-5 h-5 cursor-pointer text-[var(--color-checkout-text-muted)]" />
            </header>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Contact Section */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-medium">Contact</h2>
                  <div className="text-sm font-medium underline cursor-pointer">
                    Log in
                  </div>
                </div>
                <CheckOutInput
                  placeholder="Email or mobile phone number"
                  value={formState.contact.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                />
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={formState.contact.emailNewsletter}
                      onChange={(e) =>
                        handleContactChange("emailNewsletter", e.target.checked)
                      }
                    />
                    <div className="w-5 h-5 border rounded border-[var(--color-checkout-border)] peer-checked:bg-[var(--color-checkout-accent)] peer-checked:border-[var(--color-checkout-accent)] transition-all"></div>
                    <IoCheckmarkCircle className="absolute text-white w-4 h-4 opacity-0 peer-checked:opacity-100 left-0.5" />
                  </div>
                  <span className="text-sm text-[var(--color-checkout-text-muted)]">
                    Email me with news and offers
                  </span>
                </label>
              </section>

              {/* Delivery Section */}
              <section className="space-y-4">
                <h2 className="text-xl font-medium">Delivery</h2>

                <div className="space-y-4">
                  <div className="relative">
                    <select
                      className="w-full px-3 py-3 border rounded-md outline-none bg-[var(--color-checkout-input-bg)] border-[var(--color-checkout-border)] appearance-none cursor-pointer focus:border-[var(--color-checkout-accent)]"
                      value={formState.delivery.country}
                      onChange={(e) =>
                        handleDeliveryChange("country", e.target.value)
                      }
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="Other">Other</option>
                    </select>
                    <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-checkout-text-muted)] pointer-events-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <CheckOutInput
                      placeholder="First name"
                      value={formState.delivery.firstName}
                      onChange={(e) =>
                        handleDeliveryChange("firstName", e.target.value)
                      }
                    />
                    <CheckOutInput
                      placeholder="Last name"
                      value={formState.delivery.lastName}
                      onChange={(e) =>
                        handleDeliveryChange("lastName", e.target.value)
                      }
                    />
                  </div>

                  <CheckOutInput
                    placeholder="Address"
                    value={formState.delivery.address}
                    onChange={(e) =>
                      handleDeliveryChange("address", e.target.value)
                    }
                  />

                  <CheckOutInput
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formState.delivery.apartment}
                    onChange={(e) =>
                      handleDeliveryChange("apartment", e.target.value)
                    }
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <CheckOutInput
                      placeholder="City"
                      className="col-span-1"
                      value={formState.delivery.city}
                      onChange={(e) =>
                        handleDeliveryChange("city", e.target.value)
                      }
                    />
                    <div className="relative col-span-1">
                      <select
                        className="w-full px-3 py-2.5 border rounded-md outline-none bg-[var(--color-checkout-input-bg)] border-[var(--color-checkout-border)] appearance-none cursor-pointer focus:border-[var(--color-checkout-accent)] text-sm"
                        value={formState.delivery.state}
                        onChange={(e) =>
                          handleDeliveryChange("state", e.target.value)
                        }
                      >
                        <option value="">State / territory</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                      </select>
                      <IoChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-checkout-text-muted)] pointer-events-none" />
                    </div>
                    <CheckOutInput
                      placeholder="Postal code"
                      className="col-span-1"
                      value={formState.delivery.postalCode}
                      onChange={(e) =>
                        handleDeliveryChange("postalCode", e.target.value)
                      }
                    />
                  </div>

                  <div className="relative">
                    <CheckOutInput
                      placeholder="Phone"
                      value={formState.delivery.phone}
                      onChange={(e) =>
                        handleDeliveryChange("phone", e.target.value)
                      }
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center p-1.5 rounded-full hover:bg-gray-100 cursor-pointer">
                      <IoSearch className="w-4 h-4 text-[var(--color-checkout-text-muted)]" />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={formState.delivery.saveInformation}
                        onChange={(e) =>
                          handleDeliveryChange(
                            "saveInformation",
                            e.target.checked,
                          )
                        }
                      />
                      <div className="w-5 h-5 border rounded border-[var(--color-checkout-border)] peer-checked:bg-[var(--color-checkout-accent)] peer-checked:border-[var(--color-checkout-accent)] transition-all"></div>
                      <IoCheckmarkCircle className="absolute text-white w-4 h-4 opacity-0 peer-checked:opacity-100 left-0.5" />
                    </div>
                    <span className="text-sm text-[var(--color-checkout-text-muted)]">
                      Save this information for next time
                    </span>
                  </label>
                </div>
              </section>

              {/* Shipping Section */}
              <section className="space-y-4">
                <h2 className="text-xl font-medium">Shipping method</h2>
                <div className="p-4 rounded-md bg-[var(--color-checkout-sidebar-bg)] border border-[var(--color-checkout-border)] flex justify-between items-center">
                  <span className="text-sm text-[var(--color-checkout-text-muted)]">
                    Enter your shipping address to view shipping quotes.
                  </span>
                  <IoPencil className="w-4 h-4 text-[var(--color-checkout-text-muted)]" />
                </div>
              </section>

              {/* Payment Section - To be implemented next */}
              <section className="space-y-4 pb-12">
                <h2 className="text-xl font-medium">Payment</h2>
                <p className="text-sm text-[var(--color-checkout-text-muted)]">
                  All transactions are secure and encrypted.
                </p>

                <div className="border rounded-lg divide-y bg-white overflow-hidden">
                  {/* Credit Card Option */}
                  <div
                    className={`p-4 cursor-pointer transition-colors ${formState.paymentMethod === "credit_card" ? "bg-[#f4f4f4]" : ""}`}
                    onClick={() => handlePaymentMethodChange("credit_card")}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formState.paymentMethod === "credit_card" ? "border-black" : "border-gray-300"}`}
                        >
                          {formState.paymentMethod === "credit_card" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-black" />
                          )}
                        </div>
                        <span className="text-sm font-medium">Credit card</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                          <FaCcVisa className="text-[#1A1F71] w-8 h-8" />
                        </div>
                        <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                          <FaCcMastercard className="text-[#EB001B] w-8 h-8" />
                        </div>
                        <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm">
                          <FaCcAmex className="text-[#007BC1] w-8 h-8" />
                        </div>
                        <div className="w-10 h-6 bg-white border border-gray-200 rounded flex items-center justify-center shadow-sm text-[10px] font-bold text-gray-400">
                          +4
                        </div>
                      </div>
                    </div>

                    {formState.paymentMethod === "credit_card" && (
                      <div className="mt-4 grid grid-cols-2 gap-4 animate-in fade-in duration-300">
                        <div className="col-span-2 relative">
                          <CheckOutInput
                            placeholder="Card number"
                            value={formState.cardDetails.cardNumber}
                            onChange={(e) =>
                              handleCardDetailsChange(
                                "cardNumber",
                                e.target.value,
                              )
                            }
                          />
                          <IoLockClosed className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-checkout-text-muted)]" />
                        </div>
                        <CheckOutInput
                          placeholder="Expiration date (MM/YY)"
                          value={formState.cardDetails.expirationDate}
                          onChange={(e) =>
                            handleCardDetailsChange(
                              "expirationDate",
                              e.target.value,
                            )
                          }
                        />
                        <div className="relative">
                          <CheckOutInput
                            placeholder="Security code"
                            value={formState.cardDetails.cvv}
                            onChange={(e) =>
                              handleCardDetailsChange("cvv", e.target.value)
                            }
                          />
                          <IoHelpCircleOutline className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-checkout-text-muted)]" />
                        </div>
                        <CheckOutInput
                          placeholder="Name on card"
                          className="col-span-2"
                          value={formState.cardDetails.nameOnCard}
                          onChange={(e) =>
                            handleCardDetailsChange(
                              "nameOnCard",
                              e.target.value,
                            )
                          }
                        />
                        <label className="col-span-2 flex items-center gap-2 cursor-pointer group">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={formState.billingAddressSameAsShipping}
                              onChange={handleBillingToggle}
                            />
                            <div className="w-5 h-5 border rounded bg-black border-black transition-all"></div>
                            <IoCheckmarkCircle className="absolute text-white w-4 h-4 opacity-100 left-0.5" />
                          </div>
                          <span className="text-sm font-medium">
                            Use shipping address as billing address
                          </span>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Other Payment Methods */}
                  <div
                    className={`p-4 cursor-pointer flex justify-between items-center ${formState.paymentMethod === "paypal" ? "bg-[#f4f4f4]" : ""}`}
                    onClick={() => handlePaymentMethodChange("paypal")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formState.paymentMethod === "paypal" ? "border-black" : "border-gray-300"}`}
                      >
                        {formState.paymentMethod === "paypal" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-black" />
                        )}
                      </div>
                      <span className="text-sm font-medium">PayPal</span>
                    </div>
                    <div className="flex font-bold italic text-lg tracking-tighter">
                      <span className="text-[#003087]">Pay</span>
                      <span className="text-[#009cde]">Pal</span>
                    </div>
                  </div>

                  <div
                    className={`p-4 cursor-pointer flex justify-between items-center border-b-0 ${formState.paymentMethod === "paynow" ? "bg-[#f4f4f4]" : ""}`}
                    onClick={() => handlePaymentMethodChange("paynow")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formState.paymentMethod === "paynow" ? "border-black" : "border-gray-300"}`}
                      >
                        {formState.paymentMethod === "paynow" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-black" />
                        )}
                      </div>
                      <span className="text-sm font-medium">
                        Klarna - Flexible payments
                      </span>
                    </div>
                    <div className="bg-[#FFB3C7] px-2 py-1 rounded text-[10px] font-bold text-black uppercase">
                      Klarna
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4 pt-6">
                <h2 className="text-xl font-medium">Remember me</h2>
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-white">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          defaultChecked
                        />
                        <div className="w-5 h-5 border rounded bg-black border-black peer-checked:bg-black peer-checked:border-black transition-all"></div>
                        <IoCheckmarkCircle className="absolute text-white w-4 h-4 opacity-100 peer-checked:opacity-100 left-0.5" />
                      </div>
                      <span className="text-sm font-medium">
                        Save my information for a faster checkout with a Shop
                        account
                      </span>
                    </label>
                  </div>

                  <div className="p-4 bg-[#f4f4f4] border-t border-gray-100">
                    <div className="bg-white p-4 rounded-md border border-gray-200 flex items-center gap-4">
                      <div className="text-gray-400">
                        <FiSmartphone size={24} />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                          Mobile phone number
                        </span>
                        <input
                          type="tel"
                          className="text-sm font-medium text-black bg-transparent border-none outline-none w-full"
                          value={formState.shopPhoneNumber}
                          onChange={(e) =>
                            handleShopPhoneChange(e.target.value)
                          }
                          placeholder="+1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[var(--color-checkout-btn-bg)] text-[var(--color-checkout-btn-text)] rounded-md font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Pay now"
                )}
              </button>
              <div className="text-center py-4 text-xs text-[var(--color-checkout-text-muted)] border-t">
                All rights reserved Bootcampwise Technoset
              </div>
            </form>
          </div>

          {/* Right Side - Summary */}
          <div className="p-6 lg:p-12 space-y-8 relative z-0">
            <div className="absolute inset-y-0 left-0 -right-[2000px] bg-[var(--color-checkout-sidebar-bg)] -z-10" />
            <div className="relative z-10 space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 relative">
                  <div className="w-16 h-16 bg-white border rounded-md overflow-hidden relative group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    {item.customization && (
                      <p className="text-xs text-[var(--color-checkout-text-muted)]">
                        {item.customization}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-medium">
                    Rs {item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <CheckOutInput
                placeholder="Discount code or gift card"
                className="flex-1"
              />
              <button className="px-5 py-2.5 bg-gray-200 text-gray-500 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors">
                Apply
              </button>
            </div>

            <div className="space-y-3 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-checkout-text-muted)]">
                  Subtotal
                </span>
                <span className="font-medium">
                  Rs {summary.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-checkout-text-muted)]">
                  Shipping
                </span>
                <div className="flex items-center gap-1">
                  <IoSearch className="w-3 h-3 text-[var(--color-checkout-text-muted)]" />
                  <span className="text-xs text-[var(--color-checkout-text-muted)]">
                    Enter address
                  </span>
                  <span className="font-medium ml-2">
                    Rs {summary.shipping.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-checkout-text-muted)]">
                  Estimated taxes
                </span>
                <span className="font-medium">
                  Rs {summary.taxes.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-4">
                <span>Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-normal text-[var(--color-checkout-text-muted)]">
                    PKR
                  </span>
                  <span>Rs {summary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
