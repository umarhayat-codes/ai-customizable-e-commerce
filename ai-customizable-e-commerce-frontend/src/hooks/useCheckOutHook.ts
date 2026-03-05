import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useReduxHook from "@/hooks/useReduxHook";
import {
  CheckoutFormState,
  CheckoutContact,
  CheckoutAddress,
  PaymentMethod,
  CheckoutCardDetails,
  CartItemSummary,
  CheckoutSummary,
} from "@/types/CheckOut.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const useCheckOutHook = () => {
  const { user } = useReduxHook();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<CheckoutFormState>({
    userId: user?.id,
    contact: {
      email: user?.email || "",
      emailNewsletter: false,
    },
    delivery: {
      country: "Pakistan",
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ").slice(1).join(" ") || "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      saveInformation: false,
    },
    shippingMethod: "standard",
    paymentMethod: "credit_card",
    cardDetails: {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
      nameOnCard: "",
    },
    billingAddressSameAsShipping: true,
    shopPhoneNumber: "+1",
  });

  // Update userId and contact email if user changes
  useEffect(() => {
    if (user) {
      setFormState((prev) => ({
        ...prev,
        userId: user.id,
        contact: { ...prev.contact, email: prev.contact.email || user.email },
        delivery: {
          ...prev.delivery,
          firstName: prev.delivery.firstName || user.name?.split(" ")[0] || "",
          lastName:
            prev.delivery.lastName ||
            user.name?.split(" ").slice(1).join(" ") ||
            "",
        },
      }));
    }
  }, [user]);

  // Mock cart items for UI demonstration as per the image
  const [cartItems] = useState<CartItemSummary[]>([
    {
      id: "1",
      name: "Black Hoodie",
      price: 15.0,
      image: "/images/black-hoodies.png",
      quantity: 1,
      customization: "L",
    },
  ]);

  const [summary] = useState<CheckoutSummary>({
    subtotal: 15.0,
    shipping: 10.0,
    taxes: 0.0,
    total: 25.0,
  });

  const handleContactChange = (field: keyof CheckoutContact, value: any) => {
    setFormState((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleDeliveryChange = (field: keyof CheckoutAddress, value: any) => {
    setFormState((prev) => ({
      ...prev,
      delivery: { ...prev.delivery, [field]: value },
    }));
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setFormState((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  const handleCardDetailsChange = (
    field: keyof CheckoutCardDetails,
    value: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      cardDetails: { ...prev.cardDetails, [field]: value },
    }));
  };

  const handleBillingToggle = () => {
    setFormState((prev) => ({
      ...prev,
      billingAddressSameAsShipping: !prev.billingAddressSameAsShipping,
    }));
  };

  const handleShopPhoneChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      shopPhoneNumber: value,
    }));
  };

  const validateForm = () => {
    // Contact Section
    if (!formState.contact.email) {
      toast.error("Please fill out email/phone number in contact section");
      return false;
    }

    // Delivery Section
    const { firstName, lastName, address, city, state, postalCode } =
      formState.delivery;
    if (!firstName || !lastName || !address || !city || !state || !postalCode) {
      toast.error(
        "Please fill out all required fields in the delivery section",
      );
      return false;
    }

    // Payment method
    if (formState.paymentMethod === "credit_card") {
      const { cardNumber, expirationDate, cvv, nameOnCard } =
        formState.cardDetails;
      if (!cardNumber || !expirationDate || !cvv || !nameOnCard) {
        toast.error("Please fill out all credit card details");
        return false;
      }
    }

    // Remember me section
    if (!formState.shopPhoneNumber) {
      toast.error("Please fill out mobile number in Remember me section");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/checkout`, formState);
      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred during checkout",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
