import { MOCK_ASSETS, MOCK_SERVICES } from "./mock-data";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
export const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Asset {
  id: string;
  name: string;
  url: string;
  mime_type: string;
  category: string;
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export const getServices = async (): Promise<Service[]> => {
  if (USE_MOCKS) return MOCK_SERVICES;
  try {
    return await apiFetch<Service[]>("/api/services");
  } catch {
    return MOCK_SERVICES;
  }
};

export const getAssets = async (): Promise<Asset[]> => {
  if (USE_MOCKS) return MOCK_ASSETS;
  try {
    return await apiFetch<Asset[]>("/api/assets");
  } catch {
    return MOCK_ASSETS;
  }
};

export function assetsByCategory(assets: Asset[]): Record<string, Asset[]> {
  return assets.reduce<Record<string, Asset[]>>((acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  }, {});
}
