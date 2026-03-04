import { useState } from "react";
import type { ApiProduct } from "../lib/api/products";
import { useCart } from "../lib/use-cart";

interface Props {
  product: ApiProduct;
}

export function AddToCartControls({ product }: Props) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setStatusMessage("Please select a size");
      return;
    }

    if (!selectedColor) {
      setStatusMessage("Please select a color");
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    setStatusMessage("Added to cart");
  };

  return (
    <>
      <div className="mb-8">
        <label className="block text-xs uppercase tracking-wide font-medium mb-4 opacity-60">
          Select Size
        </label>
        <div className="flex flex-wrap gap-2">
          {(product.sizes ?? []).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`w-[60px] uppercase h-[40px] border text-sm font-medium transition ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xs uppercase tracking-wide font-medium mb-4 opacity-60">
          Select Color
        </label>
        <div className="flex flex-wrap gap-2">
          {(product.colors ?? []).map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`uppercase px-6 h-[40px] border text-sm font-medium transition ${
                selectedColor === color
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <label className="block text-xs uppercase tracking-wide font-medium mb-4 opacity-60">
          Quantity
        </label>
        <div className="flex items-center gap-3 border border-gray-300 w-fit">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-[50px] h-[50px] flex items-center justify-center hover:bg-gray-100 transition border-r border-gray-300"
          >
            <img src="/icons/minus.svg" alt="Decrease" className="w-4 h-4" />
          </button>
          <span className="text-lg font-medium w-12 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-[50px] h-[50px] flex items-center justify-center hover:bg-gray-100 transition border-l border-gray-300"
          >
            <img src="/icons/plus.svg" alt="Increase" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 h-[50px] bg-black text-white font-medium text-sm uppercase tracking-wide hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>

      {statusMessage && <p className="text-sm">{statusMessage}</p>}
    </>
  );
}
