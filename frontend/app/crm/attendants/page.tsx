"use client";

import { useEffect, useState, useCallback } from "react";
import { listAttendants, createAttendant } from "@/lib/crm-api";
import { Attendant } from "@/lib/crm-types";

export default function AttendantsPage() {
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchAttendants = useCallback(async () => {
    try {
      const data = await listAttendants();
      setAttendants(data);
    } catch (err) {
      console.error("Erro ao listar atendentes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendants();
  }, [fetchAttendants]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    setMessage(null);
    try {
      await createAttendant({ name: name.trim(), email: email.trim(), active: true });
      setName("");
      setEmail("");
      setMessage("Atendente cadastrado com sucesso!");
      await fetchAttendants();
    } catch (err: unknown) {
      setMessage(`Erro ao cadastrar: ${err instanceof Error ? err.message : "Falha na requisição"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950 p-6 space-y-6">
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>⚙️ Gestão de Atendentes & Operadores</span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
            {attendants.length} operadores
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Cadastre operadores para assumir conversas no painel de atendimento WhatsApp
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto">
        {/* Formulário de Cadastro */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-fit">
          <h3 className="text-sm font-bold text-white mb-4">Novo Operador</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome do Operador
              </label>
              <input
                type="text"
                placeholder="Ex: Carlos Oliveira"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Corporativo
              </label>
              <input
                type="email"
                placeholder="carlos@inovalit.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {message && (
              <div className="text-xs p-2.5 rounded bg-slate-800 text-slate-300">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg text-sm transition shadow-sm"
            >
              {submitting ? "Cadastrando..." : "Adicionar Atendente"}
            </button>
          </form>
        </div>

        {/* Lista de Atendentes */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 overflow-hidden flex flex-col">
          <h3 className="text-sm font-bold text-white mb-4">Equipe Cadastrada</h3>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
            {loading ? (
              <div className="text-center text-slate-500 py-10 animate-pulse">
                Carregando operadores...
              </div>
            ) : attendants.length === 0 ? (
              <div className="text-center text-slate-500 py-10">
                Nenhum atendente cadastrado no banco.
              </div>
            ) : (
              attendants.map((att) => (
                <div key={att.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-sm">
                      {att.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-200">{att.name}</div>
                      <div className="text-xs text-slate-400">{att.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                        att.active
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {att.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
