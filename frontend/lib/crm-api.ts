import {
  Attendant,
  AttendantCreate,
  CnpjData,
  Conversation,
  Lead,
  LeadCreate,
  LeadOrigin,
  LeadStatus,
  Message,
} from "./crm-types";
import {
  MOCK_ATTENDANTS,
  MOCK_CNPJ_DATA,
  MOCK_CONVERSATIONS,
  MOCK_LEADS,
  MOCK_MESSAGES,
} from "./mock-data";
import { isMockMode, MOCK_FALLBACK } from "./mock-mode";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// Estado em memória/local para manter interatividade no modo Mock
const mockLeadsState: Lead[] = [...MOCK_LEADS];
const mockConversationsState: Conversation[] = [...MOCK_CONVERSATIONS];
const mockMessagesState: Record<string, Message[]> = { ...MOCK_MESSAGES };
const mockAttendantsState: Attendant[] = [...MOCK_ATTENDANTS];

export function getCrmToken(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("crm_token") || process.env.NEXT_PUBLIC_CRM_TOKEN || "";
  }
  return process.env.NEXT_PUBLIC_CRM_TOKEN || "";
}

export function setCrmToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("crm_token", token);
  }
}

export function getActiveAttendantId(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("crm_active_attendant_id") || "operador-1";
  }
  return "operador-1";
}

export function setActiveAttendantId(id: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("crm_active_attendant_id", id);
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getCrmToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    headers["X-API-Key"] = token;
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error("Não foi possível conectar ao servidor do CRM.");
  }

  if (!res.ok) {
    let errorDetail = `Erro HTTP ${res.status}`;
    try {
      const json = await res.json();
      if (json.detail) errorDetail = json.detail;
    } catch {
      // ignore
    }
    throw new Error(errorDetail);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

// ==================== WhatsApp CRM ====================

/**
 * Recupera a fila completa de conversas do WhatsApp (sem paginação no MVP).
 * @returns {Promise<Conversation[]>} Lista de conversas ordenadas por atualização.
 */
export const getConversations = async (): Promise<Conversation[]> => {
  if (isMockMode()) return [...mockConversationsState];
  try {
    return await request<Conversation[]>("/api/whatsapp/conversations");
  } catch (e) {
    if (!MOCK_FALLBACK) throw e;
    console.warn("Backend indisponível, usando mock fallback:", e);
    return [...mockConversationsState];
  }
};

/**
 * Recupera os detalhes de uma conversa específica pelo ID.
 * @param {string} conversationId - UUID da conversa.
 * @returns {Promise<Conversation>} Detalhes da conversa.
 */
export const getConversation = async (conversationId: string): Promise<Conversation> => {
  if (isMockMode()) {
    const conv = mockConversationsState.find((c) => c.id === conversationId);
    if (!conv) throw new Error("Conversa não encontrada");
    return conv;
  }
  return request<Conversation>(`/api/whatsapp/conversations/${conversationId}`);
};

/**
 * Recupera o histórico completo de mensagens de uma conversa.
 * @param {string} conversationId - UUID da conversa.
 * @returns {Promise<Message[]>} Lista de mensagens (inbound e outbound).
 */
export const getConversationMessages = async (
  conversationId: string
): Promise<Message[]> => {
  if (isMockMode()) return [...(mockMessagesState[conversationId] || [])];
  try {
    return await request<Message[]>(`/api/whatsapp/conversations/${conversationId}/messages`);
  } catch (e) {
    if (!MOCK_FALLBACK) throw e;
    return [...(mockMessagesState[conversationId] || [])];
  }
};

/**
 * Atribui uma conversa a um operador específico (Assumir atendimento).
 * Muda o status da conversa para 'em_atendimento'.
 * @param {string} conversationId - UUID da conversa.
 * @param {string} attendantId - ID do operador logado.
 * @returns {Promise<Conversation>} Conversa atualizada.
 */
export const claimConversation = async (
  conversationId: string,
  attendantId: string
): Promise<Conversation> => {
  if (isMockMode()) {
    const idx = mockConversationsState.findIndex((c) => c.id === conversationId);
    if (idx !== -1) {
      mockConversationsState[idx] = {
        ...mockConversationsState[idx],
        attendant_id: attendantId,
        status: "em_atendimento",
        updated_at: new Date().toISOString(),
      };
      return mockConversationsState[idx];
    }
    throw new Error("Conversa não encontrada");
  }
  return request<Conversation>(`/api/whatsapp/conversations/${conversationId}/claim`, {
    method: "PATCH",
    body: JSON.stringify({ attendant_id: attendantId }),
  });
};

/**
 * Encerra uma conversa ativa.
 * Muda o status para 'fechada'.
 * @param {string} conversationId - UUID da conversa.
 * @returns {Promise<Conversation>} Conversa atualizada.
 */
export const closeConversation = async (
  conversationId: string
): Promise<Conversation> => {
  if (isMockMode()) {
    const idx = mockConversationsState.findIndex((c) => c.id === conversationId);
    if (idx !== -1) {
      mockConversationsState[idx] = {
        ...mockConversationsState[idx],
        status: "fechada",
        updated_at: new Date().toISOString(),
      };
      return mockConversationsState[idx];
    }
    throw new Error("Conversa não encontrada");
  }
  return request<Conversation>(`/api/whatsapp/conversations/${conversationId}/close`, {
    method: "PATCH",
  });
};

/**
 * Envia uma resposta em texto para o cliente no WhatsApp.
 * @param {string} conversationId - UUID da conversa.
 * @param {string} body - Texto da mensagem a ser enviada.
 * @returns {Promise<Message>} A mensagem outbound gerada.
 */
export const sendWhatsAppMessage = async (
  conversationId: string,
  body: string
): Promise<Message> => {
  if (isMockMode()) {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: conversationId,
      direction: "outbound",
      body,
      sent_at: new Date().toISOString(),
    };
    if (!mockMessagesState[conversationId]) {
      mockMessagesState[conversationId] = [];
    }
    mockMessagesState[conversationId].push(newMsg);
    return newMsg;
  }
  return request<Message>(`/api/whatsapp/conversations/${conversationId}/messages`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
};

// ==================== Leads ====================

export const listLeads = async (filters?: {
  status?: LeadStatus;
  origin?: LeadOrigin;
}): Promise<Lead[]> => {
  if (isMockMode()) {
    let items = [...mockLeadsState];
    if (filters?.status) items = items.filter((i) => i.status === filters.status);
    if (filters?.origin) items = items.filter((i) => i.origin === filters.origin);
    return items;
  }
  try {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.origin) params.append("origin", filters.origin);
    const query = params.toString() ? `?${params.toString()}` : "";
    return await request<Lead[]>(`/api/leads${query}`);
  } catch (e) {
    if (!MOCK_FALLBACK) throw e;
    return [...mockLeadsState];
  }
};

export const getLead = async (leadId: string): Promise<Lead> => {
  if (isMockMode()) {
    const lead = mockLeadsState.find((l) => l.id === leadId);
    if (!lead) throw new Error("Lead não encontrado");
    return lead;
  }
  return request<Lead>(`/api/leads/${leadId}`);
};

export const createLead = async (payload: LeadCreate): Promise<Lead> => {
  if (isMockMode()) {
    const newLead: Lead = {
      ...payload,
      id: `lead-${Date.now()}`,
      origin: payload.origin || "manual",
      status: "novo",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockLeadsState.unshift(newLead);
    return newLead;
  }
  return request<Lead>("/api/leads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateLeadStatus = async (
  leadId: string,
  status: LeadStatus
): Promise<Lead> => {
  if (isMockMode()) {
    const idx = mockLeadsState.findIndex((l) => l.id === leadId);
    if (idx !== -1) {
      mockLeadsState[idx] = {
        ...mockLeadsState[idx],
        status,
        updated_at: new Date().toISOString(),
      };
      return mockLeadsState[idx];
    }
    throw new Error("Lead não encontrado");
  }
  return request<Lead>(`/api/leads/${leadId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

// ==================== Atendentes ====================

export const listAttendants = async (): Promise<Attendant[]> => {
  if (isMockMode()) return [...mockAttendantsState];
  try {
    return await request<Attendant[]>("/api/attendants");
  } catch (e) {
    if (!MOCK_FALLBACK) throw e;
    return [...mockAttendantsState];
  }
};

export const createAttendant = async (
  payload: AttendantCreate
): Promise<Attendant> => {
  if (isMockMode()) {
    const newAtt: Attendant = {
      ...payload,
      id: `operador-${Date.now()}`,
      active: payload.active ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockAttendantsState.push(newAtt);
    return newAtt;
  }
  return request<Attendant>("/api/attendants", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const deleteAttendant = async (attendantId: string): Promise<void> => {
  if (isMockMode()) {
    const index = mockAttendantsState.findIndex((attendant) => attendant.id === attendantId);
    if (index !== -1) {
      mockAttendantsState.splice(index, 1);
    }
    return;
  }

  await request<void>(`/api/attendants/${attendantId}`, {
    method: "DELETE",
  });
};

// ==================== BrasilAPI / CNPJ ====================

export const fetchCnpj = async (cnpj: string): Promise<CnpjData> => {
  const clean = cnpj.replace(/\D/g, "");
  if (isMockMode()) {
    return (
      MOCK_CNPJ_DATA[clean] || {
        cnpj,
        razao_social: "EMPRESA SIMULADA MOCK LTDA",
        nome_fantasia: "EMPRESA MOCK",
        municipio: "SAO PAULO",
        uf: "SP",
        descricao_situacao_cadastral: "ATIVA",
      }
    );
  }
  return request<CnpjData>(`/api/cnpj/${clean}`);
};
