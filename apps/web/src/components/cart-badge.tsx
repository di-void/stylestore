import { useStore } from "@nanostores/react";
import { $cartStore } from "../lib/cart-store";

export function CartBadge() {
  const cart = useStore($cartStore);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <a
      href="/cart"
      className="w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition relative"
    >
      <img src="/icons/cart.svg" alt="Cart" className="w-5 h-5 invert" />
      {cartItemsCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
          {cartItemsCount}
        </span>
      )}
    </a>
  );
}
