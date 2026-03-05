import { Router } from "express";
import { productsRouter } from "./products.js";

export const V1Router = Router();

V1Router.get("/status", (_req, res) => {
  res.status(200).json({ status: "ok", version: "v1" });
});

V1Router.use("/products", productsRouter);
