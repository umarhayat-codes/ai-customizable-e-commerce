export interface CheckoutContact {
  email: string;
  emailNewsletter: boolean;
}

export interface CheckoutAddress {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  saveInformation: boolean;
}

export type PaymentMethod = "credit_card" | "paypal" | "paynow";

export interface CheckoutCardDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  nameOnCard: string;
}

export interface CheckoutFormState {
  userId?: number | string;
  contact: CheckoutContact;
  delivery: CheckoutAddress;
  shippingMethod: string;
  paymentMethod: PaymentMethod;
  cardDetails: CheckoutCardDetails;
  billingAddressSameAsShipping: boolean;
  shopPhoneNumber: string;
}

export interface CartItemSummary {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customization?: string;
}

export interface CheckoutSummary {
  subtotal: number;
  shipping: number;
  taxes: number;
  total: number;
}
