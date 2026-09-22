"use client";

import { useState } from "react";
import {
  getSiteContent,
  saveSiteContent,
  type SiteContent,
} from "@/lib/site-content";

export default function SiteContentPage() {
  const [content, setContent] = useState<SiteContent>(() => getSiteContent());

  const save = () => {
    saveSiteContent(content);
    alert("Conteúdo do site salvo no navegador. O layout público será atualizado ao recarregar a página.");
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f4f1eb] p-6 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-[#d8d3c6] bg-white p-6 shadow-[0_20px_45px_rgba(8,26,41,0.05)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#0d2339]">CRM</p>
              <h1 className="mt-2 text-3xl font-black text-[#081a29]">Conteúdo do site</h1>
            </div>
            <button
              onClick={save}
              className="rounded-xl bg-[#f5c75a] px-5 py-3 text-sm font-bold text-[#081a29] shadow-[0_12px_25px_rgba(245,199,90,0.35)] transition hover:bg-[#ffd978]"
            >
              Salvar alterações
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-[#d8d3c6] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[#081a29]">Marca</h2>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Nome da empresa
                <input
                  value={content.brand.name}
                  onChange={(e) => setContent((prev) => ({ ...prev, brand: { ...prev.brand, name: e.target.value } }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-[#f8f7f4] px-3 py-2 outline-none focus:border-[#f5c75a]"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Sigla
                <input
                  value={content.brand.shortName}
                  onChange={(e) => setContent((prev) => ({ ...prev, brand: { ...prev.brand, shortName: e.target.value } }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-[#f8f7f4] px-3 py-2 outline-none focus:border-[#f5c75a]"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Tagline
                <input
                  value={content.brand.tagline}
                  onChange={(e) => setContent((prev) => ({ ...prev, brand: { ...prev.brand, tagline: e.target.value } }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-[#f8f7f4] px-3 py-2 outline-none focus:border-[#f5c75a]"
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-[#d8d3c6] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[#081a29]">Hero</h2>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Eyebrow
                <input
                  value={content.hero.eyebrow}
                  onChange={(e) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, eyebrow: e.target.value } }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-[#f8f7f4] px-3 py-2 outline-none focus:border-[#f5c75a]"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Título
                <input
                  value={content.hero.title}
                  onChange={(e) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-[#f8f7f4] px-3 py-2 outline-none focus:border-[#f5c75a]"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Subtítulo
                <textarea
                  value={content.hero.subtitle}
                  onChange={(e) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))}
                  rows={3}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-[#f8f7f4] px-3 py-2 outline-none focus:border-[#f5c75a]"
                />
              </label>
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-[#d8d3c6] bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-[#081a29]">Sobre</h2>
          <textarea
            value={content.about.text}
            onChange={(e) => setContent((prev) => ({ ...prev, about: { ...prev.about, text: e.target.value } }))}
            rows={5}
            className="w-full rounded-xl border border-slate-300 bg-[#f8f7f4] px-3 py-2 outline-none focus:border-[#f5c75a]"
          />
        </section>

        <section className="rounded-3xl border border-[#d8d3c6] bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-[#081a29]">Contato</h2>
          <textarea
            value={content.contact.description}
            onChange={(e) => setContent((prev) => ({ ...prev, contact: { ...prev.contact, description: e.target.value } }))}
            rows={4}
            className="w-full rounded-xl border border-slate-300 bg-[#f8f7f4] px-3 py-2 outline-none focus:border-[#f5c75a]"
          />
        </section>

        <section className="rounded-3xl border border-[#d8d3c6] bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-[#081a29]">Serviços</h2>
          <div className="space-y-4">
            {content.services.map((service, index) => (
              <div key={service.id} className="rounded-2xl border border-slate-200 bg-[#f8f7f4] p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    value={service.title}
                    onChange={(e) => {
                      const next = [...content.services];
                      next[index] = { ...service, title: e.target.value };
                      setContent((prev) => ({ ...prev, services: next }));
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-[#f5c75a]"
                  />
                  <input
                    value={service.icon}
                    onChange={(e) => {
                      const next = [...content.services];
                      next[index] = { ...service, icon: e.target.value };
                      setContent((prev) => ({ ...prev, services: next }));
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-[#f5c75a]"
                  />
                </div>
                <textarea
                  value={service.description}
                  onChange={(e) => {
                    const next = [...content.services];
                    next[index] = { ...service, description: e.target.value };
                    setContent((prev) => ({ ...prev, services: next }));
                  }}
                  rows={3}
                  className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-[#f5c75a]"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
