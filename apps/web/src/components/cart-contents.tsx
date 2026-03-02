import { useCart } from "../lib/use-cart";

export function CartContents() {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-[60vh]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-sm opacity-60 mb-12">
            Add some items to get started
          </p>
          <a
            href="/"
            className="inline-block h-[50px] px-12 bg-black text-white font-medium text-sm uppercase tracking-wide hover:bg-gray-800 transition leading-[50px]"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  const shipping = cartTotal > 100 ? 0 : 10;
  const total = cartTotal + shipping;

  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-12">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="border-t border-gray-200">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                  className="flex gap-6 py-8 border-b border-gray-200"
                >
                  <div className="w-32 h-40 bg-gray-100 border border-line overflow-hidden flex-shrink-0">
                    <a href={`/product/${item.product.id}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    </a>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <a
                        href={`/product/${item.product.id}`}
                        className="capitalize text-lg font-medium hover:opacity-60 transition inline-block mb-2"
                      >
                        {item.product.name}
                      </a>
                      <p className="text-xs opacity-60 uppercase tracking-wide mb-1">
                        {item.product.category}
                      </p>
                      <p className="text-sm opacity-60">
                        Size: <span className="uppercase">{item.size}</span> |
                        Color: <span className="uppercase">{item.color}</span>
                      </p>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="flex items-center gap-3 border border-gray-300">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.color,
                              item.quantity - 1,
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <img
                            src="/icons/minus.svg"
                            alt="Decrease"
                            className="w-4 h-4"
                          />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.color,
                              item.quantity + 1,
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <img
                            src="/icons/plus.svg"
                            alt="Increase"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-medium mb-2">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.size,
                              item.color,
                            )
                          }
                          className="text-xs opacity-60 hover:opacity-100 transition flex items-center gap-1"
                        >
                          <img
                            src="/icons/x.svg"
                            alt="Remove"
                            className="w-3 h-3"
                          />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/"
              className="inline-block mt-8 text-sm opacity-60 hover:opacity-100 transition uppercase tracking-wide"
            >
              ← Continue Shopping
            </a>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-surface border border-gray-200 p-8 sticky top-24">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8 pb-8 border-b border-gray-300">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {cartTotal < 100 && (
                  <p className="text-xs opacity-60">
                    Add ${(100 - cartTotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between mb-8">
                <span className="font-black uppercase">Total</span>
                <span className="text-2xl font-black">${total.toFixed(2)}</span>
              </div>

              <a
                href="/checkout"
                className="block w-full h-[50px] bg-black text-white text-center font-medium text-sm uppercase tracking-wide hover:bg-gray-800 transition mb-3 leading-[50px]"
              >
                Proceed to Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
