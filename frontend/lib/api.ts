const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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

export const getServices = () => apiFetch<Service[]>("/api/services");
export const getAssets = () => apiFetch<Asset[]>("/api/assets");

export function assetsByCategory(assets: Asset[]): Record<string, Asset[]> {
  return assets.reduce<Record<string, Asset[]>>((acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  }, {});
}
