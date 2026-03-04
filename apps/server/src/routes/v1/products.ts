import { Router } from "express";
import { z } from "zod";
import {
  getProductByIdHandler,
  getProductCategoriesHandler,
  getProductsByCollectionsHandler,
  getProductsListingHandler,
  getRelatedProductsHandler,
} from "../../modules/products/handlers.js";
import {
  productIdParamsSchema,
  productsByCollectionsQuerySchema,
  productsListingQuerySchema,
  relatedProductsQuerySchema,
} from "@stylestore/contracts";

export const productsRouter = Router();

productsRouter.get("/by-collections", async (req, res) => {
  const parsed = productsByCollectionsQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: z.formatError(parsed.error) });
    return;
  }

  const data = await getProductsByCollectionsHandler(parsed.data);

  res.status(200).json(data);
});

productsRouter.get("/listing", async (req, res) => {
  const parsed = productsListingQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: z.formatError(parsed.error) });
    return;
  }

  const data = await getProductsListingHandler(parsed.data);
  res.status(200).json(data);
});

productsRouter.get("/categories", async (_req, res) => {
  const data = await getProductCategoriesHandler();

  res.status(200).json(data);
});

productsRouter.get("/related", async (req, res) => {
  const parsed = relatedProductsQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({ error: z.formatError(parsed.error) });
    return;
  }

  const data = await getRelatedProductsHandler(parsed.data);

  res.status(200).json(data);
});

productsRouter.get("/:id", async (req, res) => {
  const parsed = productIdParamsSchema.safeParse(req.params);

  if (!parsed.success) {
    res.status(400).json({ error: z.formatError(parsed.error) });
    return;
  }

  const data = await getProductByIdHandler(parsed.data);

  if (!data) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.status(200).json(data);
});
