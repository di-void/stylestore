import { z } from "zod";

import { ApiError, requestJson } from "./index";

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  collection: z.string(),
  image: z.string(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const productsByCollectionsResponseSchema = z.object({
  items: z.array(productSchema),
});

const productCategoriesResponseSchema = z.object({
  categories: z.array(z.string()),
});

const productsListingResponseSchema = z.object({
  items: z.array(productSchema),
  totalCount: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
  nextCursor: z.string().optional(),
  prevCursor: z.string().optional(),
});

const productResponseSchema = z.object({
  item: productSchema,
});

export async function fetchProductsByCollections(options: {
  collections: string[];
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (options.collections.length > 0) {
    params.set("collections", options.collections.join(","));
  }
  if (options.limit) {
    params.set("limit", String(options.limit));
  }

  const query = params.toString();
  return requestJson(
    `/api/v1/products/by-collections${query ? `?${query}` : ""}`,
    productsByCollectionsResponseSchema,
  );
}

export async function fetchProductCategories() {
  const response = await requestJson(
    "/api/v1/products/categories",
    productCategoriesResponseSchema,
  );

  return response.categories;
}

export async function fetchProductsListingPage(options: {
  search?: string;
  category?: string;
  limit?: number;
  cursor?: string | null;
  direction?: "next" | "prev";
}) {
  const params = new URLSearchParams();
  if (options.search) {
    params.set("q", options.search);
  }
  if (options.category) {
    params.set("category", options.category);
  }
  if (options.limit) {
    params.set("limit", String(options.limit));
  }
  if (options.cursor) {
    params.set("cursor", options.cursor);
  }
  if (options.direction) {
    params.set("dir", options.direction);
  }

  const query = params.toString();
  const response = await requestJson(
    `/api/v1/products/listing${query ? `?${query}` : ""}`,
    productsListingResponseSchema,
  );

  return response;
}

export async function fetchProductById(id: string) {
  try {
    const response = await requestJson(
      `/api/v1/products/${encodeURIComponent(id)}`,
      productResponseSchema,
    );

    return response.item;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function fetchRelatedProducts(options: {
  category: string;
  excludeId: string;
  limit?: number;
}) {
  const params = new URLSearchParams();
  params.set("category", options.category);
  params.set("excludeId", options.excludeId);
  if (options.limit) {
    params.set("limit", String(options.limit));
  }

  const query = params.toString();
  const response = await requestJson(
    `/api/v1/products/related?${query}`,
    productsByCollectionsResponseSchema,
  );

  return response.items;
}

export type ApiProduct = z.infer<typeof productSchema>;
