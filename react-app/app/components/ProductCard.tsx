import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { ProductType } from '../types';

interface ProductCardProps {
  product: ProductType;
  onAddToCart: (product: ProductType) => void;
  isAlreadyInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isAlreadyInCart = false,
}) => {
  const [added, setAdded] = useState(isAlreadyInCart);

  const handleToggle = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset visual state shortly or keep track of cart state
  };

  return (
    <div className="group rounded-[1.8rem] border border-[#E7DBD0] bg-white/60 p-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between">
      <div>
        {/* IMAGE */}
        <div className="relative h-[180px] overflow-hidden rounded-[1.5rem] bg-[#F1E8DE]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* INFO */}
        <div className="mt-4">
          <h3 className="text-sm font-bold tracking-tight text-[#4B433D] font-sans">
            {product.name}
          </h3>

          <p className="mt-1 text-xs leading-5 text-[#8B8178] line-clamp-2 min-h-[40px]">
            {product.description}
          </p>

          {/* STARS */}
          <div className="mt-3 flex items-center gap-1">
            <Star size={12} fill="#F5B301" color="#F5B301" />
            <Star size={12} fill="#F5B301" color="#F5B301" />
            <Star size={12} fill="#F5B301" color="#F5B301" />
            <Star size={12} fill="#F5B301" color="#F5B301" />
            <Star size={12} color="#D2C6BA" />
            <span className="text-[10px] text-[#8B8178] ml-1">({product.rating || '4.5'})</span>
          </div>
        </div>
      </div>

      {/* PRICE & ACTION */}
      <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-[#E7DBD0]/40">
        <p className="text-[1.05rem] font-extrabold text-[#16914A]">
          ₦ {product.price.toLocaleString()}
        </p>

        <button
          onClick={handleToggle}
          id={`add-cart-btn-${product.id}`}
          className={`flex items-center gap-1 rounded-full px-4 py-2 text-xs font-bold transition duration-350 cursor-pointer ${
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
  );
};
