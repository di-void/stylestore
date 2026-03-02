import { Router } from "express";

import {
  getProductByIdModule,
  getProductCategoriesModule,
  getProductsByCollectionsModule,
  getProductsListingModule,
  getRelatedProductsModule,
  productIdParamsSchema,
  productsByCollectionsQuerySchema,
  productsListingQuerySchema,
  relatedProductsQuerySchema,
} from "../../modules/products/index.js";

export const productsRouter = Router();

productsRouter.get("/by-collections", async (req, res) => {
  const parsed = productsByCollectionsQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const data = await getProductsByCollectionsModule(parsed.data);

  res.status(200).json(data);
});

productsRouter.get("/listing", async (req, res) => {
  const parsed = productsListingQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const data = await getProductsListingModule(parsed.data);

  res.status(200).json(data);
});

productsRouter.get("/categories", async (_req, res) => {
  const data = await getProductCategoriesModule();

  res.status(200).json(data);
});

productsRouter.get("/related", async (req, res) => {
  const parsed = relatedProductsQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const data = await getRelatedProductsModule(parsed.data);

  res.status(200).json(data);
});

productsRouter.get("/:id", async (req, res) => {
  const parsed = productIdParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const data = await getProductByIdModule(parsed.data);

  if (!data) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.status(200).json(data);
});
