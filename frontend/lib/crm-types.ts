/**
 * Status possíveis de um Lead no funil de vendas/atendimento.
 */
export type LeadStatus =
  | "novo"
  | "em_atendimento"
  | "aguardando_cliente"
  | "qualificado"
  | "convertido"
  | "perdido";

/**
 * Origem de captação do Lead.
 */
export type LeadOrigin = "landing" | "site" | "whatsapp" | "manual";

/**
 * Representa um Lead (potencial cliente) no sistema de CRM.
 */
export interface Lead {
  /** Identificador único do Lead */
  id: string;
  /** Nome completo ou razão social do Lead */
  name: string;
  /** Telefone de contato (opcional) */
  phone?: string | null;
  /** E-mail corporativo ou pessoal (opcional) */
  email?: string | null;
  /** CNPJ associado ao Lead, se for pessoa jurídica (opcional) */
  cnpj?: string | null;
  /** Nome fantasia da empresa do Lead (opcional) */
  company_name?: string | null;
  /** Canal de onde o Lead foi captado */
  origin: LeadOrigin;
  /** Mensagem inicial enviada pelo Lead (ex: formulário de contato) */
  message?: string | null;
  /** Serviço específico que o Lead tem interesse (ex: AVCB, CLCB) */
  service_interest?: string | null;
  /** Anotações internas feitas pelos operadores sobre o Lead */
  notes?: string | null;
  /** Etapa atual do Lead no funil */
  status: LeadStatus;
  /** ID do operador/atendente responsável pelo Lead */
  attendant_id?: string | null;
  /** Data e hora de criação do registro (ISO) */
  created_at: string;
  /** Data e hora da última atualização do registro (ISO) */
  updated_at: string;
}

/**
 * Dados de uma empresa retornados pela integração com a BrasilAPI via CNPJ.
 */
export interface Company {
  /** CNPJ formatado ou apenas números */
  cnpj: string;
  /** Razão social registrada na Receita Federal */
  razao_social?: string | null;
  /** Nome fantasia da empresa */
  nome_fantasia?: string | null;
  /** Status do CNPJ (ex: ATIVA, BAIXADA) */
  descricao_situacao_cadastral?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  bairro?: string | null;
  municipio?: string | null;
  uf?: string | null;
  cep?: string | null;
  /** Data e hora em que a consulta foi realizada no backend */
  fetched_at: string;
}

/**
 * Representa uma sessão de atendimento no WhatsApp.
 */
export interface Conversation {
  /** Identificador único da conversa */
  id: string;
  /** ID do Lead vinculado a esta conversa, se existir */
  lead_id?: string | null;
  /** ID do operador que assumiu a conversa, se aplicável */
  attendant_id?: string | null;
  /** Número do WhatsApp do cliente (formato internacional) */
  whatsapp_phone: string;
  /** Status da conversa (ex: aberta, em_atendimento, fechada) */
  status: string;
  /** Data e hora da abertura da conversa (ISO) */
  created_at: string;
  /** Data e hora da última interação ou mudança de status (ISO) */
  updated_at: string;
}

/**
 * Representa um operador/atendente habilitado a utilizar o CRM.
 */
export interface Attendant {
  /** Identificador único do operador (ex: slug ou UUID) */
  id: string;
  /** Nome de exibição do operador */
  name: string;
  /** E-mail corporativo para login/contato */
  email: string;
  /** Indica se o operador está apto a receber novos chamados */
  active: boolean;
  /** Data de cadastro do operador */
  created_at: string;
  /** Data da última alteração no cadastro */
  updated_at: string;
}

/**
 * Payload para criação de um novo operador.
 */
export interface AttendantCreate {
  name: string;
  email: string;
  active?: boolean;
}

/**
 * Payload para criação manual de um novo Lead.
 */
export interface LeadCreate {
  name: string;
  phone?: string;
  email?: string | null;
  cnpj?: string | null;
  company_name?: string | null;
  service_interest?: string | null;
  notes?: string | null;
  origin?: LeadOrigin;
}

/**
 * Mensagem trocada dentro de uma Conversation de WhatsApp.
 */
export interface Message {
  /** Identificador único da mensagem */
  id: string;
  /** ID da conversa a qual esta mensagem pertence */
  conversation_id: string;
  /** Direção da mensagem: inbound (cliente) ou outbound (operador) */
  direction: "inbound" | "outbound";
  /** Conteúdo em texto da mensagem */
  body: string;
  /** Data e hora do envio/recebimento (ISO) */
  sent_at: string;
  /** ID interno da mensagem na API oficial do WhatsApp (se aplicável) */
  wamid?: string | null;
}

/**
 * (Legado/Compatibilidade) Dados retornados da BrasilAPI
 * Equivalente ao formato de 'Company', mas específico da rota original.
 */
export interface CnpjData {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  municipio: string;
  uf: string;
  descricao_situacao_cadastral: string;
}
