"use client";

import Image from "next/image";
import {
  MessageCircleMore,
  ShieldCheck,
  FileCheck2,
  ClipboardList,
  Users,
  ArrowUpRight,
  Info,
  BriefcaseBusiness,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getServices, getAssets, assetsByCategory, type Service, type Asset } from "@/lib/api";
import { ContactForm } from "./contact-form";
import { defaultSiteContent, getSiteContent, type SiteContent } from "@/lib/site-content";

const nav = [
  { href: "#sobre", label: "Sobre", icon: Info },
  { href: "#servicos", label: "Serviços", icon: BriefcaseBusiness },
  { href: "#contato", label: "Contato", icon: PhoneCall },
];

export default function Home() {
  const [content] = useState<SiteContent>(() => getSiteContent());
  const [services, setServices] = useState<Service[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data))
      .catch(() => setServices(defaultSiteContent.services));

    getAssets()
      .then((data) => setAssets(data))
      .catch(() => setAssets([]));
  }, []);

  const mergedServices = useMemo(
    () => (services.length > 0 ? services : content.services),
    [services, content.services]
  );

  const byCategory = assetsByCategory(assets);
  const heroImages = byCategory.general ?? byCategory.icons ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f1e6] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-[#d9c7a0] bg-[#161e2d]/90 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-4">
          <a href="#" className="flex items-center gap-3" aria-label="Ir para a página inicial">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d7a95a] text-[#161e2d] shadow-[0_10px_30px_rgba(215,169,90,0.35)]">
              <span className="text-lg font-black">PG</span>
            </div>
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d7a95a]">
                {content.brand.shortName}
              </p>
              <p className="text-sm font-semibold tracking-wide text-white">
                {content.brand.name}
              </p>
            </div>
          </a>

          <nav aria-label="Navegação principal" className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-200">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.href} href={item.href} className="inline-flex items-center gap-2 transition hover:text-[#d7a95a]">
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden bg-[#0d1420] px-6 py-24 md:py-32">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(215,169,90,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(157,92,64,0.22),transparent_30%)]" />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-8">
              <span className="inline-flex rounded-full border border-[#d7a95a]/40 bg-[#d7a95a]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-[#d7a95a]">
                {content.hero.eyebrow}
              </span>
              <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {content.hero.title}
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                {content.hero.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d7a95a] px-7 py-3.5 text-sm font-bold text-[#161e2d] shadow-[0_18px_30px_rgba(215,169,90,0.28)] transition hover:bg-[#e6c585]"
                >
                  {content.hero.primaryCta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-500 bg-transparent px-7 py-3.5 text-sm font-bold text-slate-200 transition hover:border-[#d7a95a] hover:text-[#d7a95a]"
                >
                  {content.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div className="relative">
              {heroImages.length > 0 ? (
                <div className="overflow-hidden rounded-[28px] border border-[#3a4655] bg-[#171f2c] p-3 shadow-[0_30px_60px_rgba(8,20,32,0.38)]">
                  <div className="relative h-[430px] overflow-hidden rounded-[22px]">
                    <Image
                      src={heroImages[0].url}
                      alt={heroImages[0].name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0d1420]/35 via-transparent to-transparent" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {[
                    { label: "AVCB", value: "1.200+" },
                    { label: "Projetos", value: "320" },
                    { label: "Atendimento", value: "24h" },
                    { label: "Conformidade", value: "100%" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-[#2b3744] bg-[#171f2c] p-6 text-center shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                      <div className="text-3xl font-black text-[#d7a95a]">{item.value}</div>
                      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-300">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="sobre" className="bg-[#f8f4ee] px-6 py-24">
          <div className="mx-auto max-w-5xl space-y-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#161e2d]">Sobre</p>
            <h2 className="text-3xl font-black tracking-tight text-[#161e2d] md:text-4xl">
              {content.about.title}
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
              {content.about.text}
            </p>
          </div>
        </section>

        <section id="servicos" className="bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#161e2d]">Serviços</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#161e2d] md:text-4xl">
                Soluções para segurança e conformidade
              </h2>
            </div>

            <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {mergedServices.map((svc) => (
                <li
                  key={svc.id}
                  className="group rounded-3xl border border-[#e8dcc6] bg-[#faf5ed] p-7 shadow-[0_18px_40px_rgba(22,30,45,0.04)] transition hover:-translate-y-1 hover:border-[#d7a95a] hover:shadow-[0_20px_50px_rgba(215,169,90,0.12)]"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#161e2d] text-[#d7a95a] transition group-hover:bg-[#d7a95a] group-hover:text-[#161e2d]">
                    {svc.icon === "shield" && <ShieldCheck className="h-6 w-6" />}
                    {svc.icon === "file-check" && <FileCheck2 className="h-6 w-6" />}
                    {svc.icon === "clipboard-list" && <ClipboardList className="h-6 w-6" />}
                    {svc.icon === "users" && <Users className="h-6 w-6" />}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-[#161e2d]">{svc.title}</h3>
                  <p className="text-base leading-relaxed text-slate-600">{svc.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contato" className="bg-[#0d1420] px-6 py-24 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#d7a95a]">Contato</p>
              <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                {content.contact.title}
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                {content.contact.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-[#314052] bg-[#1a2533] p-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d7a95a] text-[#161e2d]">
                    <CheckCircle2 className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Atendimento ágil e técnico</p>
                    <p className="text-sm text-slate-300">Retorno rápido e orientação clara de especialistas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-[#314052] bg-[#1a2533] p-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d7a95a] text-[#161e2d]">
                    <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Processo seguro</p>
                    <p className="text-sm text-slate-300">Conformidade documental e acompanhamento técnico até a aprovação.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#d9c7a0] bg-white p-7 text-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d9c7a0] bg-[#f8f4ee] px-6 py-8 text-center text-sm text-slate-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#161e2d] text-xs font-black text-[#d7a95a]">
              {content.brand.shortName}
            </div>
            <span className="font-semibold text-[#161e2d]">{content.brand.name}</span>
          </div>
          <p>{content.brand.tagline}</p>
        </div>
      </footer>

      <a
        href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20engenheiro%20sobre%20meu%20AVCB."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar conosco pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_42px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircleMore className="h-7 w-7" strokeWidth={2.3} />
      </a>
    </div>
  );
}
