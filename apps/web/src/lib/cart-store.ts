import { persistentAtom } from "@nanostores/persistent";
import type { ApiProduct } from "./api/products";

const CART_STORAGE_KEY = "stylestore.cart.v1";

export interface CartItem {
  product: ApiProduct;
  quantity: number;
  size: string;
  color: string;
}

function safeParseCart(value: string): CartItem[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export const $cartStore = persistentAtom<CartItem[]>(CART_STORAGE_KEY, [], {
  encode: JSON.stringify,
  decode: safeParseCart,
});

export function getCartTotal(cart: CartItem[] = $cartStore.get()) {
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
}

export function addToCart(
  product: ApiProduct,
  size: string,
  color: string,
  quantity: number,
) {
  const cart = $cartStore.get();
  const existingItem = cart.find(
    (item) =>
      item.product.id === product.id &&
      item.size === size &&
      item.color === color,
  );

  const nextCart = existingItem
    ? cart.map((item) =>
        item.product.id === product.id &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    : [...cart, { product, size, color, quantity }];

  $cartStore.set(nextCart);
}

export function removeFromCart(productId: string, size: string, color: string) {
  const nextCart = $cartStore
    .get()
    .filter(
      (item) =>
        !(
          item.product.id === productId &&
          item.size === size &&
          item.color === color
        ),
    );

  $cartStore.set(nextCart);
}

export function updateQuantity(
  productId: string,
  size: string,
  color: string,
  quantity: number,
) {
  if (quantity <= 0) {
    removeFromCart(productId, size, color);
    return;
  }

  const nextCart = $cartStore
    .get()
    .map((item) =>
      item.product.id === productId &&
      item.size === size &&
      item.color === color
        ? { ...item, quantity }
        : item,
    );

  $cartStore.set(nextCart);
}

export function clearCart() {
  $cartStore.set([]);
}
