import {
  decodeProductCursor,
  getProductById,
  getProductCategories,
  getProductsByCollections,
  getProductsForListingPage,
  getRelatedProducts,
} from "./queries.js";
import type { Product } from "../../db/schema.js";

import type {
  ProductIdParams,
  ProductResponse,
  ProductsByCollectionsQuery,
  ProductsByCollectionsResponse,
  ProductCategoriesResponse,
  ProductsListingQuery,
  ProductsListingResponse,
  RelatedProductsQuery,
  RelatedProductsResponse,
} from "@stylestore/contracts";

function mapProductDto(product: Product) {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    description: product.description,
    category: product.category,
    collection: product.collection,
    image: product.image,
    sizes: product.sizes,
    colors: product.colors,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export async function getProductsByCollectionsHandler(
  query: ProductsByCollectionsQuery,
): Promise<ProductsByCollectionsResponse> {
  const items = await getProductsByCollections({
    collections: query.collections,
    limit: query.limit,
  });

  return { items: items.map(mapProductDto) };
}

export async function getProductsListingHandler(
  query: ProductsListingQuery,
): Promise<ProductsListingResponse> {
  const page = await getProductsForListingPage({
    search: query.q || undefined,
    category: query.category || undefined,
    limit: query.limit,
    cursor: decodeProductCursor(query.cursor) ?? undefined,
    direction: query.dir,
  });

  return {
    items: page.items.map(mapProductDto),
    totalCount: page.totalCount,
    hasNext: page.hasNext,
    hasPrev: page.hasPrev,
    nextCursor: page.nextCursor ?? null,
    prevCursor: page.prevCursor ?? null,
  };
}

export async function getProductCategoriesHandler(): Promise<ProductCategoriesResponse> {
  const categoryRows = await getProductCategories();
  const categories = Array.from(
    new Set(
      categoryRows
        .map((row) => row.category)
        .filter((category) => category?.trim()),
    ),
  ).sort((a, b) => a.localeCompare(b));

  return { categories };
}

export async function getRelatedProductsHandler(
  query: RelatedProductsQuery,
): Promise<RelatedProductsResponse> {
  const items = await getRelatedProducts({
    category: query.category,
    excludeId: query.excludeId,
    limit: query.limit,
  });

  return { items: items.map(mapProductDto) };
}

export async function getProductByIdHandler(
  params: ProductIdParams,
): Promise<ProductResponse | null> {
  const product = await getProductById(params.id);

  if (!product) {
    return null;
  }

  return { item: mapProductDto(product) };
}
