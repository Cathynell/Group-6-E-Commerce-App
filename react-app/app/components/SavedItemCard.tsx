import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { CartItemType } from '../types';

interface SavedItemCardProps {
  item: CartItemType;
  onMoveToCart: (item: CartItemType) => void;
  onRemoveFromSaved: (id: number) => void;
}

export const SavedItemCard: React.FC<SavedItemCardProps> = ({
  item,
  onMoveToCart,
  onRemoveFromSaved,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      id={`saved-item-${item.id}`}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white/40 border border-[#E7DBD0] rounded-2xl hover:border-[#5F8A5E]/40 hover:bg-[#F1E8DE]/10 transition-all duration-300 shadow-2xs"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#EFE4D8] flex-shrink-0 border border-[#E6DACE]/30">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="min-w-0">
          <h4 className="font-cormorant font-bold text-[#4B433D] text-sm md:text-base truncate">{item.name}</h4>
          <p className="font-sans text-[0.7rem] text-[#9A8F86] uppercase tracking-tight mt-0.5">Colour: {item.color}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-sans tracking-tight text-xs font-bold text-[#16914A]">₦ {item.price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        <button
          onClick={() => onRemoveFromSaved(item.id)}
          id={`delete-saved-${item.id}`}
          className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
          title="Remove permanently"
        >
          <Trash2 id={`trash-saved-ico-${item.id}`} className="w-4 h-4" />
        </button>
        <button
          onClick={() => onMoveToCart(item)}
          id={`move-cart-${item.id}`}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-[#214F34] border border-[#E6DACE] hover:border-[#214F34] text-xs font-bold text-[#4F4740] hover:text-white rounded-full shadow-xs transition-all duration-300"
        >
          <ShoppingCart id={`cart-saved-ico-${item.id}`} className="w-3.5 h-3.5 text-[#5F8A5E] group-hover:text-white" />
          Move to Cart
        </button>
      </div>
    </motion.div>
  );
};
