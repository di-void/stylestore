import { z } from "zod";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function getApiBaseUrl() {
  return import.meta.env.PUBLIC_API_BASE_URL ?? "http://localhost:4000";
}

export async function requestJson<T>(path: string, schema: z.ZodSchema<T>) {
  const url = new URL(path, getApiBaseUrl());
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(response.status, `API request failed: ${response.status}`);
  }

  const payload = await response.json();
  return schema.parse(payload);
}
