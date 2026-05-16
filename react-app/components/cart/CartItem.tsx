import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemType } from "../../types";

type Props = {
  item: CartItemType;
};

export default function CartItem({ item }: Props) {
  return (
    <div className="group flex items-center justify-between border-b border-[#EEE2D7] py-5 transition duration-300 hover:bg-white/70 hover:px-2">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* IMAGE */}
        <div className="relative h-[82px] w-[82px] overflow-hidden rounded-xl bg-[#EFE4D8]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* INFO */}
        <div>
          <h3 className="text-[0.95rem] font-bold tracking-[0.02em] text-[#4B433D]">
            {item.name}
          </h3>

          <p className="mt-1 text-[0.75rem] font-medium text-[#9A8F86]">
            Colour: {item.color}
          </p>

          <p className="mt-2 text-[1.15rem] font-extrabold text-[#16914A]">
            ₦ {item.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* DELETE */}
        <button className="transition hover:scale-110">
          <Trash2
            size={15}
            className="text-[#FF6464]"
          />
        </button>

        {/* QUANTITY */}
        <div className="flex items-center gap-4 rounded-full border border-[#E6DACE] bg-white px-4 py-2">
          <button className="transition hover:text-[#5F8A5E]">
            <Minus size={14} />
          </button>

          <span className="text-xs font-bold text-[#5A514B]">
            {item.quantity}
          </span>

          <button className="transition hover:text-[#5F8A5E]">
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}