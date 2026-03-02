import { useMemo, useSyncExternalStore } from "react";
import {
  addToCart,
  getCartTotal,
  getState,
  placeOrder,
  removeFromCart,
  subscribe,
  updateQuantity,
} from "./cart-store";

export function useCart() {
  const state = useSyncExternalStore(subscribe, getState, getState);

  return useMemo(() => {
    const cartItemsCount = state.cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    return {
      cart: state.cart,
      orders: state.orders,
      cartItemsCount,
      cartTotal: getCartTotal(state.cart),
      addToCart,
      removeFromCart,
      updateQuantity,
      placeOrder,
    };
  }, [state.cart, state.orders]);
}
