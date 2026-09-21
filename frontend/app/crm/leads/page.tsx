"use client";

import { useEffect, useState, useCallback } from "react";
import { listLeads, updateLeadStatus } from "@/lib/crm-api";
import { Lead, LeadStatus } from "@/lib/crm-types";

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  novo: {
    label: "Novo",
    color: "text-amber-300",
    bg: "bg-amber-950/40",
    border: "border-amber-800/60",
  },
  em_atendimento: {
    label: "Em Atendimento",
    color: "text-sky-300",
    bg: "bg-sky-950/40",
    border: "border-sky-800/60",
  },
  aguardando_cliente: {
    label: "Aguardando Cliente",
    color: "text-orange-300",
    bg: "bg-orange-950/40",
    border: "border-orange-800/60",
  },
  qualificado: {
    label: "Qualificado",
    color: "text-purple-300",
    bg: "bg-purple-950/40",
    border: "border-purple-800/60",
  },
  convertido: {
    label: "Convertido / Ganho",
    color: "text-emerald-300",
    bg: "bg-emerald-950/40",
    border: "border-emerald-800/60",
  },
  perdido: {
    label: "Perdido",
    color: "text-rose-300",
    bg: "bg-rose-950/40",
    border: "border-rose-800/60",
  },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [originFilter, setOriginFilter] = useState<string>("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeadsData = useCallback(async () => {
    try {
      const data = await listLeads();
      setLeads(data);
    } catch (err) {
      console.error("Erro ao listar leads:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeadsData();
  }, [fetchLeadsData]);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const updated = await updateLeadStatus(leadId, newStatus);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
      if (selectedLead?.id === leadId) setSelectedLead(updated);
    } catch (err) {
      alert("Erro ao alterar status do lead: " + err);
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (statusFilter !== "todos" && l.status !== statusFilter) return false;
    if (originFilter !== "todos" && l.origin !== originFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = l.name.toLowerCase().includes(term);
      const matchPhone = l.phone?.toLowerCase().includes(term) || false;
      const matchCompany = l.company_name?.toLowerCase().includes(term) || false;
      if (!matchName && !matchPhone && !matchCompany) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950 p-6 space-y-6">
      {/* Header com Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>👥 Pipeline de Leads</span>
            <span className="text-xs bg-slate-800 text-emerald-400 px-2.5 py-0.5 rounded-full border border-slate-700">
              {filteredLeads.length} de {leads.length} leads
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Gerenciamento e qualificação de contatos oriundos do WhatsApp e Site
          </p>
        </div>

        {/* Controles de Busca e Filtro */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="🔍 Buscar por nome, tel, empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-emerald-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="todos">Status: Todos</option>
            {Object.entries(STATUS_CONFIG).map(([st, conf]) => (
              <option key={st} value={st}>
                {conf.label}
              </option>
            ))}
          </select>

          <select
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="todos">Origem: Todas</option>
            <option value="whatsapp">📱 WhatsApp</option>
            <option value="site">🌐 Formulário Site</option>
            <option value="manual">✍️ Manual</option>
          </select>

          <button
            onClick={fetchLeadsData}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg text-xs transition"
            title="Recarregar"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Grid de Leads / Lista */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center text-slate-500 py-16 animate-pulse">
            Carregando leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center text-slate-500 py-16">
            Nenhum lead encontrado com os filtros selecionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
            {filteredLeads.map((lead) => {
              const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.novo;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition shadow-sm hover:shadow-md cursor-pointer group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-100 group-hover:text-emerald-400 transition">
                          {lead.name}
                        </h4>
                        {lead.company_name && (
                          <p className="text-xs text-slate-400">🏢 {lead.company_name}</p>
                        )}
                      </div>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusCfg.bg} ${statusCfg.color} ${statusCfg.border}`}
                      >
                        {statusCfg.label}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-400 mt-3">
                      <div>
                        📞 <span className="text-slate-300">{lead.phone}</span>
                      </div>
                      {lead.email && (
                        <div>
                          ✉️ <span className="text-slate-300">{lead.email}</span>
                        </div>
                      )}
                      {lead.service_interest && (
                        <div>
                          🏷️ <span className="text-slate-300">{lead.service_interest}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">
                      Origem:{" "}
                      <strong className="text-slate-400 capitalize">{lead.origin}</strong>
                    </span>

                    {/* Troca Rápida de Status */}
                    <select
                      value={lead.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value as LeadStatus)
                      }
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      {Object.entries(STATUS_CONFIG).map(([st, conf]) => (
                        <option key={st} value={st}>
                          {conf.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Lead */}
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-xs"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Detalhes do Lead</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <span className="text-xs text-slate-500 block">Nome Completo:</span>
                <strong className="text-white text-base">{selectedLead.name}</strong>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Telefone:</span>
                  <span>{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Email:</span>
                  <span>{selectedLead.email || "Não informado"}</span>
                </div>
              </div>

              {selectedLead.cnpj && (
                <div>
                  <span className="text-xs text-slate-500 block">CNPJ / Empresa:</span>
                  <span>
                    {selectedLead.cnpj} {selectedLead.company_name ? `(${selectedLead.company_name})` : ""}
                  </span>
                </div>
              )}

              {selectedLead.notes && (
                <div>
                  <span className="text-xs text-slate-500 block">Mensagem / Observação:</span>
                  <p className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 mt-1 whitespace-pre-wrap">
                    {selectedLead.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-4 py-2 rounded-lg transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
