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
    // Apenas carregar a lista de atendentes
    listAttendants()
      .then((data) => setAttendants(data))
      .catch(() => {
        // Fallback caso backend esteja sem dados de atendentes
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
    { href: "/crm/chat", label: "💬 Multiatendimento WhatsApp", desc: "Fila de conversas unificada" },
    { href: "/crm/leads", label: "👥 Gestão de Leads", desc: "Pipeline e status" },
    { href: "/crm/attendants", label: "⚙️ Atendentes", desc: "Equipe de operadores" },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 antialiased overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Header / Logo */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <h1 className="font-bold tracking-tight text-white text-lg">Inovalit CRM</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Painel Multiatendente & Leads</p>
            </div>
            <Link
              href="/"
              target="_blank"
              title="Ver site público"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded transition"
            >
              Site ↗
            </Link>
          </div>

          {/* Operador Ativo Selector */}
          <div className="p-4 bg-slate-900/50 border-b border-slate-800">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Operador Atual
            </label>
            <select
              value={activeAttendant}
              onChange={(e) => handleAttendantChange(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
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

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                  }`}
                >
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-70 font-normal">{item.desc}</div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Token Settings */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 text-xs">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full text-left text-slate-400 hover:text-slate-200 flex items-center justify-between py-1"
          >
            <span>🔑 Configuração de API</span>
            <span>{showSettings ? "▲" : "▼"}</span>
          </button>
          {showSettings && (
            <div className="mt-2 space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-slate-400">Token CRM (Bearer / X-API-Key):</label>
              <input
                type="password"
                placeholder="Vazio para modo DEV"
                value={token}
                onChange={(e) => handleSaveToken(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:ring-1 focus:ring-emerald-500"
              />
              <p className="text-[10px] text-slate-500">
                Se o backend tiver <code>CRM_API_TOKEN</code>, configure aqui.
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
