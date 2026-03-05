export interface CartItem {
  id: string;
  name: string;
  color: string;
  print: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
  product_id: string | null;
  design_logo: string | null;
  includesCustomization: boolean;
}

export interface CartSummary {
  subtotal: number;
  customizationCharges: number;
  shipping: number;
  total: number;
}

export interface UseCartReturn {
  items: CartItem[];
  summary: CartSummary;
  previewItem: CartItem | null;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => Promise<void>;
  editItem: (item: CartItem) => void;
  openPreview: (item: CartItem) => void;
  closePreview: () => void;
}
