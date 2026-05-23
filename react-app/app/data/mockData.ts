import { ProductType, CartItemType, PromoCode, ShippingOption, Address } from '../types';

export const cartItems: CartItemType[] = [
  {
    id: 1,
    name: "JBL Headphones",
    color: "Purple",
    price: 80000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600",
  },
  {
    id: 2,
    name: "Travel Backpack",
    color: "Beige",
    price: 35000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600",
  },
  {
    id: 3,
    name: "Yoga Mat(Non-Slip)",
    color: "Pink",
    price: 6500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600",
  },
  {
    id: 4,
    name: "Face Cleanser",
    color: "Clear",
    price: 20000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600",
  },
];

export const recommendedProducts: ProductType[] = [
  {
    id: 10,
    name: "Gaming Mouse",
    description: "High precision mouse, RGB lighting",
    price: 25000,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600",
    rating: 4.8,
    category: "Gadgets",
    color: "Tech Black"
  },
  {
    id: 11,
    name: "Graphic Shirt",
    description: "Comfortable, fashionable wearable",
    price: 20000,
    image: "/assets/images/graphic_shirt_1779455308407.png",
    rating: 4.6,
    category: "Apparel",
    color: "Vintage Black"
  },
  {
    id: 12,
    name: "Hair Clippers Kit",
    description: "Complete grooming set",
    price: 65000,
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600",
    rating: 4.9,
    category: "Grooming",
    color: "Silver Steel"
  },
  {
    id: 13,
    name: "Smart LED Bulb",
    description: "Adjustable brightness and colors",
    price: 30000,
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=600",
    rating: 4.5,
    category: "Home Gear",
    color: "Intelligent RGB"
  },
  {
    id: 14,
    name: "Wall Stickers",
    description: "Glow in the dark stickers",
    price: 22000,
    image: "/assets/images/wall_stickers_1779456119109.png",
    rating: 4.4,
    category: "Decor",
    color: "Phosphor Teal"
  },
  {
    id: 15,
    name: "Reading Lamp",
    description: "Comfort, high quality lighting",
    price: 12000,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600",
    rating: 4.7,
    category: "Home Gear",
    color: "Oak Wood Frame"
  },
  {
    id: 16,
    name: "Coffee Grinder",
    description: "For smooth coffee experience",
    price: 39000,
    image: "/assets/images/coffee_grinder_1779455288556.png",
    rating: 4.8,
    category: "Kitchen",
    color: "Matte Black"
  },
  {
    id: 17,
    name: "Acrylic Nail Set",
    description: "Complete DIY kit for nail styling",
    price: 53000,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600",
    rating: 4.6,
    category: "Beauty",
    color: "Nude Sparkle"
  },
];

export const recentlyViewed: ProductType[] = [
  {
    id: 20,
    name: "Gaming Mouse",
    description: "High precision mouse, RGB lighting",
    price: 25000,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600",
    rating: 4.8,
  },
  {
    id: 21,
    name: "Reading Lamp",
    description: "Comfort, high quality lighting",
    price: 12000,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600",
    rating: 4.7,
  },
  {
    id: 22,
    name: "Coffee Grinder",
    description: "For smooth coffee experience",
    price: 39000,
    image: "/assets/images/coffee_grinder_1779455288556.png",
    rating: 4.8,
  },
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'VALE20',
    discountType: 'percentage',
    value: 20,
    description: 'Get a 20% Coupon today!',
  },
  {
    code: 'SPRING10',
    discountType: 'percentage',
    value: 10,
    description: '10% discount on order totals above ₦50,000.',
  },
  {
    code: 'FESTIVE5K',
    discountType: 'fixed',
    value: 5000,
    minSpend: 60000,
    description: 'Flat ₦5,000 discount on select premium orders.',
  }
];

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'ship-std',
    name: 'Standard Doorstep Courier',
    price: 1500,
    eta: '3-5 business days',
    description: 'Protected eco courier handling.',
  },
  {
    id: 'ship-exp',
    name: 'Premium Air Express',
    price: 8000,
    eta: '1-2 business days',
    description: 'Priority flight logistics dispatch.',
  }
];

export const SAVED_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    label: 'Home Destination',
    fullName: 'Elsie Mbama',
    street: '14 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos State',
    zipCode: '105102',
    phone: '+234 812 345 6789',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Corporate studio',
    fullName: 'Elsie Mbama',
    street: '8 Kingsway Road, Ikoyi',
    city: 'Lagos',
    state: 'Lagos State',
    zipCode: '101233',
    phone: '+234 905 555 1234',
    isDefault: false,
  }
];
