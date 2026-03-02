export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  collection: string;
  image: string;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "classic white t-shirt",
    price: 29.99,
    description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
    category: "t-shirts",
    collection: "new-this-week",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    sizes: ["xs", "s", "m", "l", "xl"],
    colors: ["white", "black", "gray"]
  },
  {
    id: "2",
    name: "slim fit jeans",
    price: 79.99,
    description: "Modern slim fit jeans made from premium denim. Classic five-pocket design.",
    category: "jeans",
    collection: "new-this-week",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["blue", "black", "light blue"]
  },
  {
    id: "3",
    name: "leather jacket",
    price: 249.99,
    description: "Genuine leather jacket with a timeless design. Durable and stylish.",
    category: "jackets",
    collection: "new-this-week",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    sizes: ["s", "m", "l", "xl"],
    colors: ["black", "brown"]
  },
  {
    id: "4",
    name: "summer dress",
    price: 59.99,
    description: "Flowy summer dress perfect for warm weather. Light and comfortable fabric.",
    category: "dresses",
    collection: "new-this-week",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    sizes: ["xs", "s", "m", "l", "xl"],
    colors: ["floral", "white", "blue"]
  },
  {
    id: "5",
    name: "hoodie sweatshirt",
    price: 49.99,
    description: "Cozy hoodie made from soft cotton blend. Perfect for casual wear.",
    category: "hoodies",
    collection: "seasonal",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "black", "navy"]
  },
  {
    id: "6",
    name: "running shorts",
    price: 34.99,
    description: "Lightweight running shorts with moisture-wicking technology.",
    category: "shorts",
    collection: "seasonal",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
    sizes: ["s", "m", "l", "xl"],
    colors: ["black", "navy", "red"]
  },
  {
    id: "7",
    name: "wool sweater",
    price: 89.99,
    description: "Premium wool sweater that keeps you warm and stylish during cold days.",
    category: "sweaters",
    collection: "seasonal",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    sizes: ["s", "m", "l", "xl"],
    colors: ["beige", "navy", "burgundy"]
  },
  {
    id: "8",
    name: "formal blazer",
    price: 159.99,
    description: "Tailored blazer perfect for professional settings. Classic and elegant design.",
    category: "blazers",
    collection: "seasonal",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["black", "navy", "charcoal"]
  }
];
