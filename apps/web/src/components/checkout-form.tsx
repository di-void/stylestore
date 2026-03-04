import { useEffect, useState, type FormEvent } from "react";
import { useCart } from "../lib/use-cart";

export function CheckoutForm() {
  const { cart, cartTotal, placeOrder } = useCart();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    if (cart.length === 0) {
      window.location.href = "/cart";
    }
  }, [cart.length]);

  if (cart.length === 0) {
    return null;
  }

  const shipping = cartTotal > 100 ? 0 : 10;
  const total = cartTotal + shipping;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode ||
      !formData.country
    ) {
      setStatusMessage("Please fill in all shipping information");
      return;
    }

    placeOrder({
      name: formData.name,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      country: formData.country,
    });

    setStatusMessage("Order placed successfully! Redirecting to orders...");
    window.location.href = "/orders";
  };

  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-12">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight mb-8">
                  Shipping Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wide font-medium mb-3 opacity-60">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({ ...formData, name: event.target.value })
                      }
                      className="w-full h-[50px] border border-gray-300 px-4 text-sm focus:outline-none focus:border-black transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wide font-medium mb-3 opacity-60">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                      }
                      className="w-full h-[50px] border border-gray-300 px-4 text-sm focus:outline-none focus:border-black transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wide font-medium mb-3 opacity-60">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          address: event.target.value,
                        })
                      }
                      className="w-full h-[50px] border border-gray-300 px-4 text-sm focus:outline-none focus:border-black transition"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wide font-medium mb-3 opacity-60">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(event) =>
                          setFormData({ ...formData, city: event.target.value })
                        }
                        className="w-full h-[50px] border border-gray-300 px-4 text-sm focus:outline-none focus:border-black transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wide font-medium mb-3 opacity-60">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            zipCode: event.target.value,
                          })
                        }
                        className="w-full h-[50px] border border-gray-300 px-4 text-sm focus:outline-none focus:border-black transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wide font-medium mb-3 opacity-60">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          country: event.target.value,
                        })
                      }
                      className="w-full h-[50px] border border-gray-300 px-4 text-sm focus:outline-none focus:border-black transition"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-12">
                <h2 className="text-xl font-black uppercase tracking-tight mb-8">
                  Payment Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wide font-medium mb-3 opacity-60">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          cardNumber: event.target.value,
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      className="w-full h-[50px] border border-gray-300 px-4 text-sm focus:outline-none focus:border-black transition placeholder:opacity-40"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wide font-medium mb-3 opacity-60">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            expiryDate: event.target.value,
                          })
                        }
                        placeholder="MM/YY"
                        className="w-full h-[50px] border border-gray-300 px-4 text-sm focus:outline-none focus:border-black transition placeholder:opacity-40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wide font-medium mb-3 opacity-60">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(event) =>
                          setFormData({ ...formData, cvv: event.target.value })
                        }
                        placeholder="123"
                        className="w-full h-[50px] border border-gray-300 px-4 text-sm focus:outline-none focus:border-black transition placeholder:opacity-40"
                      />
                    </div>
                  </div>

                  <p className="text-xs opacity-60 bg-surface p-4 border border-gray-200">
                    This is a demo checkout. No real payment will be processed.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-[50px] bg-black text-white font-medium text-sm uppercase tracking-wide hover:bg-gray-800 transition"
              >
                Place Order
              </button>

              {statusMessage && <p className="text-sm">{statusMessage}</p>}
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-surface border border-gray-200 p-8 sticky top-24">
              <h2 className="text-xl font-black uppercase tracking-tight mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto">
                {cart.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                    className="flex gap-4 pb-4 border-b border-gray-200"
                  >
                    <div className="w-16 h-20 bg-gray-200 border border-line overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image ?? ""}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1 capitalize">
                        {item.product.name}
                      </p>
                      <p className="text-xs opacity-60">
                        <span className="uppercase">{item.size}</span> |{" "}
                        <span className="uppercase">{item.color}</span> | Qty:{" "}
                        {item.quantity}
                      </p>
                      <p className="text-sm font-medium mt-2">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

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
              </div>

              <div className="flex justify-between">
                <span className="font-black uppercase">Total</span>
                <span className="text-2xl font-black">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
