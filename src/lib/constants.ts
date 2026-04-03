// Конфигурация API и кеша
export const API_BASE_URL = process.env.API_BASE_URL || "";
export const API_CLIENT_ID = process.env.API_CLIENT_ID || "";
export const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET || "";
export const API_REF = parseInt(process.env.API_REF || "282", 10);

export const CACHE_TTL = {
  TOKEN: 3500,
  DICTIONARIES: 3600,
  PREMATCH: 60,
  LIVE: 10,
} as const;
