import Navbar from "../../components/cart/Navbar";
import CartItem from "../../components/cart/CartItem";
import OrderSummary from "../../components/cart/OrderSummary";
import ProductCard from "../../components/cart/ProductCard";

import {
  cartItems,
  recommendedProducts,
  recentlyViewed,
} from "../../data/mockData";

import { ArrowLeft } from "lucide-react";

export default function CartPage() {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#F7F3EE] animate-fadeIn">

      {/* TOP GREEN BAR */}
      <div className="sticky top-0 z-50 bg-[#29533B] py-2 text-center text-[0.72rem] font-semibold tracking-[0.02em] text-white">
        Get a 20% Coupon today!
        <span className="ml-2 cursor-pointer underline underline-offset-2">
          See more
        </span>
      </div>

      {/* NAVBAR */}
      <div className="sticky top-[32px] z-40 bg-[#F7F3EE]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] px-12 pt-5">
          <Navbar />
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-[1400px] px-12 pb-20">

        {/* CONTINUE SHOPPING */}
        <button className="mt-6 flex items-center gap-2 text-sm font-semibold tracking-[0.02em] text-[#7D746D] transition hover:text-[#5F8A5E]">
          <ArrowLeft size={16} />
          Continue Shopping
        </button>

        {/* TOP SECTION */}
        <section className="mt-5 grid gap-10 lg:grid-cols-[1.5fr_0.72fr]">

          {/* LEFT */}
          <div>

            {/* HEADER */}
            <div className="mb-5 flex items-end justify-between">

              <h1 className="font-cormorant text-[2.9rem] font-semibold text-[#A49688]">
                Your Cart
              </h1>

              <p className="text-sm font-medium text-[#8D837B]">
                You have
                <span className="mx-1 font-bold text-[#4F4740]">
                  {cartItems.length} items
                </span>
                in cart
              </p>
            </div>

            {/* CART BOX */}
            <div className="rounded-[2rem] border border-[#E7DBD0] bg-white/55 p-4 shadow-[0_10px_35px_rgba(0,0,0,0.03)] backdrop-blur-md">

              <div className="max-h-[410px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <OrderSummary subtotal={subtotal} />
        </section>

        {/* BENEFITS */}
        <section className="mt-10 grid gap-4 md:grid-cols-3">

          <div className="rounded-[1.5rem] border border-[#E7DBD0] bg-white/55 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <p className="text-sm font-bold text-[#2D5B3F]">
              Free Delivery
            </p>

            <p className="mt-1 text-xs leading-5 text-[#8B8178]">
              Free nationwide delivery on orders above ₦100,000.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#E7DBD0] bg-white/55 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <p className="text-sm font-bold text-[#2D5B3F]">
              Secure Payment
            </p>

            <p className="mt-1 text-xs leading-5 text-[#8B8178]">
              Protected checkout with encrypted transactions.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[#E7DBD0] bg-white/55 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <p className="text-sm font-bold text-[#2D5B3F]">
              Easy Returns
            </p>

            <p className="mt-1 text-xs leading-5 text-[#8B8178]">
              Hassle-free returns within 7 days after delivery.
            </p>
          </div>

        </section>

        {/* DIVIDER */}
        <div className="mt-16 border-t border-[#E4D8CD]" />

        {/* RECOMMENDED */}
        <section className="mt-10">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="font-cormorant text-[2.5rem] font-semibold text-[#8F857C]">
              Recommended Products
            </h2>

            <button className="text-sm font-semibold text-[#706760] transition hover:text-[#5F8A5E]">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* RECENTLY VIEWED */}
        <section className="mt-16">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="font-cormorant text-[2.4rem] font-semibold text-[#8F857C]">
              Recently Viewed
            </h2>

            <button className="text-sm font-semibold text-[#706760] transition hover:text-[#5F8A5E]">
              View All
            </button>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-2">
            {recentlyViewed.map((product) => (
              <div
                key={product.id}
                className="min-w-[240px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <div className="h-10" />
      </div>
    </main>
  );
}