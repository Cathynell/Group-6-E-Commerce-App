import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Address } from '../types';

interface CheckoutFormProps {
  selectedAddress: Address;
  onSelectAddress: (address: Address) => void;
  // Included to keep compatibility with App.tsx signatures
  paymentInfo?: any;
  onUpdatePaymentInfo?: (info: any) => void;
  agreedToTerms?: boolean;
  onAgreedToTermsChange?: (agreed: boolean) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  selectedAddress,
  onSelectAddress,
  agreedToTerms = false,
  onAgreedToTermsChange,
}) => {
  const [fullName, setFullName] = useState(selectedAddress.fullName || '');
  const [phone, setPhone] = useState(selectedAddress.phone || '');
  const [countryCode, setCountryCode] = useState('+234');
  const [email, setEmail] = useState('elsiembama9@gmail.com');
  const [country, setCountry] = useState('Nigeria');
  const [city, setCity] = useState(selectedAddress.city || '');
  const [state, setState] = useState(selectedAddress.state || '');
  const [zipCode, setZipCode] = useState(selectedAddress.zipCode || '');
  
  const [saveShippingInfo, setSaveShippingInfo] = useState(true);
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);

  const countryCodes = [
    { code: '+234', label: 'Nigeria' },
    { code: '+1', label: 'USA/Canada' },
    { code: '+44', label: 'United Kingdom' },
    { code: '+33', label: 'France' },
  ];

  const handleFieldChange = (field: string, val: string) => {
    let updated = { ...selectedAddress };
    if (field === 'fullName') {
      setFullName(val);
      updated.fullName = val;
    } else if (field === 'phone') {
      setPhone(val);
      updated.phone = val;
    } else if (field === 'city') {
      setCity(val);
      updated.city = val;
    } else if (field === 'state') {
      setState(val);
      updated.state = val;
    } else if (field === 'zipCode') {
      setZipCode(val);
      updated.zipCode = val;
    }
    onSelectAddress(updated);
  };

  return (
    <div id="checkout-form-custom-container" className="flex flex-col gap-6 text-[#4B433D]">
      
      {/* Title block with checkbox aligned right */}
      <div className="flex items-center justify-between flex-wrap gap-4 select-none">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#214F34] font-cormorant">
          1. Shipping Information
        </h3>
        <label className="flex items-center gap-2.5 text-xs text-[#8D8178] font-bold hover:text-[#214F34] transition cursor-pointer select-none font-sans">
          <input
            type="checkbox"
            checked={saveShippingInfo}
            onChange={(e) => setSaveShippingInfo(e.target.checked)}
            className="w-4 h-4 rounded border-[#E7DBD0] text-[#5F8A5E] focus:ring-[#5F8A5E] cursor-pointer bg-white/80"
          />
          <span>Save Shipping Information</span>
        </label>
      </div>

      {/* Form Input Blocks */}
      <div className="flex flex-col gap-5">
        
        {/* Full Name */}
        <div>
          <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-2 font-sans select-none">
            FULL NAME <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            className="w-full px-4 py-3.5 text-sm bg-white/80 backdrop-blur-xs border border-[#E7DBD0] focus:border-[#BDA38C] focus:bg-white focus:ring-1 focus:ring-[#BDA38C] rounded-2xl outline-none transition-all font-sans text-[#4B433D] placeholder-[#B4AAA1] font-medium shadow-xs"
          />
        </div>

        {/* Phone component matching screenshot combo dropdown button + input */}
        <div>
          <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-2 font-sans select-none">
            PHONE <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center bg-white/80 backdrop-blur-xs border border-[#E7DBD0] rounded-2xl focus-within:border-[#BDA38C] focus-within:ring-1 focus-within:ring-[#BDA38C] transition-all overflow-hidden shadow-xs">
            {/* Country code prefix dropdown selector inside form boundary */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCountryCodeDropdown(!showCountryCodeDropdown)}
                className="flex items-center gap-1 xl:gap-1.5 px-4 h-full text-sm font-sans font-bold text-[#4B433D] bg-transparent border-r border-[#E7DBD0] select-none h-[49px] cursor-pointer"
              >
                <span>{countryCode}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#BDA38C]" />
              </button>
              {showCountryCodeDropdown && (
                <div className="absolute left-0 top-[52px] z-50 bg-white border border-[#E7DBD0] rounded-2xl shadow-lg py-1 w-32">
                  {countryCodes.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setCountryCode(item.code);
                        setShowCountryCodeDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-sans font-bold hover:bg-[#F7F3EE] text-[#4B433D]"
                    >
                      {item.code} ({item.label})
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              className="flex-1 px-4 py-3.5 text-sm bg-transparent outline-none font-sans text-[#4B433D] placeholder-[#B4AAA1] font-medium"
            />
          </div>
        </div>

        {/* E-mail Address */}
        <div>
          <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-2 font-sans select-none">
            E-MAIL ADDRESS <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 text-sm bg-white/80 backdrop-blur-xs border border-[#E7DBD0] focus:border-[#BDA38C] focus:bg-white focus:ring-1 focus:ring-[#BDA38C] rounded-2xl outline-none transition-all font-sans text-[#4B433D] placeholder-[#B4AAA1] font-medium shadow-xs"
          />
        </div>

        {/* Country Selector Dropdown */}
        <div>
          <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-2 font-sans select-none">
            COUNTRY <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3.5 pr-10 text-sm bg-white/80 backdrop-blur-xs border border-[#E7DBD0] focus:border-[#BDA38C] focus:bg-white focus:ring-1 focus:ring-[#BDA38C] rounded-2xl outline-none transition-all font-sans text-[#4B433D] placeholder-[#B4AAA1] font-medium appearance-none cursor-pointer shadow-xs"
            >
              <option value="Nigeria">Nigeria</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="France">France</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#BDA38C]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Three Column City, State, Zip */}
        <div className="grid grid-cols-3 gap-3">
          
          {/* City */}
          <div>
            <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-1.5 font-sans select-none">
              CITY
            </label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => handleFieldChange('city', e.target.value)}
              className="w-full px-3 py-3.5 text-xs sm:text-sm bg-white/80 backdrop-blur-xs border border-[#E7DBD0] focus:border-[#BDA38C] focus:bg-white focus:ring-1 focus:ring-[#BDA38C] rounded-2xl outline-none transition-all font-sans text-[#4B433D] placeholder-[#B4AAA1] font-medium shadow-xs"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-1.5 font-sans select-none">
              STATE
            </label>
            <input
              type="text"
              placeholder="Enter State"
              value={state}
              onChange={(e) => handleFieldChange('state', e.target.value)}
              className="w-full px-3 py-3.5 text-xs sm:text-sm bg-[#FDFCFB]/90 border border-[#E7DBD0] focus:border-[#BDA38C] focus:bg-white focus:ring-1 focus:ring-[#BDA38C] rounded-2xl outline-none transition-all font-sans text-[#4B433D] placeholder-[#B4AAA1] font-medium shadow-xs"
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-[9px] font-extrabold tracking-widest text-[#8D8178] uppercase mb-1.5 font-sans select-none">
              ZIP CODE
            </label>
            <input
              type="text"
              placeholder="Enter ZIP Code"
              value={zipCode}
              onChange={(e) => handleFieldChange('zipCode', e.target.value)}
              className="w-full px-3 py-3.5 text-xs sm:text-sm bg-white/80 backdrop-blur-xs border border-[#E7DBD0] focus:border-[#BDA38C] focus:bg-white focus:ring-1 focus:ring-[#BDA38C] rounded-2xl outline-none transition-all font-sans text-[#4B433D] placeholder-[#B4AAA1] font-medium shadow-xs"
            />
          </div>

        </div>

      </div>

      {/* Agreed to Terms Checkbox */}
      <div className="mt-4 pt-4 border-t border-[#E7DBD0]/40">
        <label className="flex items-center gap-3 text-xs text-[#8D8178] font-bold cursor-pointer select-none font-sans">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => onAgreedToTermsChange?.(e.target.checked)}
            className="w-4.5 h-4.5 rounded-md border-[#E7DBD0] text-[#214F34] focus:ring-[#214F34] cursor-pointer bg-white/90 transition-all duration-200 shrink-0"
          />
          <span className="leading-none select-none">
            I have read and agreed to the <span className="text-[#214F34] hover:text-[#5F8A5E] bg-[#BDA38C]/15 px-1.5 py-0.5 rounded-md font-extrabold underline decoration-[#BDA38C] decoration-2 underline-offset-3 cursor-pointer transition-colors duration-200">Terms & Conditions</span>
          </span>
        </label>
      </div>

    </div>
  );
};
