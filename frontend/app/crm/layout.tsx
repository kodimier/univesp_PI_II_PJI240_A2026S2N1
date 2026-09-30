"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getActiveAttendantId,
  setActiveAttendantId,
  listAttendants,
  getCrmToken,
  setCrmToken,
} from "@/lib/crm-api";
import { Attendant } from "@/lib/crm-types";

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const [activeAttendant, setActiveAttendant] = useState<string>(
    () => (typeof window !== "undefined" ? getActiveAttendantId() : "operador-1")
  );
  const [token, setTokenState] = useState<string>(
    () => (typeof window !== "undefined" ? getCrmToken() : "")
  );
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    listAttendants()
      .then((data) => setAttendants(data))
      .catch(() => {
        setAttendants([
          { id: "katia", name: "Kátia (Admin)", email: "katia@inovalit.com.br", active: true, created_at: "", updated_at: "" },
          { id: "atendente-1", name: "Operador 1", email: "op1@inovalit.com.br", active: true, created_at: "", updated_at: "" },
          { id: "atendente-2", name: "Operador 2", email: "op2@inovalit.com.br", active: true, created_at: "", updated_at: "" },
        ]);
      });
  }, []);

  const handleAttendantChange = (id: string) => {
    setActiveAttendant(id);
    setActiveAttendantId(id);
  };

  const handleSaveToken = (val: string) => {
    setTokenState(val);
    setCrmToken(val);
  };

  const navItems = [
    { href: "/crm/chat", label: "💬 Multiatendimento WhatsApp", desc: "Fila de conversas" },
    { href: "/crm/leads", label: "👥 Gestão de Leads", desc: "Pipeline e status" },
    { href: "/crm/content", label: "📝 Conteúdo do Site", desc: "Marca e mensagens" },
    { href: "/crm/attendants", label: "⚙️ Atendentes", desc: "Equipe de operadores" },
  ];

  return (
    <div className="flex h-screen bg-[#0d1420] text-slate-100 antialiased overflow-hidden font-sans">
      <aside className="w-72 border-r border-[#2d3a48] bg-[#161e2d] flex flex-col justify-between shrink-0">
        <div>
          <div className="p-5 border-b border-[#2d3a48] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#d7a95a] shadow-[0_0_16px_rgba(215,169,90,0.8)]" />
                <h1 className="font-bold tracking-tight text-white text-lg">PG AVCB CRM</h1>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">Painel multiatendente & leads</p>
            </div>
            <Link
              href="/"
              target="_blank"
              title="Ver site público"
              className="text-[11px] bg-[#1d2735] hover:bg-[#2a3744] text-[#e7edf6] px-2 py-1 rounded-md border border-[#495d70] transition"
            >
              Site ↗
            </Link>
          </div>

          <div className="p-4 bg-[#1a2430] border-b border-[#2d3a48]">
            <label className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#dfe7ef] block mb-1.5">
              Operador atual
            </label>
            <select
              value={activeAttendant}
              onChange={(e) => handleAttendantChange(e.target.value)}
              className="w-full bg-[#0d1420] border border-[#465a6d] rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#d7a95a] transition"
            >
              {attendants.map((att) => (
                <option key={att.id} value={att.id}>
                  👤 {att.name} {att.id === activeAttendant ? "(Você)" : ""}
                </option>
              ))}
              {!attendants.some((a) => a.id === activeAttendant) && (
                <option value={activeAttendant}>👤 {activeAttendant} (Personalizado)</option>
              )}
            </select>
          </div>

          <nav className="p-3 space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-[#d7a95a]/15 text-[#d7a95a] border border-[#d7a95a]/35"
                      : "text-slate-300 hover:bg-[#24313f] hover:text-white"
                  }`}
                >
                  <div className="font-medium">{item.label}</div>
                  <div className="text-[11px] opacity-75 font-normal">{item.desc}</div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#2d3a48] bg-[#1a2430] text-xs">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full text-left text-slate-300 hover:text-white flex items-center justify-between py-1"
          >
            <span>🔑 Configuração de API</span>
            <span>{showSettings ? "▲" : "▼"}</span>
          </button>
          {showSettings && (
            <div className="mt-2 space-y-2 pt-2 border-t border-[#314052]">
              <label className="block text-slate-300">Token CRM (Bearer / X-API-Key):</label>
              <input
                type="password"
                placeholder="Vazio para modo DEV"
                value={token}
                onChange={(e) => handleSaveToken(e.target.value)}
                className="w-full bg-[#0d1420] border border-[#465a6d] rounded px-2 py-1 text-slate-200 text-xs focus:ring-1 focus:ring-[#d7a95a]"
              />
              <p className="text-[10px] text-slate-400">
                Se o backend tiver <code className="text-[#d7a95a]">CRM_API_TOKEN</code>, configure aqui.
              </p>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
