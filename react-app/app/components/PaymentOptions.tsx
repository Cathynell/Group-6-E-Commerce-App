import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, CreditCard, Landmark, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Copy } from 'lucide-react';

interface PaymentOptionsProps {
  onSelectPaymentMethod: (method: string) => void;
  selectedMethod: string;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  onCompleteOrder: () => void;
}

export const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  onSelectPaymentMethod,
  selectedMethod,
  subtotal,
  deliveryFee,
  discountAmount,
  onCompleteOrder,
}) => {
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  // Card Info state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('Elsie Mbama');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  // Bank transfer selected bank
  const [selectedBank, setSelectedBank] = useState('Providus Bank');
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  // Wallet mockup balance
  const walletBalance = 350000; // ₦350k
  const canPayWithWallet = walletBalance >= total;

  const methods = [
    { id: 'wallet', name: 'Wallet', icon: Wallet, description: 'Pay from Vale Wallet account' },
    { id: 'cards', name: 'Cards', icon: CreditCard, description: 'Debit or Credit Card' },
    { id: 'paypal', name: 'PayPal', icon: () => (
      <svg className="w-4 h-4 text-inherit" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 2.136C7.545 1.513 8.243 1.15 9.006 1.15h6.635c1.173 0 2.179.805 2.41 1.956l1.83 9.141c.21 1.05-.333 2.091-1.328 2.502-1.026.425-2.228.614-3.565.614h-.735a.8.8 0 00-.784.64l-.941 4.704a.8.8 0 01-.784.643h-2.94a.5.5 0 01-.49-.597l2.808-14.037a.8.8 0 00-.784-.956H6.1c-.53 0-.916.48-.802.997l1.107 5.027a.5.5 0 00.49.393h.643a.5.5 0 01.49.598l-.408 2.037a.8.8 0 01-.784.643H3.2c-.44 0-.82-.294-.925-.722L.156 4.909c-.198-.813.27-1.63 1.054-1.874 1.745-.544 3.793-.899 5.866-.899z" />
      </svg>
    ), description: 'Pay via secure PayPal portal' },
    { id: 'bank', name: 'Bank Transfer', icon: Landmark, description: 'Direct Wire / Bank App payment' },
  ];

  const formatPrice = (val: number) => {
    return `₦ ${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Filter Card Input spacing
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^0-9]/g, '');
    if (input.length > 2) {
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
    }
    setExpiry(input.slice(0, 5));
  };

  return (
    <div id="payment-options-layout" className="flex flex-col gap-6 text-[#4B433D] tracking-[0.03em]">
      
      {/* Title block */}
      <div className="select-none">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#214F34] font-cormorant">
          2. Payment Options
        </h3>
        <p className="text-[11px] text-[#8D8178] mt-1 font-sans font-medium">
          Choose a payment method to complete your luxury piece acquisition.
        </p>
      </div>

      {/* Two Column Selector & Details */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Left selector menu column */}
        <div className="md:col-span-2 flex flex-col gap-2">
          {methods.map((method) => {
            const IconComp = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => onSelectPaymentMethod(method.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all text-left group cursor-pointer ${
                  isSelected
                    ? 'bg-[#214F34]/5 border-[#214F34]/30 text-[#214F34]'
                    : 'bg-white/60 border-[#E7DBD0]/70 text-[#8D8178] hover:bg-white hover:border-[#BDA38C]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl transition-all ${
                    isSelected ? 'bg-[#214F34]/10 text-[#214F34]' : 'bg-[#F7F3EE] text-[#8D8178] group-hover:bg-[#EFE7DD]'
                  }`}>
                    <IconComp className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-extrabold font-sans tracking-[0.02em]">
                      {method.name}
                    </h4>
                    <span className="text-[9px] font-medium text-[#8D8178] block mt-0.5">
                      {method.id === 'wallet' ? 'Vale Wallet (funds instant)' : method.name === 'Cards' ? 'Debit or Credit' : 'Global securely'}
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-all ${
                  isSelected ? 'text-[#214F34] translate-x-0.5' : 'text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Details Panel Column */}
        <div className="md:col-span-3 min-h-[280px] bg-white/70 border border-[#E7DBD0]/70 rounded-[1.8rem] p-5 md:p-6 shadow-xs flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {/* 1. WALLET METHOD DETAILS */}
            {selectedMethod === 'wallet' && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full justify-between gap-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#5F8A5E]" />
                    <span className="text-[9px] font-extrabold text-[#5F8A5E] tracking-widest uppercase font-sans">Vale Loyalty Balance</span>
                  </div>
                  
                  {/* Glass Card for Wallet Balance */}
                  <div className="bg-[#214F34] text-[#F7F3EE] rounded-2xl p-5 border border-[#143924] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 bg-white/5 rounded-full translate-x-6 -translate-y-6" />
                    <span className="text-[9px] tracking-widest uppercase font-sans font-bold text-[#A6CDB4]">Active Wallet Wallet</span>
                    <h4 className="text-2xl font-black font-sans tracking-tight mt-1">
                      {formatPrice(walletBalance)}
                    </h4>
                    <div className="mt-4 flex items-center justify-between text-[10px] text-[#A6CDB4] font-medium font-sans border-t border-white/10 pt-3">
                      <span>Owner: Elsie Mbama</span>
                      <span className="bg-[#BDA38C] text-[#214F34] px-2 py-0.5 rounded-full font-bold">Gold Tier</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#F7F3EE]/55 border border-[#E7DBD0]/50 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-[#4B433D] block font-sans">Funding & Auto-deduct Action</span>
                    <p className="text-[9px] text-[#8D8178] leading-relaxed font-sans">
                      Order total amount of <span className="font-bold text-[#214F34]">{formatPrice(total)}</span> will be seamlessly debited from your secure digital wallet. 
                    </p>
                  </div>
                </div>

                <div className="pt-2 select-none">
                  {canPayWithWallet ? (
                    <div className="flex gap-2 items-center text-[#16914A]">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-bold font-sans">Sufficient funds available to confirm this order.</span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-[#FF6464] font-sans">
                      Insufficient wallet balance to complete transaction. Please recharge your wallet balance.
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* 2. CARD PAYMENT DETAILS */}
            {selectedMethod === 'cards' && (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <span className="text-[9px] font-extrabold text-[#BDA38C] tracking-widest uppercase font-sans block">Debit/Credit Card Details</span>
                
                {/* Real-time interactive card mockup */}
                <div className="bg-[#214F34] text-white p-4 sm:p-5 rounded-2xl border border-emerald-950 flex flex-col justify-between h-32 relative overflow-hidden font-sans shadow-xs">
                  <div className="absolute bottom-[-20%] right-[-10%] w-24 h-24 bg-white/5 rounded-full pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <div className="h-6 w-9 rounded bg-[#E7DBD0]/20 border border-white/20 flex items-center justify-center text-[8px] font-mono tracking-tighter">CHIP</div>
                    <span className="text-[9px] font-extrabold tracking-widest">VALE CARD</span>
                  </div>
                  <div>
                    <span className="font-mono text-sm tracking-widest font-bold block mb-1">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </span>
                    <div className="flex justify-between text-[8px] uppercase tracking-wider text-emerald-100">
                      <div>
                        <span>Cardholder</span>
                        <p className="font-sans font-bold mt-0.5 text-[9px]">{cardName || 'ELSIE MBAMA'}</p>
                      </div>
                      <div>
                        <span>Expires</span>
                        <p className="font-semibold mt-0.5 text-[9px]">{expiry || 'MM/YY'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Inputs (Custom and Softer style matching Shipping page) */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-1 font-sans">
                      CARD NUMBER
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="4320 0000 1234 5678"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full px-4 py-2.5 text-xs bg-[#F7F3EE]/40 border border-[#E7DBD0] focus:border-[#214F34] rounded-xl outline-none transition font-sans text-gray-800 placeholder-gray-400 font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-1 font-sans">
                        EXPIRY DATE
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={handleExpiryChange}
                        className="w-full px-4 py-2.5 text-xs bg-[#F7F3EE]/40 border border-[#E7DBD0] focus:border-[#214F34] rounded-xl outline-none transition font-sans text-gray-800 placeholder-gray-400 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-1 font-sans">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="•••"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full px-4 py-2.5 text-xs bg-[#F7F3EE]/40 border border-[#E7DBD0] focus:border-[#214F34] rounded-xl outline-none transition font-sans text-gray-800 placeholder-gray-400 font-semibold"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-[10px] text-[#8D8178] font-semibold cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-[#E7DBD0] text-[#5F8A5E] focus:ring-[#5F8A5E] bg-white"
                    />
                    <span>Save card for subsequent Vale Shopping transactions</span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* 3. PAYPAL DETAILS */}
            {selectedMethod === 'paypal' && (
              <motion.div
                key="paypal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-full justify-between gap-5"
              >
                <div className="space-y-4">
                  <span className="text-[9px] font-extrabold text-blue-600 tracking-widest uppercase font-sans block">PayPal Express</span>
                  <div className="border border-[#E7DBD0] bg-sky-50/20 p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 2.136C7.545 1.513 8.243 1.15 9.006 1.15h6.635c1.173 0 2.179.805 2.41 1.956l1.83 9.141c.21 1.05-.333 2.091-1.328 2.502-1.026.425-2.228.614-3.565.614h-.735a.8.8 0 00-.784.64l-.941 4.704a.8.8 0 01-.784.643h-2.94a.5.5 0 01-.49-.597l2.808-14.037a.8.8 0 00-.784-.956H6.1c-.53 0-.916.48-.802.997l1.107 5.027a.5.5 0 00.49.393h.643a.5.5 0 01.49.598l-.408 2.037a.8.8 0 01-.784.643H3.2c-.44 0-.82-.294-.925-.722L.156 4.909c-.198-.813.27-1.63 1.054-1.874 1.745-.544 3.793-.899 5.866-.899z" />
                      </svg>
                    </div>
                    <h4 className="text-xs font-bold text-[#4B433D] font-sans">Connect with PayPal Express Checkout</h4>
                    <p className="text-[10px] text-[#8D8178] max-w-xs leading-relaxed font-sans">
                      You will be securely redirected to the PayPal portal to complete your transaction and authorize payment directly from your PayPal account.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-bold text-[#5F8A5E] flex items-center gap-1 font-sans">
                    🌱 Immediate currency conversion and global safety assurance.
                  </span>
                </div>
              </motion.div>
            )}

            {/* 4. BANK TRANSFER DETAILS */}
            {selectedMethod === 'bank' && (
              <motion.div
                key="bank"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <span className="text-[9px] font-extrabold text-[#BDA38C] tracking-widest uppercase font-sans block">Bank Wire / Transfer Details</span>
                
                {/* Bank account parameters block */}
                <div className="bg-[#F7F3EE]/80 border border-[#E7DBD0]/80 p-4 rounded-2xl flex flex-col gap-3 font-sans">
                  
                  {/* Bank Tab Picker */}
                  <div className="flex gap-2 border-b border-[#E7DBD0]/40 pb-2">
                    {['Providus Bank', 'GTBank', 'Sterling Bank'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`text-[9px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                          selectedBank === bank
                            ? 'bg-[#214F34] text-white border-[#214F34]'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {bank.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Chosen Bank Particulars */}
                  <div className="space-y-2.5 pt-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#8D8178]">Account Name</span>
                      <span className="font-bold text-[#4B433D]">Vale Shopping Nigeria</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#8D8178]">Account Number</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-[#4B433D] tracking-tight">
                          {selectedBank === 'Providus Bank' ? '5401928374' : selectedBank === 'GTBank' ? '0129384756' : '1019283746'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(selectedBank === 'Providus Bank' ? '5401928374' : selectedBank === 'GTBank' ? '0129384756' : '1019283746', 'Number')}
                          className="text-[#BDA38C] hover:text-[#214F34] p-1 rounded-md hover:bg-white/50 transition cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#8D8178]">Payment Reference</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-[#16914A] bg-[#16914A]/10 px-2 py-0.5 rounded-md text-[10px]">
                          VALE-SHOPPING-DEMO
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy('VALE-SHOPPING-DEMO', 'Ref')}
                          className="text-[#BDA38C] hover:text-[#214F34] p-1 rounded-md hover:bg-white/50 transition cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {copiedText && (
                  <div className="flex gap-1.5 items-center text-[10px] font-bold text-[#16914A] bg-[#16914A]/10 px-3 py-1.5 rounded-full border border-[#16914A]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Reference {copiedText} copied to clipboard!</span>
                  </div>
                )}

                <p className="text-[9px] text-[#8D8178] leading-tight font-sans">
                  Please proceed to make the transfer via your bank's app, adding the exact payment reference above. 
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secure details footer inside right column */}
          <div className="border-t border-[#E7DBD0]/60 pt-4 mt-4 flex items-center justify-between text-[10px] text-[#8D8178] font-sans">
            <span className="flex items-center gap-1 block">🛡️ Verified Secure Secure Server Connection</span>
            <span className="font-mono text-[9px] text-[#BDA38C]">SSL v3 TLS</span>
          </div>

        </div>

      </div>

    </div>
  );
};
