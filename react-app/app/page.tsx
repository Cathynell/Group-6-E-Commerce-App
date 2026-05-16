import Navbar from "@/components/cart/Navbar";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import ProductCard from "@/components/cart/ProductCard";

import {
  cartItems,
  recommendedProducts,
} from "@/data/mockData";

export default function CartPage() {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f3ef] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* NAVBAR */}
        <Navbar />

        {/* TOP SECTION */}
        <section className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_0.8fr]">
          {/* CART */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-4xl font-semibold text-[#5c5048]">
                Your Cart
              </h1>

              <p className="text-sm text-[#777]">
                You have{" "}
                <span className="font-semibold text-black">
                  {cartItems.length} items
                </span>{" "}
                in cart
              </p>
            </div>

            <div className="rounded-3xl border border-[#e6dfd8] bg-white p-5">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <OrderSummary subtotal={subtotal} />
        </section>

        {/* RECOMMENDED */}
        <section className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-[#5c5048]">
            Recommended Products
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}