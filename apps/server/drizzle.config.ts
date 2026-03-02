import "dotenv/config";
import { env } from "./src/env.js";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  casing: "snake_case",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
