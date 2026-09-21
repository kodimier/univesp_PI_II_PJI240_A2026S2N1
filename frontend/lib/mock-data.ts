import { Asset, Service } from "./api";
import { Attendant, CnpjData, Conversation, Lead, Message } from "./crm-types";

// ==================== Landing Page Mocks ====================

export const MOCK_SERVICES: Service[] = [
  {
    id: "srv-1",
    title: "Obtenção e Renovação de AVCB",
    description: "Assessoria técnica completa para Auto de Vistoria do Corpo de Bombeiros em comércios, indústrias e condomínios.",
    icon: "shield",
  },
  {
    id: "srv-2",
    title: "Emissão de CLCB",
    description: "Certificado de Licença do Corpo de Bombeiros com processo simplificado e ágil para edificações de baixo risco.",
    icon: "file-check",
  },
  {
    id: "srv-3",
    title: "Laudos Técnicos e ART",
    description: "Inspeção predial preventiva, laudos de conformidade, estanqueidade e emissão de Anotação de Responsabilidade Técnica.",
    icon: "clipboard-list",
  },
  {
    id: "srv-4",
    title: "Treinamento de Brigada de Incêndio",
    description: "Capacitação prática e teórica de equipes conforme as Instruções Técnicas do Corpo de Bombeiros.",
    icon: "users",
  },
];

export const MOCK_ASSETS: Asset[] = [
  {
    id: "ast-1",
    name: "Extintor e Mangueira",
    url: "/images/hero-fire.jpg",
    mime_type: "image/jpeg",
    category: "general",
  },
];

// ==================== CRM Mocks ====================

export const MOCK_ATTENDANTS: Attendant[] = [
  {
    id: "katia",
    name: "Kátia (Supervisora)",
    email: "katia@inovalit.com.br",
    active: true,
    created_at: "2026-03-01T08:00:00Z",
    updated_at: "2026-03-01T08:00:00Z",
  },
  {
    id: "operador-1",
    name: "Carlos Atendimento",
    email: "carlos@inovalit.com.br",
    active: true,
    created_at: "2026-03-02T09:30:00Z",
    updated_at: "2026-03-02T09:30:00Z",
  },
  {
    id: "operador-2",
    name: "Mariana Comercial",
    email: "mariana@inovalit.com.br",
    active: true,
    created_at: "2026-03-05T14:15:00Z",
    updated_at: "2026-03-05T14:15:00Z",
  },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Roberto Silva",
    phone: "11987654321",
    email: "roberto@construtorasilva.com.br",
    cnpj: "12.345.678/0001-90",
    company_name: "Silva Construtora e Obras LTDA",
    service_interest: "Renovação AVCB Galpão",
    notes: "Precisa de vistoria urgente para renovação de alvará municipal antes do fim do mês.",
    origin: "whatsapp",
    status: "em_atendimento",
    created_at: "2026-09-17T10:30:00Z",
    updated_at: "2026-09-17T11:15:00Z",
  },
  {
    id: "lead-2",
    name: "Fernanda Costa",
    phone: "11977778888",
    email: "fcosta@logisticaexpress.com.br",
    cnpj: "98.765.432/0001-10",
    company_name: "Logística Express Centro de Distribuição",
    service_interest: "Treinamento de Brigada e CLCB",
    notes: "Centro de distribuição com 45 funcionários para treinamento de brigadistas.",
    origin: "site",
    status: "novo",
    created_at: "2026-09-17T14:00:00Z",
    updated_at: "2026-09-17T14:00:00Z",
  },
  {
    id: "lead-3",
    name: "Lucas Mendes",
    phone: "11966665555",
    email: "lucas@padariacentral.com.br",
    cnpj: "33.222.111/0001-44",
    company_name: "Panificadora Central de Barueri",
    service_interest: "Projeto de Linha de Gás GLP",
    notes: "Proposta de R$ 4.500,00 enviada e aprovada pelo cliente. Aguardando pagamento.",
    origin: "whatsapp",
    status: "qualificado",
    created_at: "2026-09-16T09:00:00Z",
    updated_at: "2026-09-17T16:20:00Z",
  },
  {
    id: "lead-4",
    name: "Juliana Duarte",
    phone: "11955554444",
    email: "jduarte@clinicaesaude.med.br",
    cnpj: "55.444.333/0001-22",
    company_name: "Clínica & Saúde Integrada",
    service_interest: "Emissão de CLCB Consultório",
    notes: "Projeto entregue e licença CLCB homologada junto aos Bombeiros.",
    origin: "manual",
    status: "convertido",
    created_at: "2026-09-10T11:00:00Z",
    updated_at: "2026-09-15T17:00:00Z",
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    whatsapp_phone: "5511987654321",
    attendant_id: "operador-1",
    status: "em_atendimento",
    lead_id: "lead-1",
    created_at: "2026-09-17T10:30:00Z",
    updated_at: "2026-09-17T11:15:00Z",
  },
  {
    id: "conv-2",
    whatsapp_phone: "5511977778888",
    attendant_id: null,
    status: "aberta",
    lead_id: "lead-2",
    created_at: "2026-09-17T14:00:00Z",
    updated_at: "2026-09-17T14:00:00Z",
  },
  {
    id: "conv-3",
    whatsapp_phone: "5511966665555",
    attendant_id: "katia",
    status: "em_atendimento",
    lead_id: "lead-3",
    created_at: "2026-09-16T09:00:00Z",
    updated_at: "2026-09-17T16:20:00Z",
  },
  {
    id: "conv-4",
    whatsapp_phone: "5511955554444",
    attendant_id: "operador-2",
    status: "fechada",
    lead_id: "lead-4",
    created_at: "2026-09-10T11:00:00Z",
    updated_at: "2026-09-15T17:00:00Z",
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1-1",
      conversation_id: "conv-1",
      direction: "inbound",
      body: "Olá, bom dia! Preciso fazer a renovação do AVCB do meu galpão com urgência.",
      sent_at: "2026-09-17T10:30:00Z",
    },
    {
      id: "msg-1-2",
      conversation_id: "conv-1",
      direction: "outbound",
      body: "Olá Roberto! Tudo bem? Me chamo Carlos, sou da PG AVCB Engenharia. Pode me informar a metragem aproximada e se o local já possui hidrantes?",
      sent_at: "2026-09-17T10:32:00Z",
    },
    {
      id: "msg-1-3",
      conversation_id: "conv-1",
      direction: "inbound",
      body: "Temos cerca de 1.200m² e sim, já temos 2 hidrantes instalados.",
      sent_at: "2026-09-17T10:35:00Z",
    },
    {
      id: "msg-1-4",
      conversation_id: "conv-1",
      direction: "outbound",
      body: "Perfeito! Vou gerar uma proposta técnica e agendar uma pré-vistoria sem compromisso.",
      sent_at: "2026-09-17T10:40:00Z",
    },
  ],
  "conv-2": [
    {
      id: "msg-2-1",
      conversation_id: "conv-2",
      direction: "inbound",
      body: "Boa tarde! Gostaria de um orçamento para treinamento de brigada de incêndio para nossa empresa em Barueri.",
      sent_at: "2026-09-17T14:00:00Z",
    },
  ],
  "conv-3": [
    {
      id: "msg-3-1",
      conversation_id: "conv-3",
      direction: "inbound",
      body: "Boa tarde Kátia, a documentação da panificadora foi enviada para o e-mail.",
      sent_at: "2026-09-17T16:15:00Z",
    },
    {
      id: "msg-3-2",
      conversation_id: "conv-3",
      direction: "outbound",
      body: "Recebido Lucas! Já estamos montando o processo no sistema Via Fácil dos Bombeiros.",
      sent_at: "2026-09-17T16:20:00Z",
    },
  ],
};

export const MOCK_CNPJ_DATA: Record<string, CnpjData> = {
  "12345678000190": {
    cnpj: "12.345.678/0001-90",
    razao_social: "SILVA CONSTRUTORA E OBRAS LTDA",
    nome_fantasia: "CONSTRUTORA SILVA",
    municipio: "SAO PAULO",
    uf: "SP",
    descricao_situacao_cadastral: "ATIVA",
  },
  "98765432000110": {
    cnpj: "98.765.432/0001-10",
    razao_social: "LOGISTICA EXPRESS CENTRO DE DISTRIBUICAO LTDA",
    nome_fantasia: "LOGISTICA EXPRESS",
    municipio: "BARUERI",
    uf: "SP",
    descricao_situacao_cadastral: "ATIVA",
  },
};
