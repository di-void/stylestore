import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "dist/src",
  format: ["esm"],
  target: "es2022",
  splitting: false,
  clean: true,
});
