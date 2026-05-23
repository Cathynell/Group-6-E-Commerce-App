"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Sparkles, 
  Undo2, 
  CheckCircle2, 
  Info,
  Heart,
  Eye,
  Search,
  Home,
  ShoppingCart,
  User
} from 'lucide-react';

import { CartItemType, ProductType, PromoCode, ShippingOption, Address, PaymentInfo, CheckoutStep } from '../types';
import { cartItems as INITIAL_CART_ITEMS, recommendedProducts as RECOMMENDED_PRODUCTS, recentlyViewed as RECENTLY_VIEWED_ITEMS, SAVED_ADDRESSES, SHIPPING_OPTIONS, PROMO_CODES } from '../data/mockData';
import { CartItemCard } from '../components/CartItemCard';
import { SavedItemCard } from '../components/SavedItemCard';
import { ProductCard } from '../components/ProductCard';
import { OrderSummary } from '../components/OrderSummary';
import { CheckoutForm } from '../components/CheckoutForm';
import { PaymentOptions } from '../components/PaymentOptions';
import { OrderSuccess } from '../components/OrderSuccess';

export default function App() {
  // --- Cart Systems & Database State ---
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => INITIAL_CART_ITEMS);
  const [savedItems, setSavedItems] = useState<CartItemType[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavFilter, setActiveNavFilter] = useState<'all' | 'deals' | 'new-in'>('all');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // --- Filtered catalog based on Search Query & Navigation Filters ---
  const filteredProducts = RECOMMENDED_PRODUCTS.filter(prod => {
    // 1. Filter by Nav Bar Filter Selects
    if (activeNavFilter === 'deals') {
      // Products with price under 25,000 NGN are categorized as exceptional Vale Shopping deals
      if (prod.price > 25000) return false;
    } else if (activeNavFilter === 'new-in') {
      // Newly imported luxury items are IDs: 10, 11, and 15
      const isNewPiece = [10, 11, 15].includes(prod.id);
      if (!isNewPiece) return false;
    }

    // 2. Filter by Search Query
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return prod.name.toLowerCase().includes(query) || 
           prod.description.toLowerCase().includes(query) ||
           (prod.category && prod.category.toLowerCase().includes(query)) ||
           (prod.color && prod.color.toLowerCase().includes(query));
  });

  // --- Handlers for interactive navigation links ---
  const handleGoHome = () => {
    setActiveNavFilter('all');
    setSearchQuery('');
    setCheckoutStep('cart');
  };

  const handleDealsClick = () => {
    setActiveNavFilter('deals');
    setSearchQuery('');
    setCheckoutStep('cart');
    // Auto-apply promo discount
    const promo = PROMO_CODES.find(p => p.code === 'VALE20');
    if (promo) {
      setActivePromo(promo);
    }
  };

  const handleNewInClick = () => {
    setActiveNavFilter('new-in');
    setSearchQuery('');
    setCheckoutStep('cart');
  };

  // --- Shipping & Payment Configurations ---
  const [selectedAddress, setSelectedAddress] = useState<Address>(SAVED_ADDRESSES[0]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);
  const [activePromo, setActivePromo] = useState<PromoCode | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveCard: true
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('wallet');

  // --- Dynamic Built-In Toast Message Banner Alerts ---
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Interactive Operations --
  const handleUpdateQuantity = (id: number, newQty: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
    showToast('Cart quantities synchronized.', 'success');
  };

  const handleRemoveItem = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    setCartItems(prev => prev.filter(i => i.id !== id));
    if (item) {
      showToast(`Removed "${item.name}" from your bag.`, 'info');
    }
  };

  const handleSaveForLater = (item: CartItemType) => {
    if (savedItems.some(s => s.id === item.id)) {
      showToast('Item already saved for later in your wish list.', 'info');
      return;
    }
    setCartItems(prev => prev.filter(i => i.id !== item.id));
    setSavedItems(prev => [...prev, item]);
    showToast(`"${item.name}" added to saved wish list.`, 'success');
  };

  const handleMoveToCart = (item: CartItemType) => {
    setSavedItems(prev => prev.filter(i => i.id !== item.id));
    setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    showToast(`"${item.name}" restored successfully to shopping cart.`, 'success');
  };

  const handleRemoveFromSaved = (id: number) => {
    const item = savedItems.find(i => i.id === id);
    setSavedItems(prev => prev.filter(i => i.id !== id));
    if (item) {
      showToast(`Removed from saved list: "${item.name}"`, 'info');
    }
  };

  const handleAddToCartFromRecommendations = (product: ProductType) => {
    const existing = cartItems.find(i => i.id === product.id);
    if (existing) {
      handleUpdateQuantity(product.id, existing.quantity + 1);
    } else {
      setCartItems(prev => [...prev, {
        id: product.id,
        name: product.name,
        color: product.color || 'Standard',
        price: product.price,
        quantity: 1,
        image: product.image
      }]);
    }
    showToast(`Added "${product.name}" to cart.`, 'success');
    if (checkoutStep === 'completed') {
      setCheckoutStep('cart');
    }
  };

  // --- Promo codes solver ---
  const handleApplyPromo = async (code: string): Promise<boolean> => {
    const promo = PROMO_CODES.find(p => p.code === code);
    if (!promo) return false;

    if (promo.minSpend && subtotal < promo.minSpend) {
      return false;
    }

    setActivePromo(promo);
    showToast(`Coupon "${promo.code}" applied successfully!`, 'success');
    return true;
  };

  const handleRemovePromo = () => {
    setActivePromo(null);
    showToast('Promo discount revoked.', 'info');
  };

  // --- Reset simulation loop ---
  const handleResetDemoState = () => {
    setCartItems(INITIAL_CART_ITEMS);
    setSavedItems([]);
    setActivePromo(null);
    setCheckoutStep('cart');
    setSearchQuery('');
    setActiveNavFilter('all');
    setSelectedAddress(SAVED_ADDRESSES[0]);
    setSelectedShipping(SHIPPING_OPTIONS[0]);
    setPaymentInfo({ cardNumber: '', cardName: '', expiry: '', cvv: '', saveCard: true });
    setSelectedPaymentMethod('wallet');
    setAgreedToTerms(false);
    showToast('Shopping cart returned just bought items.', 'success');
  };

  const handleContinueShopping = () => {
    setCartItems([]);
    setCheckoutStep('cart');
    setAgreedToTerms(false);
    showToast("Your cart was cleared. Let's continue exploring luxury pieces.", 'success');
  };

  const handleGoBackToCart = () => {
    setCartItems([]);
    setCheckoutStep('cart');
    setAgreedToTerms(false);
    showToast('Your cart has been cleared. Let\'s continue exploring luxury pieces.', 'info');
  };

  // --- Calculated numbers ---
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const displayQuantity = checkoutStep === 'completed' ? 0 : cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const displaySubtotal = checkoutStep === 'completed' ? 0 : subtotal;

  // --- Navigation & Flow triggers ---
  const handleNextStep = () => {
    if (checkoutStep === 'cart') {
      if (cartItems.length === 0) {
        showToast('Please add items before entering checkout.', 'info');
        return;
      }
      setCheckoutStep('shipping-payment');
      showToast('Secure checkout initiated.', 'success');
    } else if (checkoutStep === 'shipping-payment') {
      if (!agreedToTerms) {
        showToast('Please read and agree to our Terms & Conditions to proceed to payment.', 'info');
        return;
      }
      setCheckoutStep('payment-selection');
      showToast('Select your preferred payment option.', 'success');
    } else if (checkoutStep === 'payment-selection') {
      setCheckoutStep('completed');
      showToast('Your order has been completed successfully!', 'success');
    }
  };

  const handlePreviousStep = () => {
    if (checkoutStep === 'shipping-payment') {
      setCheckoutStep('cart');
    } else if (checkoutStep === 'payment-selection') {
      setCheckoutStep('shipping-payment');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3EE] text-[#4B433D] flex flex-col antialiased">
      {/* Dynamic Toast alerts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            id="toast-notification"
            className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-lg flex items-center gap-3 backdrop-blur-md border ${
              toast.type === 'success'
                ? 'bg-[#214F34] text-white border-emerald-800'
                : 'bg-[#4B433D]/95 text-[#F7F3EE] border-[#B8AA9D]'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-amber-300 flex-shrink-0" />
            )}
            <span className="font-sans font-semibold text-xs leading-none">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern High-End Header */}
      <header className="bg-white/40 backdrop-blur-md border-b border-[#E7DBD0]/85 sticky top-0 z-40 navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Elegant Navigation Links (Home, Deals %, New In) */}
          <div className="flex items-center gap-6 lg:gap-8">
            <h1 
              onClick={handleGoHome}
              className="font-plaster text-2xl sm:text-3xl select-none leading-none lowercase cursor-pointer"
            >
              <span className="text-[#81B187]">v</span>
              <span className="text-[#BDA38C]">ale</span>
            </h1>

            {/* Desktop Navigation Links - Static but glowing elegant links with hover state */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-sans font-bold text-[#8D8178]">
              <div 
                className="py-1 border-b-2 border-transparent hover:text-[#214F34] hover:shadow-[0_1px_0_0_#214F34] transition-all duration-300 ease-in-out cursor-default select-none"
                title="Leads to Main Home Store"
              >
                Home
              </div>
              
              <div 
                className="py-1 border-b-2 border-transparent hover:text-[#214F34] hover:shadow-[0_1px_0_0_#214F34] transition-all duration-300 ease-in-out cursor-default select-none"
                title="Leads to Exceptional Deals"
              >
                Deals %
              </div>

              <div 
                className="py-1 border-b-2 border-transparent hover:text-[#214F34] hover:shadow-[0_1px_0_0_#214F34] transition-all duration-300 ease-in-out cursor-default select-none"
                title="Leads to Autumn Arrivals"
              >
                New In
              </div>
            </nav>
          </div>

          {/* Center Search Input (Extremely Visible & Smoothly Styled) */}
          <div className="flex-1 max-w-xs mx-2 hidden lg:block">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5F8A5E]">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F3ECE6]/70 border border-[#E7DBD0] hover:border-[#214F34]/30 focus:border-[#214F34] focus:bg-white text-xs font-sans tracking-tight rounded-full pl-9 pr-8 py-2 outline-none transition-all placeholder:text-[#9A8F86] text-[#4B433D]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[10px] font-sans tracking-tight font-extrabold text-[#8D8178] hover:text-[#214F34]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Hub - The other elements user put on the navbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Filter: Saved Items Hub */}
            {savedItems.length > 0 && (
              <a
                href="#saved-for-later-hub"
                className="flex items-center gap-1.5 bg-white/50 border border-[#E6DACE]/60 px-2.5 py-1.5 rounded-full text-xs font-sans tracking-tight font-semibold text-[#4F4740] hover:text-[#214F34] hover:border-[#214F34]/30 transition"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-100" />
                <span className="text-[10px] font-bold">{savedItems.length}</span>
              </a>
            )}

            {/* Shopping Basket Status Tracker */}
            <div className="flex items-center gap-1.5 bg-[#214F34]/5 border border-[#214F34]/15 px-3 py-1.5 rounded-full text-xs font-sans tracking-tight text-[#214F34]">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-extrabold text-[10px]">{displayQuantity}</span>
              <span className="text-gray-300">|</span>
              <span className="font-extrabold text-[10px]">₦{displaySubtotal.toLocaleString()}</span>
            </div>

            {/* Side-by-Side Cart Group with ShoppingCart and User icons */}
            <div className="flex items-center gap-1 bg-[#F3ECE6]/50 border border-[#E7DBD0] p-1 rounded-full">
              {/* Shopping Cart Button - Beautifully Selected Icon Accent */}
              <button 
                onClick={() => {
                  setCheckoutStep('cart');
                  showToast('Re-entering your shopping cart view.', 'info');
                }}
                className="relative p-2 bg-[#214F34] text-[#F7F3EE] rounded-full transition-all duration-300 shadow-xs scale-105 cursor-pointer flex items-center justify-center hover:bg-[#214F34]/95"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-4 h-4 stroke-[2.3]" />
                {displayQuantity > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#BDA38C] text-[#214F34] text-[8px] font-sans font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-xs">
                    {displayQuantity}
                  </span>
                )}
              </button>

              <div className="w-[1px] h-4.5 bg-[#E7DBD0] mx-1" />

              {/* User Profile display - Non-clickable, cursor-default */}
              <div 
                className="p-1.5 text-[#214F34]/70 hover:bg-white/50 rounded-full transition duration-200 cursor-default select-none flex items-center justify-center"
                title="Verified Client Account"
              >
                <User className="w-4.5 h-4.5 stroke-[2]" />
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Quick Navigation Strip (Direct adaptation with high aesthetic selection) */}
      <div className="md:hidden bg-[#FBF8F5] border-b border-[#E7DBD0]/80 px-4 py-2 flex items-center justify-around text-xs font-sans font-bold text-[#4B433D]">
        <div 
          className="text-[#8D8178] hover:text-[#214F34] transition duration-250 cursor-default select-none"
          title="Home Store"
        >
          Home
        </div>
        <div 
          className="text-[#8D8178] hover:text-[#214F34] transition duration-250 cursor-default select-none"
          title="Deals"
        >
          Deals %
        </div>
        <div 
          className="text-[#8D8178] hover:text-[#214F34] transition duration-250 cursor-default select-none"
          title="New In"
        >
          New In
        </div>
        
        {/* Mobile Highlighted Cart Group with ShoppingCart & User Icons */}
        <div className="flex items-center gap-1 bg-[#F3ECE6]/50 border border-[#E7DBD0]/80 p-0.5 rounded-full">
          <button 
            onClick={() => {
              setCheckoutStep('cart');
              showToast('Re-entering your shopping cart view.', 'info');
            }}
            className="p-2 bg-[#214F34] text-[#F7F3EE] rounded-full flex items-center justify-center transition shadow-xs scale-105 cursor-pointer relative"
            title="Cart Page (Selected)"
          >
            <ShoppingCart className="w-4 h-4" />
            {displayQuantity > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#BDA38C] text-[#214F34] text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-extrabold border border-white shadow-xs">
                {displayQuantity}
              </span>
            )}
          </button>

          <div className="w-[1px] h-4 bg-[#E7DBD0] mx-0.5" />

          {/* User Profile display - Non-clickable */}
          <div 
            className="p-1.5 text-[#214F34]/70 hover:bg-white/50 rounded-full flex items-center justify-center cursor-default select-none"
            title="Verified Client Account"
          >
            <User className="w-4 h-4" />
          </div>
        </div>


      </div>

      {/* Main viewport Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        
        {/* Progress Timeline Header */}
        {checkoutStep !== 'completed' && (
          <div className="max-w-xl mx-auto mb-10 md:mb-12">
            <div className="flex items-center justify-between relative text-gray-400">
              {/* Connector line container */}
              <div className="absolute left-[32px] right-[32px] top-[18px] -translate-y-1/2 z-0">
                {/* Background soft track */}
                <div className="w-full h-[1.5px] bg-[#E7DBD0]/60 rounded-full" />
                {/* Active elegant progress track */}
                <div 
                  className="absolute left-0 top-0 h-[2px] bg-[#214F34] rounded-full transition-all duration-700 ease-in-out" 
                  style={{ 
                    width: checkoutStep === 'shipping-payment' 
                      ? '50%' 
                      : checkoutStep === 'payment-selection' 
                        ? '100%' 
                        : '0%' 
                  }}
                />
              </div>

              {/* Step 1 node */}
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                disabled={checkoutStep === 'cart'}
                id="timeline-step-1"
                className="relative z-10 flex flex-col items-center gap-1 group focus:outline-none cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border font-sans font-bold text-xs tracking-tight transition duration-300 ${
                  checkoutStep === 'cart'
                    ? 'bg-[#214F34] text-white border-[#214F34] shadow-xs'
                    : 'bg-[#F7F3EE] text-[#214F34] border-[#214F34] shadow-xs'
                }`}>
                  {checkoutStep !== 'cart' ? '✓' : '1'}
                </div>
                <span className="text-[10px] font-bold text-[#4B433D] mt-1.5 tracking-tight">Cart page</span>
              </button>

              {/* Step 2 node */}
              <button
                type="button"
                onClick={() => setCheckoutStep('shipping-payment')}
                disabled={checkoutStep === 'shipping-payment' || checkoutStep === 'cart'}
                id="timeline-step-2"
                className="relative z-10 flex flex-col items-center gap-1 group focus:outline-none cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border font-sans font-bold text-xs tracking-tight transition duration-300 ${
                  checkoutStep === 'shipping-payment'
                    ? 'bg-[#214F34] text-white border-[#214F34] shadow-xs'
                    : checkoutStep === 'payment-selection'
                      ? 'bg-[#F7F3EE] text-[#214F34] border-[#214F34] shadow-xs'
                      : 'bg-[#F7F3EE] text-[#8D8178] border-[#E7DBD0]'
                }`}>
                  {checkoutStep === 'payment-selection' ? '✓' : '2'}
                </div>
                <span className="text-[10px] font-bold text-[#8D8178] mt-1.5 tracking-tight">Checkout</span>
              </button>

              {/* Step 3 node */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border font-sans font-bold text-xs tracking-tight transition duration-300 ${
                  checkoutStep === 'payment-selection'
                    ? 'bg-[#214F34] text-white border-[#214F34] shadow-xs'
                    : 'bg-[#F7F3EE] text-[#8D8178] border-[#E7DBD0]'
                }`}>
                  3
                </div>
                <span className="text-[10px] font-bold text-[#8D8178] mt-1.5 tracking-tight">Payment</span>
              </div>
            </div>
          </div>
        )}

        {/* Master Steps Switching Panel */}
        {checkoutStep === 'completed' ? (
          <div className="space-y-16">
            {/* Center-aligned secure confirmation receipt card */}
            <div className="max-w-xl mx-auto">
              <OrderSuccess
                orderItems={cartItems}
                selectedAddress={selectedAddress}
                selectedShipping={selectedShipping}
                activePromo={activePromo}
                subtotal={subtotal}
                onContinueShopping={handleContinueShopping}
                onGoBackToCart={handleGoBackToCart}
              />
            </div>

            {/* Expansive, full-width recommended showcase */}
            <div className="border-t border-[#E7DBD0] pt-10 pb-12">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#5F8A5E]" />
                <h3 className="font-cormorant font-bold text-[#4B433D] text-lg md:text-2xl tracking-tight">
                  Recommended for Elsie
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(() => {
                  // Merge recommended products & recently viewed items into a single curated catalog
                  const merged = Array.from(
                    new Map(
                      [...RECOMMENDED_PRODUCTS, ...RECENTLY_VIEWED_ITEMS].map(prod => [prod.id, prod])
                    ).values()
                  ).slice(0, 8);
                  
                  return merged.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onAddToCart={handleAddToCartFromRecommendations}
                      isAlreadyInCart={cartItems.some(item => item.id === prod.id)}
                    />
                  ));
                })()}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Hand Column (Shopping review / Form details) */}
            <div className="lg:col-span-2 flex flex-col gap-8 min-w-0">
              
              {checkoutStep === 'cart' ? (
                /* SHOPPING REVIEW STEP */
                <div className="flex flex-col gap-6" id="cart-content-flow">
                  <div className="flex items-center justify-between border-b border-[#E7DBD0] pb-3.5">
                    <div className="flex items-center gap-2.5">
                      <h2 className="font-cormorant font-bold text-[#4B433D] text-2xl md:text-3xl tracking-tight">Your Cart</h2>
                      <span className="bg-[#5F8A5E]/10 text-[#214F34] text-[10px] font-sans font-extrabold px-2.5 py-1 rounded-full border border-[#5F8A5E]/20 tracking-tight">
                        {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                      </span>
                    </div>

                    <button
                      onClick={handleResetDemoState}
                      id="reset-cart-inline"
                      className="text-xs font-bold text-[#5F8A5E] hover:text-[#214F34] flex items-center gap-1 cursor-pointer font-sans tracking-tight"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Elegant Mobile Search Bar (Only visible on mobile viewports) */}
                  <div className="md:hidden">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5F8A5E]">
                        <Search className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-[#E7DBD0] focus:border-[#214F34] focus:bg-white text-xs font-sans tracking-tight rounded-2xl pl-9 pr-8 py-3.5 outline-none transition-all placeholder:text-[#9A8F86] text-[#4B433D]"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[10px] font-sans font-extrabold text-[#8D8178] hover:text-[#214F34] tracking-tight"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Cart List */}
                  <AnimatePresence mode="popLayout">
                    {cartItems.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/55 border border-[#E7DBD0] p-10 rounded-[2rem] text-center flex flex-col items-center justify-center gap-4"
                        id="empty-cart-state"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#EFE7DD] text-[#8D8178] flex items-center justify-center border border-[#E6DACE]/50 mb-1">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <h3 className="font-cormorant font-bold text-[#4B433D] text-xl">Your basket is currently empty</h3>
                        <p className="text-[#8D8178] text-xs max-w-xs leading-relaxed">
                          Replenish your active basket items to review our handcrafted e-commerce details as required.
                        </p>
                        <button
                          onClick={handleResetDemoState}
                          id="replenish-empty-cart-btn"
                          className="bg-[#214F34] hover:bg-[#39644A] text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-xs cursor-pointer active:scale-95 mt-1"
                        >
                          Replenish Items
                        </button>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col gap-1.5">
                        {cartItems.map((item) => (
                          <CartItemCard
                            key={item.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                            onSaveForLater={handleSaveForLater}
                          />
                        ))}
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Saved for Later Widget */}
                  {savedItems.length > 0 && (
                    <div id="saved-for-later-hub" className="border-t border-[#E7DBD0] pt-6 mt-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Heart className="w-4 h-4 text-rose-400 fill-rose-100" />
                        <h3 className="font-cormorant font-bold text-[#4B433D] text-lg md:text-xl">
                          Saved Items for Later ({savedItems.length})
                        </h3>
                      </div>
                      <div className="flex flex-col gap-3">
                        <AnimatePresence mode="popLayout">
                          {savedItems.map((s) => (
                            <SavedItemCard
                              key={s.id}
                              item={s}
                              onMoveToCart={handleMoveToCart}
                              onRemoveFromSaved={handleRemoveFromSaved}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Tailored Suggested Products Panel */}
                  <div className="border-t border-[#E7DBD0] pt-7 mt-5">
                    <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#5F8A5E]" />
                        <h3 className="font-cormorant font-bold text-[#4B433D] text-lg md:text-2xl tracking-tight">
                          {searchQuery ? `Search Results for "${searchQuery}"` : 'Recommended for Elsie'}
                        </h3>
                      </div>
                      {searchQuery && (
                        <span className="text-xs bg-[#5F8A5E]/10 text-[#214F34] font-sans font-extrabold px-3 py-1 rounded-full border border-[#5F8A5E]/20 tracking-tight">
                          {filteredProducts.length} items matched
                        </span>
                      )}
                    </div>

                    {filteredProducts.length === 0 ? (
                      <div className="bg-white/40 border border-[#E7DBD0]/60 p-8 rounded-[1.8rem] text-center flex flex-col items-center justify-center gap-2.5">
                        <p className="text-xs font-sans tracking-tight text-[#8D8178]">
                          No exclusive pieces match your query. Try a different term or view all items.
                        </p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="text-xs font-sans tracking-tight font-extrabold text-[#214F34] hover:underline cursor-pointer"
                        >
                          Show All Products
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredProducts.map((prod) => (
                          <ProductCard
                            key={prod.id}
                            product={prod}
                            onAddToCart={handleAddToCartFromRecommendations}
                            isAlreadyInCart={cartItems.some(item => item.id === prod.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recently Viewed Panel */}
                  <div className="border-t border-[#E7DBD0] pt-7 mt-5 pb-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="w-4 h-4 text-[#5F8A5E]" />
                      <h3 className="font-cormorant font-bold text-[#4B433D] text-lg md:text-xl">
                        Recently Viewed Items
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {RECENTLY_VIEWED_ITEMS.map((prod) => (
                        <div 
                          key={prod.id}
                          className="flex items-center gap-3 p-3 bg-white/40 border border-[#E7DBD0] rounded-2xl"
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F1E8DE] flex-shrink-0">
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#4B433D] truncate">{prod.name}</h4>
                            <span className="text-[10px] text-[#16914A] font-extrabold font-sans tracking-tight">₦ {prod.price.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : checkoutStep === 'shipping-payment' ? (
                /* SECURE SHIPPING & PAYMENT TERMINAL */
                <div className="flex flex-col gap-6" id="checkout-content-flow">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      id="chevron-back-to-cart"
                      className="text-[#214F34] hover:text-[#5F8A5E] transition cursor-pointer flex items-center gap-2 select-none"
                    >
                      <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3.5]" />
                      <h2 className="font-cormorant font-bold text-[#214F34] text-3xl md:text-4xl tracking-tight">Checkout</h2>
                    </button>
                  </div>

                  <CheckoutForm
                    selectedAddress={selectedAddress}
                    onSelectAddress={setSelectedAddress}
                    agreedToTerms={agreedToTerms}
                    onAgreedToTermsChange={setAgreedToTerms}
                  />
                </div>
              ) : (
                /* SECURE LEVEL 3 PAYMENT OPTIONS SELECTION */
                <div className="flex flex-col gap-6" id="payment-selection-flow">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      id="chevron-back-to-checkout"
                      className="text-[#214F34] hover:text-[#5F8A5E] transition cursor-pointer flex items-center gap-2 select-none"
                    >
                      <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3.5]" />
                      <h2 className="font-cormorant font-bold text-[#214F34] text-3xl md:text-4xl tracking-tight">Payment Method</h2>
                    </button>
                  </div>

                  <PaymentOptions
                    onSelectPaymentMethod={setSelectedPaymentMethod}
                    selectedMethod={selectedPaymentMethod}
                    subtotal={subtotal}
                    deliveryFee={selectedShipping.price}
                    discountAmount={activePromo ? (activePromo.discountType === 'percentage' ? (subtotal * activePromo.value) / 100 : activePromo.value) : 0}
                    onCompleteOrder={handleNextStep}
                  />
                </div>
              )}

            </div>

            {/* Right Hand Column (Order Summary Card) */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                shippingOption={selectedShipping}
                activePromo={activePromo}
                onApplyPromo={handleApplyPromo}
                onRemovePromo={handleRemovePromo}
                onProceedToCheckout={handleNextStep}
                isCartStep={checkoutStep === 'cart'}
                onGoBack={handlePreviousStep}
                cartItems={cartItems}
                isCtaDisabled={checkoutStep === 'shipping-payment' && !agreedToTerms}
                ctaText={
                  checkoutStep === 'payment-selection'
                    ? selectedPaymentMethod === 'wallet'
                      ? 'Pay with Vale Wallet'
                      : selectedPaymentMethod === 'cards'
                        ? 'Pay with Card'
                        : selectedPaymentMethod === 'paypal'
                          ? 'Pay with PayPal'
                          : 'Confirm Wire Transfer'
                    : 'Make Payment'
                }
              />
            </div>

          </div>
        )}

      </main>

      {/* Sustainable High-End Footer */}
      <footer className="bg-white/40 border-t border-[#E7DBD0]/80 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[#9A8F86] text-xs">
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#4B433D]">VALE SHOPPING</span>
            <span>&bull;</span>
            <span>Eco-friendly shipping with sustainable green logistics packing.</span>
          </div>

          <div className="flex items-center gap-4 text-[#8D8178]">
            <span className="font-bold text-[#214F34] cursor-help">Secure SSL v3 Guaranteed</span>
            <span>&bull;</span>
            <span className="cursor-pointer hover:underline">Support & FAQ</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
