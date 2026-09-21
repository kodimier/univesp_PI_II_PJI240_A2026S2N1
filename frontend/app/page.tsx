import Image from "next/image";
import { getServices, getAssets, assetsByCategory } from "@/lib/api";
import { ContactForm } from "./contact-form";

const nav = [
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#servicos", label: "Nossos Serviços" },
  { href: "#contato", label: "Fale Conosco" },
];

export default async function Home() {
  const [services, assets] = await Promise.all([
    getServices().catch(() => []),
    getAssets().catch(() => []),
  ]);

  const byCategory = assetsByCategory(assets);
  const icons = byCategory["icons"] ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans selection:bg-red-500 selection:text-white">
      {/* Header com Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/50 shadow-sm transition-all duration-300">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-4">
          <a href="#" className="flex items-center gap-2" aria-label="Ir para a página inicial">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg shadow-red-500/30">
              <span className="text-xl font-bold">PG</span>
            </div>
            <p className="max-w-md text-sm font-extrabold uppercase tracking-wide text-zinc-900 md:text-base leading-tight">
              AVCB<br />Engenharia
            </p>
          </a>
          <nav
            aria-label="Navegação principal"
            className="flex flex-wrap gap-8 text-sm font-semibold text-zinc-600"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-red-600 focus:text-red-600 focus:outline-none"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-zinc-900 px-6 py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-red-600 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 mx-auto max-w-7xl grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-8">
              <span className="inline-block rounded-full bg-red-500/10 border border-red-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-400">
                Engenharia de Prevenção Contra Incêndio
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl leading-tight">
                Protegendo vidas e o futuro do seu negócio.
              </h1>
              <p className="text-lg leading-relaxed text-zinc-300 md:text-xl">
                Especialistas em segurança contra incêndios. Avaliações precisas, projetos técnicos avançados e aprovação ágil de AVCB e CLCB.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-red-700/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  Falar com um Engenheiro
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-transparent px-8 py-3.5 text-sm font-bold text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  Conhecer Soluções
                </a>
              </div>
            </div>

            {icons.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {icons.slice(0, 4).map((asset) => (
                  <div key={asset.id} className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-transform hover:-translate-y-1">
                    <Image
                      src={asset.url}
                      alt={asset.name}
                      width={64}
                      height={64}
                      className="opacity-80"
                    />
                  </div>
                ))}
              </div>
            ) : (
               <div className="relative h-64 md:h-full min-h-[400px] w-full rounded-2xl border border-zinc-800 bg-zinc-800/50 flex items-center justify-center overflow-hidden shadow-2xl shadow-red-500/10">
                  <Image 
                    src="/hero.jpg" 
                    alt="Planta arquitetônica com equipamentos de segurança contra incêndio" 
                    fill 
                    className="object-cover opacity-80 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-900/30 to-zinc-900/40"></div>
               </div>
            )}
          </div>
        </section>

        {/* Sobre Section */}
        <section
          id="sobre"
          className="px-6 py-24 bg-white"
        >
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Excelência Técnica e Ética
            </h2>
            <p className="text-lg leading-relaxed text-zinc-600">
              A <strong>PG AVCB</strong> nasceu da necessidade de alinhar o rigor normativo do Corpo de Bombeiros com o dinamismo do mundo corporativo. Nossa missão é desburocratizar a regularização do seu imóvel, garantindo 100% de conformidade técnica e a segurança irrestrita de todos os ocupantes.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-zinc-100">
              <div>
                <h3 className="font-bold text-zinc-900 text-xl mb-2">Missão</h3>
                <p className="text-zinc-600 text-sm">Preservar vidas e o patrimônio corporativo através de soluções técnicas de vanguarda em engenharia de incêndio.</p>
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-xl mb-2">Visão</h3>
                <p className="text-zinc-600 text-sm">Ser referência nacional em aprovações complexas e gerenciamento de risco de incêndio até 2030.</p>
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-xl mb-2">Valores</h3>
                <p className="text-zinc-600 text-sm">Ética inegociável, agilidade nos processos e compromisso absoluto com as normativas vigentes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Section */}
        <section
          id="servicos"
          className="bg-zinc-50 px-6 py-24"
        >
          <div className="mx-auto max-w-7xl space-y-16">
            <div className="space-y-4 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
                Soluções Completas
              </h2>
              <p className="text-zinc-600 text-lg">
                Do projeto inicial à renovação periódica. Cuidamos de todo o processo técnico para que você foque no seu negócio.
              </p>
            </div>

            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {services.length > 0 ? services.map((svc) => (
                <li
                  key={svc.id}
                  className="group relative rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-zinc-900">
                    {svc.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {svc.description}
                  </p>
                </li>
              )) : (
                // Fallback moderno para caso o backend mock não retorne os serviços
                <>
                  {[
                    { title: 'Projeto Técnico (PT)', desc: 'Elaboração completa de projetos de prevenção e combate a incêndio com ART.' },
                    { title: 'Emissão de AVCB', desc: 'Acompanhamento de vistoria e gestão de documentos para o Auto de Vistoria.' },
                    { title: 'Renovação de CLCB', desc: 'Processo ágil para edificações de baixo risco e renovações automatizadas.' },
                    { title: 'Laudos e Atestados', desc: 'Laudos de abrangência, instalações elétricas e SPDA exigidos pelos Bombeiros.' },
                  ].map((s, i) => (
                    <li
                      key={i}
                      className="group relative rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:border-red-200"
                    >
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-zinc-900">
                        {s.title}
                      </h3>
                      <p className="text-zinc-600 leading-relaxed">
                        {s.desc}
                      </p>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </section>

        {/* Contato Section */}
        <section id="contato" className="bg-white px-6 py-24 border-t border-zinc-100">
          <div className="mx-auto max-w-7xl grid gap-16 md:grid-cols-2">
            <div className="space-y-8 flex flex-col justify-center">
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
                  Pronto para regularizar seu imóvel?
                </h2>
                <p className="mt-4 text-lg text-zinc-600">
                  Preencha o formulário e nossa equipe de engenharia entrará em contato rapidamente com uma análise preliminar.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-zinc-600">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">Atendimento Rápido</p>
                    <p className="text-sm">Retornamos em até 1 hora útil.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-zinc-600">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">100% de Aprovação</p>
                    <p className="text-sm">Garantia técnica nos projetos apresentados.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl shadow-zinc-200/50">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20engenheiro%20sobre%20meu%20AVCB."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar conosco pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 0C5.405 0 .016 5.39.016 12.016c0 2.124.553 4.195 1.605 6.012L.03 24l6.126-1.606a11.967 11.967 0 005.875 1.536h.005c6.623 0 12.013-5.39 12.013-12.015C24.049 5.39 18.659 0 12.031 0zm0 21.956h-.003a10.024 10.024 0 01-5.111-1.393l-.367-.217-3.8.995.996-3.793-.238-.378a10.012 10.012 0 01-1.533-5.347c0-5.523 4.492-10.016 10.056-10.016 5.525 0 10.015 4.492 10.015 10.016 0 5.525-4.49 10.017-10.015 10.017v-.004zm5.503-7.513c-.302-.151-1.791-.884-2.068-.985-.276-.101-.478-.151-.678.151-.202.302-.781.985-.956 1.186-.176.201-.352.226-.653.075-1.921-.963-3.176-1.785-4.385-3.816-.176-.301.176-.276.478-.879.1-.201.05-.377-.025-.528-.075-.151-.678-1.633-.93-2.236-.245-.591-.496-.511-.678-.521h-.578c-.201 0-.528.075-.805.377-.276.301-1.055 1.03-1.055 2.513 0 1.482 1.08 2.915 1.231 3.116.151.201 2.126 3.247 5.147 4.549 1.942.836 2.721.906 3.826.755 1.185-.162 2.764-1.131 3.141-2.223.377-1.092.377-2.025.263-2.223-.112-.198-.413-.3-.715-.451z" />
        </svg>
      </a>

      <footer className="mt-auto border-t border-zinc-200 bg-zinc-900 px-6 py-12 text-center text-sm text-zinc-400">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
             <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 text-white">
              <span className="font-bold text-xs">PG</span>
            </div>
            <span className="font-semibold text-white">PG AVCB Engenharia</span>
          </div>
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
          <div className="flex gap-4">
             <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
             <a href="#" className="hover:text-white transition-colors">Termos de Serviço</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
