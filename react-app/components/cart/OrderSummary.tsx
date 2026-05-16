type Props = {
  subtotal: number;
};

export default function OrderSummary({
  subtotal,
}: Props) {

  const total = subtotal + 1500;

  return (
    <div className="relative h-fit overflow-hidden rounded-[1.8rem]">

      {/* LEAF BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.14,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[#DCD2C3]/96" />

      {/* CONTENT */}
      <div className="relative p-6">

        <h2 className="mb-6 text-[1.5rem] font-bold tracking-[0.02em] text-[#168344]">
          Order Summary
        </h2>

        {/* SUMMARY */}
        <div className="space-y-5 text-[0.95rem] font-medium">

          <div className="flex justify-between">

            <span className="text-[#9A9087]">
              Subtotal
            </span>

            <span className="font-bold text-[#1D1D1D]">
              ₦ {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">

            <span className="text-[#9A9087]">
              Discount
            </span>

            <span className="font-bold text-[#1D1D1D]">
              ₦ 0
            </span>
          </div>

          <div className="border-t border-[#B8AA9D] pt-5">

            <div className="flex justify-between text-[1rem]">

              <span className="font-semibold text-[#60574F]">
                Total
              </span>

              <span className="font-extrabold text-[#1D1D1D]">
                ₦ {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* PROMO */}
        <div className="mt-6 flex items-center gap-2">

          <div className="flex flex-1 items-center rounded-full bg-white px-4 py-3">

            <input
              type="text"
              placeholder="Add promo code"
              className="w-full bg-transparent text-xs outline-none placeholder:text-[#B4AAA1]"
            />
          </div>

          <button className="rounded-full bg-[#214F34] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#39644A]">
            Apply
          </button>
        </div>

        {/* BUTTON */}
        <button className="mt-5 w-full rounded-full bg-[#214F34] py-4 text-sm font-bold tracking-[0.03em] text-white transition hover:bg-[#39644A]">
          Go to Checkout →
        </button>
      </div>
    </div>
  );
}