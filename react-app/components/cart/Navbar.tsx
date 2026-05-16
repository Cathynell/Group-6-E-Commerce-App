import {
  Search,
  ShoppingBag,
  UserCircle2,
  Heart,
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-[#E5D9CE] pb-5">

      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-10">

          {/* SEARCH */}
          <div className="hidden items-center gap-2 rounded-full bg-[#EEE8E1] px-4 py-2 lg:flex">

            <Search size={15} className="text-[#8D847B]" />

            <input
              type="text"
              placeholder="Search for more products"
              className="w-[210px] bg-transparent text-xs font-medium text-[#5F5750] outline-none placeholder:text-[#A79D95]"
            />
          </div>
        </div>

        {/* LOGO */}
        <h1 className="font-plaster text-[2.4rem] leading-none">

          <span className="text-[#5F8A5E]">
            v
          </span>

          <span className="text-[#B7A898]">
            ale
          </span>
        </h1>

        {/* RIGHT */}
        <div className="flex items-center gap-5 text-[0.92rem] font-semibold tracking-[0.02em] text-[#4C5C49]">

          <button className="transition hover:text-[#5F8A5E]">
            Home
          </button>

          <button className="transition hover:text-[#5F8A5E]">
            Deals %
          </button>

          <button className="transition hover:text-[#5F8A5E]">
            New In
          </button>

          <Heart
            size={17}
            className="cursor-pointer transition hover:text-[#5F8A5E]"
          />

          <ShoppingBag
            size={18}
            className="cursor-pointer transition hover:text-[#5F8A5E]"
          />

          <UserCircle2
            size={19}
            className="cursor-pointer transition hover:text-[#5F8A5E]"
          />
        </div>
      </div>
    </nav>
  );
}