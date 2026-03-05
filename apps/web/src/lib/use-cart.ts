import { useMemo } from "react";
import { useStore } from "@nanostores/react";
import {
  addToCart,
  $cartStore,
  clearCart,
  getCartTotal,
  removeFromCart,
  updateQuantity,
} from "./cart-store";

export function useCart() {
  const cart = useStore($cartStore);

  return useMemo(() => {
    const cartItemsCount = cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    return {
      cart,
      cartItemsCount,
      cartTotal: getCartTotal(cart),
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    };
  }, [cart]);
}
