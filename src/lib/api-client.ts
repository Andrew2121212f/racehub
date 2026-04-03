// API-клиент для Vivat Sport Marketing (адаптировано из fastscore)
import { getAccessToken } from "./auth";
import { API_BASE_URL, API_REF, CACHE_TTL } from "./constants";
import { getCached, setCached, deleteCached } from "./cache";

// Универсальный запрос к API с кешированием и авто-retry на 401
async function apiFetch<T>(path: string, params: Record<string, string> = {}, cacheTtl?: number): Promise<T> {
  const cacheKey = `api:${path}:${JSON.stringify(params)}`;

  if (cacheTtl) {
    const cached = getCached<T>(cacheKey);
    if (cached) return cached;
  }

  const token = await getAccessToken();
  const url = new URL(path, API_BASE_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    deleteCached("oauth_token");
    const newToken = await getAccessToken();
    const retryRes = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${newToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    if (!retryRes.ok) throw new Error(`API error: ${retryRes.status}`);
    const data = await retryRes.json();
    if (cacheTtl) setCached(cacheKey, data, cacheTtl);
    return data;
  }

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  if (cacheTtl) setCached(cacheKey, data, cacheTtl);
  return data;
}

// Получить список всех видов спорта (для поиска horse racing sportId)
export async function getSports(lng = "en") {
  return apiFetch<Array<{ id: number; name: string }>>(
    "/gateway/marketing/datafeed/directories/api/v2/sports",
    { languages: lng },
    CACHE_TTL.DICTIONARIES
  );
}

// Получить предстоящие события по sportId
export async function getPrematchEvents(params: {
  sportIds?: string;
  tournamentIds?: string;
  lng?: string;
  count?: number;
} = {}) {
  return apiFetch<{ count: number; items: Array<Record<string, unknown>> }>(
    "/gateway/marketing/datafeed/prematch/api/v2/sportevents",
    {
      ref: String(API_REF),
      lng: params.lng || "en",
      periods: "0",
      vids: "1",
      types: "1",
      count: String(params.count || 50),
      schemeOfGettingOddsOperations: "GetMainOdds",
      ...(params.sportIds ? { sportIds: params.sportIds } : {}),
      ...(params.tournamentIds ? { tournamentIds: params.tournamentIds } : {}),
    },
    CACHE_TTL.PREMATCH
  );
}

// Получить live-события
export async function getLiveEvents(params: {
  sportIds?: string;
  lng?: string;
  count?: number;
} = {}) {
  return apiFetch<{ count: number; items: Array<Record<string, unknown>> }>(
    "/gateway/marketing/datafeed/live/api/v2/sportevents",
    {
      ref: String(API_REF),
      lng: params.lng || "en",
      periods: "0",
      vids: "1",
      types: "1",
      count: String(params.count || 50),
      schemeOfGettingOddsOperations: "GetMainOdds",
      ...(params.sportIds ? { sportIds: params.sportIds } : {}),
    },
    CACHE_TTL.LIVE
  );
}
