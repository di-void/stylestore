import { z } from "zod";

function getApiBaseUrl() {
  return import.meta.env.PUBLIC_API_BASE_URL ?? "http://localhost:4000";
}

export async function requestJson<T>(path: string, schema: z.ZodSchema<T>) {
  const url = new URL(path, getApiBaseUrl());
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const payload = await response.json();
  return schema.parse(payload);
}
