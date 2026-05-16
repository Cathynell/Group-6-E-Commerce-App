"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Star } from "lucide-react";
import { ProductType } from "../../types";

type Props = {
  product: ProductType;
};

export default function ProductCard({
  product,
}: Props) {

  const [added, setAdded] = useState(false);

  return (
    <div className="group rounded-[1.8rem] border border-[#E7DBD0] bg-white/60 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

      {/* IMAGE */}
      <div className="relative h-[180px] overflow-hidden rounded-[1.5rem] bg-[#F1E8DE]">

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* INFO */}
      <div className="mt-4">

        <h3 className="text-sm font-bold tracking-[0.02em] text-[#4B433D]">
          {product.name}
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#8B8178]">
          {product.description}
        </p>

        {/* STARS */}
        <div className="mt-3 flex items-center gap-1">
          <Star size={13} fill="#F5B301" color="#F5B301" />
          <Star size={13} fill="#F5B301" color="#F5B301" />
          <Star size={13} fill="#F5B301" color="#F5B301" />
          <Star size={13} fill="#F5B301" color="#F5B301" />
          <Star size={13} color="#D2C6BA" />
        </div>

        {/* PRICE */}
        <div className="mt-3 flex items-center justify-between">

          <p className="text-[1rem] font-extrabold text-[#16914A]">
            ₦ {product.price.toLocaleString()}
          </p>

          <button
            onClick={() => setAdded(!added)}
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-xs font-bold transition ${
              added
                ? "bg-[#214F34] text-white"
                : "bg-[#EFE7DD] text-[#4F4740] hover:bg-[#214F34] hover:text-white"
            }`}
          >
            {added && <Check size={13} />}

            {added ? "Added" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}