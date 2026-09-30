"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  getConversations,
  getConversationMessages,
  claimConversation,
  closeConversation,
  sendWhatsAppMessage,
  getActiveAttendantId,
} from "@/lib/crm-api";
import { Conversation, Message } from "@/lib/crm-types";

export default function WhatsAppChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingList, setLoadingList] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [sending, setSending] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("todas");
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Carregar lista de conversas
  const loadConversations = useCallback(async () => {
    try {
      const data = await getConversations();
      setConversations(data);
      // Se selecionada, atualizar referência
      if (selectedConv) {
        const updated = data.find((c) => c.id === selectedConv.id);
        if (updated) setSelectedConv(updated);
      }
      setErrorBanner(null);
    } catch (err: unknown) {
      setErrorBanner(err instanceof Error ? err.message : "Erro ao carregar conversas.");
    } finally {
      setLoadingList(false);
    }
  }, [selectedConv]);

  // Polling periódico da fila (a cada 4 segundos)
  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 4000);
    return () => clearInterval(interval);
  }, [loadConversations]);

  // Carregar mensagens da conversa selecionada
  const loadMessages = useCallback(async (convId: string) => {
    try {
      const data = await getConversationMessages(convId);
      setMessages(data);
    } catch (err: unknown) {
      console.error("Erro ao carregar mensagens:", err);
    }
  }, []);

  // Polling suave de mensagens da conversa selecionada
  useEffect(() => {
    if (!selectedConv) {
      setMessages([]);
      return;
    }
    setLoadingChat(true);
    loadMessages(selectedConv.id).finally(() => setLoadingChat(false));

    const chatInterval = setInterval(() => {
      loadMessages(selectedConv.id);
    }, 3000);

    return () => clearInterval(chatInterval);
  }, [selectedConv, loadMessages]);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Assumir atendimento
  const handleClaim = async () => {
    if (!selectedConv) return;
    try {
      const attendantId = getActiveAttendantId();
      const updated = await claimConversation(selectedConv.id, attendantId);
      setSelectedConv(updated);
      await loadConversations();
    } catch (err: unknown) {
      alert(`Falha ao assumir conversa: ${err instanceof Error ? err.message : "Erro desconhecido"}`);
    }
  };

  // Encerrar atendimento
  const handleClose = async () => {
    if (!selectedConv) return;
    if (!confirm("Deseja realmente encerrar este atendimento?")) return;
    try {
      const updated = await closeConversation(selectedConv.id);
      setSelectedConv(updated);
      await loadConversations();
    } catch (err: unknown) {
      alert(`Falha ao encerrar conversa: ${err instanceof Error ? err.message : "Erro desconhecido"}`);
    }
  };

  // Enviar mensagem
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConv || !newMessage.trim() || sending) return;

    setSending(true);
    try {
      const sentMsg = await sendWhatsAppMessage(selectedConv.id, newMessage.trim());
      setMessages((prev) => [...prev, sentMsg]);
      setNewMessage("");
      await loadConversations();
    } catch (err: unknown) {
      alert(`Erro ao enviar mensagem: ${err instanceof Error ? err.message : "Falha na conexão"}`);
    } finally {
      setSending(false);
    }
  };

  const filteredConversations = conversations.filter((c) => {
    if (statusFilter === "todas") return true;
    return c.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aberta":
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full text-xs font-semibold">Aguardando</span>;
      case "em_atendimento":
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full text-xs font-semibold">Em Atendimento</span>;
      case "fechada":
        return <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full text-xs">Encerrada</span>;
      default:
        return <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="flex h-full w-full">
      {/* Coluna 1: Lista de Conversas (Inbox) */}
      <div className="w-80 md:w-96 bg-slate-900/60 border-r border-slate-800 flex flex-col shrink-0">
        {/* Topo da lista */}
        <div className="p-4 border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Fila de Mensagens</span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                {conversations.length}
              </span>
            </h2>
            <button
              onClick={loadConversations}
              className="text-xs text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded transition"
              title="Atualizar conversas"
            >
              🔄
            </button>
          </div>

          {/* Filtros de Status */}
          <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {["todas", "aberta", "em_atendimento", "fechada"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`flex-1 py-1 px-2 rounded-md capitalize transition font-medium ${
                  statusFilter === st
                    ? "bg-slate-800 text-emerald-400 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {st === "todas" ? "Todas" : st.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Lista scrollável */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {errorBanner && (
            <div className="p-3 bg-red-950/40 border-b border-red-800 text-red-300 text-xs">
              ⚠️ {errorBanner} (O backend está ativo em <code>http://localhost:8000</code>?)
            </div>
          )}

          {loadingList && conversations.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm animate-pulse">
              Carregando fila de atendimento...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              Nenhuma conversa encontrada neste filtro.
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = selectedConv?.id === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`p-3.5 cursor-pointer transition flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-slate-800/90 border-l-4 border-l-emerald-500"
                      : "hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-100 truncate">
                      📱 {conv.whatsapp_phone}
                    </span>
                    {getStatusBadge(conv.status)}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="truncate">
                      {conv.attendant_id ? (
                        <span className="text-emerald-400/90">👤 {conv.attendant_id}</span>
                      ) : (
                        <span className="text-amber-400/90 font-medium">⚡ Não atribuído</span>
                      )}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {conv.updated_at ? new Date(conv.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Coluna 2: Janela de Chat & Ações do Operador */}
      <div className="flex-1 flex flex-col h-full bg-slate-950">
        {selectedConv ? (
          <>
            {/* Header da Conversa */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-base text-white">
                    {selectedConv.whatsapp_phone}
                  </h3>
                  {getStatusBadge(selectedConv.status)}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  ID: <span className="font-mono text-slate-300">{selectedConv.id}</span>
                  {selectedConv.attendant_id && (
                    <span className="ml-3">
                      Atendente atual: <strong className="text-emerald-400">{selectedConv.attendant_id}</strong>
                    </span>
                  )}
                </p>
              </div>

              {/* Botões de Ação do Atendimento */}
              <div className="flex items-center gap-2">
                {selectedConv.status !== "em_atendimento" && selectedConv.status !== "fechada" && (
                  <button
                    onClick={handleClaim}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm"
                  >
                    🙋 Assumir Conversa
                  </button>
                )}

                {selectedConv.status === "em_atendimento" && (
                  <button
                    onClick={handleClaim}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs px-2.5 py-1.5 rounded-lg transition"
                    title="Transferir para mim"
                  >
                    Transferir p/ Mim
                  </button>
                )}

                {selectedConv.status !== "fechada" && (
                  <button
                    onClick={handleClose}
                    className="bg-slate-800 hover:bg-red-950/60 hover:text-red-300 text-slate-300 border border-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    🏁 Encerrar Atendimento
                  </button>
                )}
              </div>
            </div>

            {/* Lista de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-950 to-slate-900/40">
              {loadingChat && messages.length === 0 ? (
                <div className="text-center text-slate-500 text-sm mt-10">
                  Carregando mensagens...
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-slate-500 text-sm mt-10">
                  Nenhuma mensagem registrada nesta conversa ainda.
                </div>
              ) : (
                messages.map((msg) => {
                  const isOutbound = msg.direction === "outbound";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isOutbound ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm text-sm ${
                          isOutbound
                            ? "bg-emerald-600 text-white rounded-br-none"
                            : "bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none"
                        }`}
                      >
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.body}</p>
                        <div
                          className={`text-[10px] mt-1 text-right ${
                            isOutbound ? "text-emerald-200" : "text-slate-400"
                          }`}
                        >
                          {new Date(msg.sent_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input para responder */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              {selectedConv.status === "fechada" ? (
                <div className="text-center text-xs text-slate-500 py-2">
                  Esta conversa foi encerrada. Para reabrir, envie uma mensagem ou altere o status.
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite a resposta do operador (pressione Enter para enviar)..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sending}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                  <button
                    type="submit"
                    disabled={sending || !newMessage.trim()}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 shadow-sm shrink-0"
                  >
                    {sending ? "Enviando..." : "Enviar 🚀"}
                  </button>
                </form>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-lg font-semibold text-slate-300">Nenhuma conversa selecionada</h3>
            <p className="text-sm max-w-sm mt-1 text-slate-400">
              Selecione uma conversa na coluna à esquerda para visualizar as mensagens e responder ao cliente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
