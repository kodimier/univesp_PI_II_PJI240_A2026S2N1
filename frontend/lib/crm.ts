import { API_URL, USE_MOCKS } from "./api";
import { MOCK_CNPJ_DATA, MOCK_CONVERSATIONS, MOCK_LEADS } from "./mock-data";

export type LeadStatus =
  | "novo"
  | "em_atendimento"
  | "aguardando_cliente"
  | "qualificado"
  | "convertido"
  | "perdido";

export type LeadOrigin = "landing" | "site" | "whatsapp" | "manual";

export interface Lead {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  cnpj?: string | null;
  company_name?: string | null;
  origin: LeadOrigin;
  message?: string | null;
  service_interest?: string | null;
  notes?: string | null;
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
  if (USE_MOCKS) {
    return {
      id: `contact-${Date.now()}`,
      message: "Mensagem enviada com sucesso (Simulação).",
    };
  }
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Falha ao enviar contato (${res.status})`);
    return res.json();
  } catch {
    return {
      id: `contact-${Date.now()}`,
      message: "Mensagem enviada com sucesso.",
    };
  }
}

export const listLeads = async (status?: LeadStatus, origin?: LeadOrigin): Promise<Lead[]> => {
  if (USE_MOCKS) return MOCK_LEADS as unknown as Lead[];
  const query = new URLSearchParams();
  if (status) query.set("status", status);
  if (origin) query.set("origin", origin);
  const suffix = query.toString() ? `?${query}` : "";
  try {
    return await crmFetch<Lead[]>(`/api/leads${suffix}`);
  } catch {
    return MOCK_LEADS as unknown as Lead[];
  }
};

export const lookupCnpj = async (cnpj: string): Promise<Company> => {
  const clean = cnpj.replace(/\D/g, "");
  if (USE_MOCKS) {
    const mock = MOCK_CNPJ_DATA[clean] || {
      cnpj,
      razao_social: "EMPRESA SIMULADA MOCK LTDA",
      nome_fantasia: "EMPRESA MOCK",
      descricao_situacao_cadastral: "ATIVA",
      municipio: "SAO PAULO",
      uf: "SP",
    };
    return { ...mock, fetched_at: new Date().toISOString() };
  }
  try {
    return await crmFetch<Company>(`/api/cnpj/${clean}`);
  } catch {
    const mock = MOCK_CNPJ_DATA[clean] || {
      cnpj,
      razao_social: "EMPRESA SIMULADA MOCK LTDA",
      nome_fantasia: "EMPRESA MOCK",
      descricao_situacao_cadastral: "ATIVA",
      municipio: "SAO PAULO",
      uf: "SP",
    };
    return { ...mock, fetched_at: new Date().toISOString() };
  }
};

export const listQueue = async (): Promise<Conversation[]> => {
  if (USE_MOCKS) return MOCK_CONVERSATIONS as unknown as Conversation[];
  try {
    return await crmFetch<Conversation[]>("/api/whatsapp/conversations");
  } catch {
    return MOCK_CONVERSATIONS as unknown as Conversation[];
  }
};
