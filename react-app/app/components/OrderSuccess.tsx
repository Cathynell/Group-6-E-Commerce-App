import React from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, MapPin, Truck, ShoppingCart } from 'lucide-react';
import { Address, ShippingOption, PromoCode, CartItemType } from '../types';

interface OrderSuccessProps {
  orderItems: CartItemType[];
  selectedAddress: Address;
  selectedShipping: ShippingOption;
  activePromo: PromoCode | null;
  subtotal: number;
  onContinueShopping: () => void;
  onGoBackToCart: () => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({
  orderItems,
  selectedAddress,
  selectedShipping,
  activePromo,
  subtotal,
  onContinueShopping,
  onGoBackToCart,
}) => {
  const orderNumber = `VALE-${Math.floor(100000 + Math.random() * 900000)}`;
  
  let discountAmount = 0;
  if (activePromo) {
    if (activePromo.discountType === 'percentage') {
      discountAmount = (subtotal * activePromo.value) / 100;
    } else {
      discountAmount = Math.min(activePromo.value, subtotal);
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + selectedShipping.price);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto bg-white/80 border border-[#E7DBD0] rounded-[2rem] p-6 md:p-9 text-center my-6 flex flex-col items-center gap-6 shadow-[0_15px_40px_rgba(75,67,61,0.04)]"
      id="order-success-screen"
    >
      {/* Pop animated green check circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.25, 1] }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="w-16 h-16 rounded-full bg-[#5F8A5E]/10 text-[#214F34] flex items-center justify-center border border-[#5F8A5E]/20 shadow-sm"
      >
        <Check className="w-8 h-8 stroke-[3]" />
      </motion.div>

      <div className="space-y-2">
        <span className="text-[10px] font-sans font-extrabold uppercase tracking-tight text-[#214F34] bg-[#FFE7DD]/30 px-3 py-1.5 rounded-full border border-[#E7DBD0]/40">
          Payment Processed Secured
        </span>
        <h2 className="font-cormorant font-bold text-[#4B433D] text-2xl md:text-3xl tracking-tight">
          Thank you for your order, {selectedAddress.fullName.split(' ')[0]}!
        </h2>
        <p className="text-[#8D8178] text-xs max-w-sm mx-auto font-sans font-medium leading-relaxed">
          We have dispatched your invoice summary and package routing details to <span className="text-[#214F34] font-bold font-sans tracking-tight">elsiembama9@gmail.com</span>.
        </p>
      </div>

      {/* Structured Receipt style overlay */}
      <div className="w-full bg-[#FBF9F6] border border-[#E7DBD0]/60 rounded-2xl p-5 text-left flex flex-col gap-4">
        
        <div className="flex justify-between items-center text-[10px] text-[#9A8F86] font-sans tracking-tight border-b border-[#EEE2D7]/60 pb-2.5">
          <span>Order REF: <span className="font-bold text-[#4B433D] font-sans tracking-tight">{orderNumber}</span></span>
          <span>Date: {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Deliver block */}
        <div className="flex gap-3">
          <MapPin className="w-4 h-4 text-[#5F8A5E] flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-sans font-bold text-[#4B433D] block">Delivery Location</span>
            <span className="text-[#8D8178] mt-0.5 block leading-relaxed">
              {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
            </span>
          </div>
        </div>

        {/* Shipping details */}
        <div className="flex gap-3 pt-3 border-t border-[#EEE2D7]/50">
          <Truck className="w-4 h-4 text-[#5F8A5E] flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-sans font-bold text-[#4B433D] block">Logistics Partner</span>
            <span className="text-[#8D8178] mt-0.5 block">
              {selectedShipping.name} &bull; Expected <span className="text-[#214F34] font-bold">{selectedShipping.eta}</span>
            </span>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="pt-3 border-t border-[#EEE2D7] text-xs text-[#8D8178] space-y-2">
          
          <div className="flex justify-between font-sans tracking-tight">
            <span>Subtotal Items</span>
            <span className="text-[#4B433D] font-bold">₦ {subtotal.toLocaleString()}</span>
          </div>
          
          {activePromo && (
            <div className="flex justify-between font-sans tracking-tight text-[#16914A]">
              <span>Coupon Savings ({activePromo.code})</span>
              <span>- ₦ {discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between font-sans tracking-tight">
            <span>Courier Dispatch</span>
            <span className="text-[#4B433D] font-bold">
              {selectedShipping.price === 0 ? 'FREE' : `₦ ${selectedShipping.price.toLocaleString()}`}
            </span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-[#EEE2D7] text-sm text-[#4B433D] font-bold font-sans">
            <span>Verified Paid Amount</span>
            <span className="font-sans text-base text-[#16914A] font-extrabold tracking-tight">₦ {grandTotal.toLocaleString()}</span>
          </div>

        </div>

      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={onContinueShopping}
          id="success-continue-shopping"
          className="w-full sm:flex-1 bg-[#214F34] hover:bg-[#39644A] text-white font-bold py-3.5 rounded-full cursor-pointer transition-all active:scale-98 text-xs tracking-tight"
        >
          Continue Shopping
        </button>
        <button
          onClick={onGoBackToCart}
          id="success-go-to-cart"
          className="w-full sm:flex-1 border border-[#E6DACE] hover:border-[#214F34] bg-white text-[#4F4740] py-3.5 rounded-full transition-all font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4 text-[#5F8A5E]" />
          Go back to cart
        </button>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-[#9A8F86] mt-2 font-medium font-sans">
        <ShieldCheck className="w-3.5 h-3.5 text-[#5F8A5E] animate-pulse" />
        Encrypted Transaction Secure SSL Gate
      </div>
    </motion.div>
  );
};
