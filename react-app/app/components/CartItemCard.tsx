import React from 'react';
import { motion } from 'motion/react';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import { CartItemType } from '../types';

interface CartItemCardProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, newQty: number) => void;
  onRemove: (id: number) => void;
  onSaveForLater: (item: CartItemType) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      id={`cart-item-${item.id}`}
      className="group flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#EEE2D7] py-6 gap-4 transition duration-300 hover:bg-white/40 hover:px-3 rounded-2xl"
    >
      {/* LEFT: IMAGE & LABELS */}
      <div className="flex items-center gap-5 min-w-0">
        {/* IMAGE FRAME */}
        <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-[#EFE4D8] flex-shrink-0 border border-[#E6DACE]/30">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* INFO */}
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#4B433D] font-sans sm:text-base">
            {item.name}
          </h3>

          <p className="mt-0.5 text-[0.78rem] font-medium text-[#9A8F86]">
            Colour: <span className="font-semibold text-[#4B433D]">{item.color}</span>
          </p>

          <p className="mt-1.5 text-[1.12rem] font-extrabold text-[#16914A]">
            ₦ {item.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* RIGHT: OPERATIONS */}
      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EEE2D7]/50">
        
        {/* UTILS DIALOG (Save for later) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSaveForLater(item)}
            id={`save-later-${item.id}`}
            className="p-2 text-[#9A8F86] hover:text-[#5F8A5E] hover:bg-[#F1E8DE]/40 rounded-full transition-all duration-200"
            title="Save for Later"
          >
            <Heart className="w-4 h-4" />
          </button>
          
          {/* DELETE */}
          <button
            onClick={() => onRemove(item.id)}
            id={`remove-item-${item.id}`}
            className="p-2 text-[#FF6464]/80 hover:text-[#FF6464] hover:bg-[#FF6464]/10 rounded-full transition duration-200 hover:scale-110"
            title="Delete Item"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* QUANTITY PICKER */}
        <div className="flex items-center gap-4 rounded-full border border-[#E6DACE] bg-white px-4 py-1.5 shadow-xs">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            id={`decrement-${item.id}`}
            className="text-[#9A8F86] hover:text-[#5F8A5E] transition disabled:opacity-30 disabled:hover:text-[#9A8F86]"
            aria-label="Reduce"
          >
            <Minus size={13} />
          </button>

          <span className="text-xs font-bold text-[#5A514B] w-5 text-center font-sans tracking-tight">
            {item.quantity}
          </span>

          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            id={`increment-${item.id}`}
            className="text-[#9A8F86] hover:text-[#5F8A5E] transition"
            aria-label="Increase"
          >
            <Plus size={13} />
          </button>
        </div>

      </div>
    </motion.div>
  );
};
