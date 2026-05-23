import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Loader2, ArrowRight, Lock } from 'lucide-react';
import { PromoCode, ShippingOption, CartItemType } from '../types';
import { PROMO_CODES } from '../data/mockData';

interface OrderSummaryProps {
  subtotal: number;
  shippingOption: ShippingOption;
  activePromo: PromoCode | null;
  onApplyPromo: (code: string) => Promise<boolean>;
  onRemovePromo: () => void;
  onProceedToCheckout: () => void;
  isCartStep: boolean;
  onGoBack: () => void;
  cartItems?: CartItemType[];
  ctaText?: string;
  isCtaDisabled?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shippingOption,
  activePromo,
  onApplyPromo,
  onRemovePromo,
  onProceedToCheckout,
  isCartStep,
  onGoBack,
  cartItems = [],
  ctaText,
  isCtaDisabled = false,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Handle promo submission
  const handlePromoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    setIsValidating(true);
    setValidationError('');
    
    setTimeout(async () => {
      const isSuccess = await onApplyPromo(promoInput.toUpperCase().trim());
      setIsValidating(false);
      if (isSuccess) {
        setPromoInput('');
      } else {
        setValidationError('Invalid code or minimum spend requirement not met.');
      }
    }, 800);
  };

  const handleQuickApply = async (code: string) => {
    setIsValidating(true);
    setValidationError('');
    setPromoInput(code);

    setTimeout(async () => {
      const isSuccess = await onApplyPromo(code);
      setIsValidating(false);
      if (isSuccess) {
        setPromoInput('');
      } else {
        setValidationError('Minimum spending requirement not met for this coupon.');
      }
    }, 600);
  };

  // Calculated Rates
  let discountAmount = 0;
  if (activePromo) {
    if (activePromo.discountType === 'percentage') {
      discountAmount = (subtotal * activePromo.value) / 100;
    } else {
      discountAmount = Math.min(activePromo.value, subtotal);
    }
  }

  const shippingFee = shippingOption.price;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const formatPrice = (val: number) => {
    return `₦ ${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // RENDER METHOD 1: CHECHOUT STEP CARD (Perfect replication of user's screenshot)
  if (!isCartStep) {
    return (
      <div id="checkout-order-summary-card" className="bg-white/95 backdrop-blur-md rounded-[1.8rem] border border-[#E7DBD0]/80 p-6 md:p-7 shadow-[0_12px_40px_rgba(75,67,61,0.05)] sticky top-6 text-[#4B433D] flex flex-col gap-5">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-[#214F34] font-cormorant tracking-tight">
          Review your cart
        </h3>

        {/* Item Rows */}
        <div className="flex flex-col gap-4 max-h-[280px] overflow-y-auto pr-1">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl border border-[#E7DBD0]/50 bg-[#F7F3EE]/50 p-1.5 flex-shrink-0 overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-[#BDA38C]">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-[13px] font-bold text-[#4B433D] truncate tracking-tight font-sans">{item.name}</h4>
                <p className="text-[10px] text-[#8D8178] mt-0.5 leading-normal font-sans">
                  Colour: {item.color || 'Default'}<br />
                  x{item.quantity}
                </p>
              </div>
              <span className="text-xs sm:text-[13px] font-bold text-[#4B433D] font-sans whitespace-nowrap ml-auto">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Divider line */}
        <div className="border-b border-[#E7DBD0]/60" />

        {/* Breakdown Values */}
        <div className="flex flex-col gap-3.5 text-xs sm:text-[13px] font-sans font-semibold text-gray-400 select-none">
          <div className="flex justify-between items-center text-[#8D8178]">
            <span>Subtotal</span>
            <span className="font-bold text-[#4B433D]">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center text-[#8D8178]">
            <span>Discount</span>
            <span className="font-bold text-[#4B433D]">{formatPrice(discountAmount)}</span>
          </div>

          <div className="flex justify-between items-center text-[#8D8178]">
            <span>Promo code</span>
            <span className="font-bold text-[#4B433D]">
              {activePromo ? `-${formatPrice(discountAmount)}` : '₦ 0.00'}
            </span>
          </div>

          <div className="flex justify-between items-center text-[#8D8178]">
            <span>Delivery</span>
            <span className="font-bold text-[#4B433D]">{formatPrice(shippingFee)}</span>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-b border-[#E7DBD0]/60" />

        {/* Total Row */}
        <div className="flex justify-between items-center text-sm select-none font-sans">
          <span className="text-[#8D8178] font-extrabold uppercase text-xs tracking-wider">Total</span>
          <span className="font-black text-xl sm:text-2xl text-[#214F34] tracking-tight">
            {formatPrice(total)}
          </span>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={onProceedToCheckout}
          disabled={subtotal === 0 || isCtaDisabled}
          className="w-full bg-[#214F34] hover:bg-[#2d5d41] text-white font-extrabold py-3.5 rounded-full text-xs sm:text-sm tracking-[0.03em] transition-all cursor-pointer shadow-xs active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-sans select-none"
        >
          {ctaText || 'Make Payment'}
        </button>

        {/* SSL Protection Badging */}
        <div className="flex gap-2.5 items-start bg-transparent pt-1 select-none font-sans">
          <Lock className="w-4 h-4 text-[#5F8A5E] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h5 className="text-[11px] font-bold text-[#4B433D] leading-tight">
              Secure Checkout - SSL Encrypted
            </h5>
            <p className="text-[9px] text-[#8D8178] leading-normal mt-0.5 font-medium">
              Ensuring your personal and financial details are secure during every transaction.
            </p>
          </div>
        </div>

      </div>
    );
  }

  // RENDER METHOD 2: ORIGINAL SHOPPING CART VIEW STATE
  return (
    <div id="order-summary-card" className="relative h-fit overflow-hidden rounded-[1.8rem] border border-[#E7DBD0]/80 shadow-[0_12px_40px_rgba(75,67,61,0.06)] sticky top-6">
      
      {/* LEAF BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[#DCD2C3]/96" />

      {/* CONTENT */}
      <div className="relative p-6 md:p-7 flex flex-col gap-5 z-10 text-[#4B433D]">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#214F34] font-cormorant border-b border-[#B8AA9D]/30 pb-3">
          Order Summary
        </h2>

        {/* SUMMARY ENTRIES */}
        <div className="flex flex-col gap-4 text-xs sm:text-[13px] font-sans font-bold">
          <div className="flex justify-between items-center text-gray-600">
            <span>Subtotal</span>
            <span className="text-[#4B433D]">
              ₦ {subtotal.toLocaleString()}
            </span>
          </div>

          {/* Discount Line */}
          <AnimatePresence>
            {activePromo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-between items-center text-[#16914A] overflow-hidden"
              >
                <span>Coupon Applied ({activePromo.code})</span>
                <span>
                  - ₦ {discountAmount.toLocaleString()}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shipping */}
          <div className="flex justify-between items-center text-gray-600">
            <span>Delivery Charge</span>
            <span className="text-[#4B433D]">
              {shippingFee === 0 ? (
                <span className="text-[#16914A] font-extrabold text-[10px] uppercase bg-[#5F8A5E]/10 px-2.5 py-1 rounded-md">FREE</span>
              ) : (
                `₦ ${shippingFee.toLocaleString()}`
              )}
            </span>
          </div>

          {/* Total Display */}
          <div className="border-t border-[#B8AA9D]/40 pt-4 mt-2">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-extrabold text-[#4F4740] text-xs sm:text-[13px] block tracking-[0.03em] uppercase font-sans">Total</span>
                <span className="text-[9px] text-[#9A9087] font-sans tracking-tight block font-medium">Tax and duties inclusive</span>
              </div>
              <motion.span
                layout
                id="grand-total-display"
                className="font-black text-xl sm:text-2xl text-[#214F34] font-sans tracking-tight"
              >
                ₦ {total.toLocaleString()}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Promo Code Input widgets */}
        {isCartStep && (
          <div className="mt-2 border-t border-[#B8AA9D]/30 pt-4 flex flex-col gap-2.5">
            <h4 className="text-[10px] sm:text-[11px] font-sans font-extrabold text-[#60574F] tracking-wider uppercase flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#5F8A5E]" />
              Promo Deals & Coupons
            </h4>

            {activePromo ? (
              <div className="flex items-center justify-between bg-white/70 border border-[#E6DACE] p-2 rounded-xl">
                <div className="min-w-0">
                  <span className="font-sans tracking-tight font-bold text-xs text-[#214F34] block">{activePromo.code}</span>
                  <span className="text-[10px] text-[#5F8A5E] truncate block">{activePromo.description}</span>
                </div>
                <button
                  onClick={onRemovePromo}
                  className="text-[10px] font-bold text-[#FF6464] hover:bg-rose-50 px-2 py-1 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <div className="flex flex-1 items-center rounded-full bg-white px-4 py-2 bg-white/90 border border-[#E6DACE] focus-within:border-[#5F8A5E] transition">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    disabled={isValidating}
                    className="w-full bg-transparent text-[11px] font-medium outline-none text-[#4B433D] placeholder:text-[#B4AAA1] font-sans tracking-tight"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isValidating || !promoInput.trim()}
                  className="rounded-full bg-[#214F34] hover:bg-[#39644A] disabled:bg-gray-300 px-5 py-2.5 text-xs font-bold text-white transition-all shadow-xs cursor-pointer active:scale-95 disabled:scale-100 flex items-center justify-center min-w-[70px]"
                >
                  {isValidating ? <Loader2 className="w-3 h-3 animate-spin text-white" /> : 'Apply'}
                </button>
              </form>
            )}

            {validationError && (
              <p className="text-[10px] text-[#FF6464] font-medium">{validationError}</p>
            )}

            {/* Suggested Tags */}
            {!activePromo && (
              <div className="mt-1">
                <p className="text-[9px] text-[#9A9087] mb-1.5 font-medium">Tap quick code to apply:</p>
                <div className="flex flex-wrap gap-1.5">
                  {PROMO_CODES.map((p) => {
                    const isEligible = subtotal >= (p.minSpend || 0);
                    return (
                      <button
                        key={p.code}
                        type="button"
                        onClick={() => handleQuickApply(p.code)}
                        disabled={isValidating}
                        className={`text-[9px] font-sans tracking-tight font-bold px-2.5 py-1 rounded-full border transition-all ${
                          isEligible
                            ? 'bg-[#EFE7DD] text-[#4F4740] border-[#E6DACE] hover:bg-[#214F34] hover:text-white cursor-pointer opacity-100'
                            : 'bg-white/40 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                        }`}
                        title={p.description}
                      >
                        {p.code} ({p.discountType === 'percentage' ? `${p.value}%` : `₦${p.value.toLocaleString()}`})
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={onProceedToCheckout}
            disabled={subtotal === 0 || isCtaDisabled}
            className="w-full rounded-full bg-[#214F34] hover:bg-[#39644A] text-white font-bold py-3.5 text-sm tracking-[0.03em] transition-all cursor-pointer shadow-md active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 font-sans"
          >
            <span>{isCartStep ? 'Go to Checkout' : 'Place Secure Order'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isCartStep && (
            <button
              onClick={onGoBack}
              className="text-center text-xs font-semibold text-[#7D746D] hover:text-[#5F8A5E] py-1.5 transition-all font-sans"
            >
              Review My Items
            </button>
          )}
        </div>

        {/* Secure seal */}
        <div className="border-t border-[#B8AA9D]/20 pt-3 flex items-center justify-center gap-4 text-[#9A9087] text-[10px] font-medium leading-none select-none font-sans">
          <span className="flex items-center gap-1">🛡️ Protected Transaction</span>
        </div>

      </div>
    </div>
  );
};
