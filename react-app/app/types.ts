export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  category?: string;
  color?: string;
  inStock?: boolean;
};

export type CartItemType = {
  id: number;
  name: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
};

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend?: number;
  description: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  eta: string;
  description: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault?: boolean;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  saveCard: boolean;
}

export type CheckoutStep = 'cart' | 'shipping-payment' | 'payment-selection' | 'completed';
