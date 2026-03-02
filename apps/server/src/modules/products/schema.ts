import { z } from "zod";

export const productsByCollectionsQuerySchema = z.object({
  collections: z
    .string()
    .min(1)
    .transform((value) =>
      value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean),
    ),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : undefined))
    .refine((value) => value === undefined || Number.isFinite(value), {
      message: "limit must be a number",
    })
    .transform((value) => (value === undefined ? undefined : Math.max(1, value)))
    .optional(),
});

export const productsListingQuerySchema = z.object({
  q: z.string().optional().transform((value) => value?.trim() ?? ""),
  category: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? ""),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : undefined))
    .refine((value) => value === undefined || Number.isFinite(value), {
      message: "limit must be a number",
    })
    .transform((value) => (value === undefined ? undefined : Math.max(1, value)))
    .optional(),
  cursor: z.string().optional(),
  dir: z
    .enum(["next", "prev"])
    .optional()
    .transform((value) => value ?? "next"),
});

export const relatedProductsQuerySchema = z.object({
  category: z.string().min(1),
  excludeId: z.string().min(1),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : undefined))
    .refine((value) => value === undefined || Number.isFinite(value), {
      message: "limit must be a number",
    })
    .transform((value) => (value === undefined ? undefined : Math.max(1, value)))
    .optional(),
});

export const productIdParamsSchema = z.object({
  id: z.string().min(1),
});

export const productDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  collection: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  sizes: z.array(z.string()).nullable().optional(),
  colors: z.array(z.string()).nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const productsByCollectionsResponseSchema = z.object({
  items: z.array(productDtoSchema),
});

export const productsListingResponseSchema = z.object({
  items: z.array(productDtoSchema),
  totalCount: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
  nextCursor: z.string().nullable(),
  prevCursor: z.string().nullable(),
});

export const productCategoriesResponseSchema = z.object({
  categories: z.array(z.string()),
});

export const relatedProductsResponseSchema = z.object({
  items: z.array(productDtoSchema),
});

export const productResponseSchema = z.object({
  item: productDtoSchema,
});

export type ProductsByCollectionsQuery = z.infer<
  typeof productsByCollectionsQuerySchema
>;
export type ProductsListingQuery = z.infer<typeof productsListingQuerySchema>;
export type RelatedProductsQuery = z.infer<typeof relatedProductsQuerySchema>;
export type ProductIdParams = z.infer<typeof productIdParamsSchema>;
export type ProductDto = z.infer<typeof productDtoSchema>;
export type ProductsByCollectionsResponse = z.infer<
  typeof productsByCollectionsResponseSchema
>;
export type ProductsListingResponse = z.infer<typeof productsListingResponseSchema>;
export type ProductCategoriesResponse = z.infer<
  typeof productCategoriesResponseSchema
>;
export type RelatedProductsResponse = z.infer<typeof relatedProductsResponseSchema>;
export type ProductResponse = z.infer<typeof productResponseSchema>;
