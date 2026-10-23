const DEMO_KEY = "pgavcb_demo";

/**
 * Indica se as telas devem usar os dados fictícios de `mock-data`.
 * Ativa com NEXT_PUBLIC_USE_MOCKS=true ou abrindo qualquer página com `?demo=1`
 * (fica lembrado na aba até `?demo=0`), para o cliente ver o painel sem backend.
 */
export function isMockMode(): boolean {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") return true;
  if (typeof window === "undefined") return false;
  try {
    const demo = new URLSearchParams(window.location.search).get("demo");
    if (demo === "1") sessionStorage.setItem(DEMO_KEY, "1");
    if (demo === "0") sessionStorage.removeItem(DEMO_KEY);
    return sessionStorage.getItem(DEMO_KEY) === "1";
  } catch {
    return false;
  }
}

/** Em desenvolvimento, se o backend cair, usa os mocks; em produção, o erro chega à tela. */
export const MOCK_FALLBACK = process.env.NODE_ENV !== "production";
