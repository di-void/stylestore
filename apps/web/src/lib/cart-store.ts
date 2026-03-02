import type { ApiProduct } from "./api/products";

const CART_STORAGE_KEY = "stylestore.cart.v1";
const ORDERS_STORAGE_KEY = "stylestore.orders.v1";

export interface CartItem {
  product: ApiProduct;
  quantity: number;
  size: string;
  color: string;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
  shippingAddress: ShippingAddress;
}

const listeners = new Set<() => void>();

interface CartState {
  cart: CartItem[];
  orders: Order[];
}

const emptyState: CartState = {
  cart: [],
  orders: [],
};

let state: CartState = emptyState;
let initialized = false;

function isBrowser() {
  return typeof window !== "undefined";
}

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function readCart(): CartItem[] {
  if (!isBrowser()) {
    return [];
  }

  return safeParse(
    window.localStorage.getItem(CART_STORAGE_KEY),
    [] as CartItem[],
  );
}

function readOrders(): Order[] {
  if (!isBrowser()) {
    return [];
  }

  return safeParse(
    window.localStorage.getItem(ORDERS_STORAGE_KEY),
    [] as Order[],
  );
}

function writeCart(cart: CartItem[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function writeOrders(orders: Order[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

function notify() {
  listeners.forEach((listener) => listener());
}

function ensureState() {
  if (initialized) {
    return;
  }

  initialized = true;
  state = {
    cart: readCart(),
    orders: readOrders(),
  };
}

function setState(nextState: CartState) {
  state = nextState;
  writeCart(nextState.cart);
  writeOrders(nextState.orders);
  notify();
}

export function subscribe(listener: () => void) {
  ensureState();
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY || event.key === ORDERS_STORAGE_KEY) {
      state = {
        cart: readCart(),
        orders: readOrders(),
      };
      notify();
    }
  };

  if (isBrowser()) {
    window.addEventListener("storage", onStorage);
  }

  return () => {
    listeners.delete(listener);
    if (isBrowser()) {
      window.removeEventListener("storage", onStorage);
    }
  };
}

export function getState() {
  ensureState();
  return state;
}

export function getCartTotal(cart: CartItem[] = getState().cart) {
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
  const cart = getState().cart;
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

  setState({
    ...getState(),
    cart: nextCart,
  });
}

export function removeFromCart(productId: string, size: string, color: string) {
  const nextCart = getState().cart.filter(
    (item) =>
      !(
        item.product.id === productId &&
        item.size === size &&
        item.color === color
      ),
  );

  setState({
    ...getState(),
    cart: nextCart,
  });
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

  const nextCart = getState().cart.map((item) =>
    item.product.id === productId && item.size === size && item.color === color
      ? { ...item, quantity }
      : item,
  );

  setState({
    ...getState(),
    cart: nextCart,
  });
}

export function clearCart() {
  setState({
    ...getState(),
    cart: [],
  });
}

export function placeOrder(shippingAddress: ShippingAddress) {
  const currentState = getState();
  const cart = currentState.cart;
  if (cart.length === 0) {
    return;
  }

  const newOrder: Order = {
    id: `ORD-${Date.now()}`,
    items: cart,
    total: getCartTotal(cart),
    date: new Date().toISOString(),
    status: "Processing",
    shippingAddress,
  };

  setState({
    cart: [],
    orders: [newOrder, ...currentState.orders],
  });
}
