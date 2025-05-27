import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function AddCartIcon({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`
        absolute top-2 right-2 z-10 flex flex-col items-center
        opacity-0 group-hover:opacity-100
        sm:opacity-0 sm:group-hover:opacity-100
        md:opacity-0 md:group-hover:opacity-100
        lg:opacity-0 lg:group-hover:opacity-100
        xl:opacity-0 xl:group-hover:opacity-100
        max-sm:opacity-100
        transition-opacity duration-300 ease-in-out
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onClick}
        className="p-2 bg-primary-600 bg-opacity-90 rounded-full text-white shadow-md"
        aria-label="Add to cart"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>

      {/* Tooltip */}
      <div
        className={`mt-2 text-xs bg-black text-white px-2 py-1 rounded shadow-sm transition-all duration-200
          ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}
        `}
      >
        Add to cart
      </div>
    </div>
  );
}
