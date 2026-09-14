"use client";

import { FormEvent, useState } from "react";
import { sendContact } from "@/lib/crm";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [detail, setDetail] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setDetail("");
    try {
      await sendContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? "") || undefined,
        message: String(data.get("message") ?? ""),
      });
      setStatus("ok");
      setDetail("Recebemos sua mensagem. A equipe da PGAVCB vai entrar em contato.");
      form.reset();
    } catch {
      setStatus("error");
      setDetail("Não foi possível enviar agora. Tente novamente em instantes.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4 text-left" noValidate>
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-800">
          Nome
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-800">
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-zinc-800">
          Telefone (opcional)
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-800">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={4}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensagem"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={
          status === "error"
            ? "text-sm text-red-800"
            : "text-sm text-zinc-700"
        }
      >
        {detail}
      </p>
    </form>
  );
}
