import { API_URL } from "./api";

export type LeadStatus =
  | "novo"
  | "em_atendimento"
  | "aguardando_cliente"
  | "convertido"
  | "perdido";

export type LeadOrigin = "landing" | "whatsapp" | "manual";

export interface Lead {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  cnpj?: string | null;
  company_name?: string | null;
  origin: LeadOrigin;
  message?: string | null;
  status: LeadStatus;
  attendant_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Company {
  cnpj: string;
  razao_social?: string | null;
  nome_fantasia?: string | null;
  descricao_situacao_cadastral?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  bairro?: string | null;
  municipio?: string | null;
  uf?: string | null;
  cep?: string | null;
  fetched_at: string;
}

export interface Conversation {
  id: string;
  lead_id?: string | null;
  attendant_id?: string | null;
  whatsapp_phone: string;
  status: string;
  created_at: string;
  updated_at: string;
}

function crmHeaders(): HeadersInit {
  const token = process.env.NEXT_PUBLIC_CRM_API_TOKEN;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["X-API-Key"] = token;
  return headers;
}

async function crmFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...crmHeaders(), ...init?.headers },
  });
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export async function sendContact(payload: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ id: string; message: string }> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Falha ao enviar contato (${res.status})`);
  return res.json();
}

export const listLeads = (status?: LeadStatus, origin?: LeadOrigin) => {
  const query = new URLSearchParams();
  if (status) query.set("status", status);
  if (origin) query.set("origin", origin);
  const suffix = query.toString() ? `?${query}` : "";
  return crmFetch<Lead[]>(`/api/leads${suffix}`);
};

export const lookupCnpj = (cnpj: string) =>
  crmFetch<Company>(`/api/cnpj/${cnpj.replace(/\D/g, "")}`);

export const listQueue = () => crmFetch<Conversation[]>("/api/whatsapp/conversations");
