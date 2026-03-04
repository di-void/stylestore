import {
  and,
  asc,
  desc,
  eq,
  gt,
  ilike,
  inArray,
  lt,
  ne,
  or,
  sql,
} from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import { db } from "../../db/index.js";
import { products } from "../../db/schema.js";

export interface ProductsByCollectionsOptions {
  collections: string[];
  limit?: number;
}

export async function getProductsByCollections({
  collections,
  limit = 4,
}: ProductsByCollectionsOptions) {
  const normalizedCollections = collections
    .map((collection) => collection?.toLowerCase())
    .filter(Boolean);

  if (normalizedCollections.length === 0) {
    return [];
  }

  return db
    .select()
    .from(products)
    .where(inArray(products.collection, normalizedCollections))
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

export async function getProductCategories() {
  return db.select({ category: products.category }).from(products);
}

interface ProductsListingOptions {
  search?: string;
  category?: string;
}

export async function getProductsForListing({
  search,
  category,
}: ProductsListingOptions) {
  const conditions: (SQL | undefined)[] = [];
  const normalizedSearch = search?.trim();
  const normalizedCategory = category?.trim().toLowerCase();

  if (normalizedCategory) {
    conditions.push(eq(products.category, normalizedCategory));
  }

  if (normalizedSearch) {
    const searchPattern = `%${normalizedSearch}%`;
    conditions.push(
      or(
        ilike(products.name, searchPattern),
        ilike(products.description, searchPattern),
      ),
    );
  }

  const baseQuery = db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt));

  if (conditions.length === 0) {
    return baseQuery;
  }

  return baseQuery.where(and(...conditions));
}

export interface ProductsListingCursor {
  createdAt: Date;
  id: string;
}

const PRODUCTS_CURSOR_SEPARATOR = "|";

export function encodeProductCursor(cursor: ProductsListingCursor) {
  const payload = `${cursor.createdAt.toISOString()}${PRODUCTS_CURSOR_SEPARATOR}${cursor.id}`;
  return Buffer.from(payload).toString("base64url");
}

export function decodeProductCursor(rawCursor?: string | null) {
  if (!rawCursor) {
    return null;
  }

  try {
    const decoded = Buffer.from(rawCursor, "base64url").toString("utf8");
    const [createdAtRaw, id] = decoded.split(PRODUCTS_CURSOR_SEPARATOR);

    if (!createdAtRaw || !id) {
      return null;
    }

    const createdAt = new Date(createdAtRaw);

    if (Number.isNaN(createdAt.getTime())) {
      return null;
    }

    return { createdAt, id };
  } catch {
    return null;
  }
}

interface ProductsListingPageOptions {
  search?: string;
  category?: string;
  limit?: number;
  cursor?: ProductsListingCursor;
  direction?: "next" | "prev";
}

interface ProductsListingPage {
  items: Awaited<ReturnType<typeof getProductsForListing>>;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextCursor?: string;
  prevCursor?: string;
}

export async function getProductsForListingPage({
  search,
  category,
  limit = 12,
  cursor,
  direction = "next",
}: ProductsListingPageOptions): Promise<ProductsListingPage> {
  const filterConditions: (SQL | undefined)[] = [];
  const normalizedSearch = search?.trim();
  const normalizedCategory = category?.trim().toLowerCase();

  if (normalizedCategory) {
    filterConditions.push(eq(products.category, normalizedCategory));
  }

  if (normalizedSearch) {
    const searchPattern = `%${normalizedSearch}%`;
    filterConditions.push(
      or(
        ilike(products.name, searchPattern),
        ilike(products.description, searchPattern),
      ),
    );
  }

  const pageConditions = [...filterConditions];

  if (cursor) {
    const cursorCondition =
      direction === "prev"
        ? or(
            gt(products.createdAt, cursor.createdAt),
            and(
              eq(products.createdAt, cursor.createdAt),
              gt(products.id, cursor.id),
            ),
          )
        : or(
            lt(products.createdAt, cursor.createdAt),
            and(
              eq(products.createdAt, cursor.createdAt),
              lt(products.id, cursor.id),
            ),
          );
    pageConditions.push(cursorCondition);
  }

  const orderBy =
    direction === "prev"
      ? [asc(products.createdAt), asc(products.id)]
      : [desc(products.createdAt), desc(products.id)];

  const pageQuery = db
    .select()
    .from(products)
    .orderBy(...orderBy)
    .limit(limit + 1);

  const filteredPageQuery =
    pageConditions.length > 0
      ? pageQuery.where(and(...pageConditions))
      : pageQuery;

  const pageRows = await filteredPageQuery;
  const hasMore = pageRows.length > limit;
  const pageItems = pageRows.slice(0, limit);
  const items = direction === "prev" ? pageItems.reverse() : pageItems;

  const countQuery = db.select({ count: sql<number>`count(*)` }).from(products);
  const filteredCountQuery =
    filterConditions.length > 0
      ? countQuery.where(and(...filterConditions))
      : countQuery;
  const countRows = await filteredCountQuery;
  const totalCount = Number(countRows[0]?.count ?? 0);

  const hasPrev = direction === "next" ? Boolean(cursor) : hasMore;
  const hasNext = direction === "next" ? hasMore : Boolean(cursor);
  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const prevCursor =
    hasPrev && firstItem
      ? encodeProductCursor({
          createdAt: firstItem.createdAt,
          id: firstItem.id,
        })
      : undefined;
  const nextCursor =
    hasNext && lastItem
      ? encodeProductCursor({
          createdAt: lastItem.createdAt,
          id: lastItem.id,
        })
      : undefined;

  return { items, totalCount, hasNext, hasPrev, nextCursor, prevCursor };
}

export async function getProductById(id: string) {
  if (!id) {
    return null;
  }

  const rows = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return rows[0] ?? null;
}

interface RelatedProductsOptions {
  category: string;
  excludeId: string;
  limit?: number;
}

export async function getRelatedProducts({
  category,
  excludeId,
  limit = 4,
}: RelatedProductsOptions) {
  if (!category) {
    return [];
  }

  return db
    .select()
    .from(products)
    .where(and(eq(products.category, category), ne(products.id, excludeId)))
    .orderBy(desc(products.createdAt))
    .limit(limit);
}
