import Image from "next/image";
import { getServices, getAssets, assetsByCategory } from "@/lib/api";

const nav = [
  { href: "#contato", label: "Contato" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
];

export default async function Home() {
  const [services, assets] = await Promise.all([
    getServices().catch(() => []),
    getAssets().catch(() => []),
  ]);

  const byCategory = assetsByCategory(assets);
  const icons = byCategory["icons"] ?? [];

  return (
    <>
      <header className="bg-[#c92929] px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
          <p className="max-w-md text-sm font-bold uppercase tracking-wide text-[#fdde55] md:text-base">
            PG AVCB Engenharia contra incêndio.
          </p>
          <nav
            aria-label="Navegação principal"
            className="flex flex-wrap gap-6 text-sm font-extrabold uppercase text-[#dcbe18]"
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:underline">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="border-b border-zinc-200 bg-zinc-50 px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
                Proteção completa contra incêndios
              </h1>
              <p className="text-lg leading-relaxed text-zinc-600">
                Na PGAVCB Engenharia contra Incêndio, oferecemos soluções
                especializadas em segurança contra incêndios, com avaliações
                precisas de AVCB e CLCB, além de laudos técnicos que garantem
                ambientes seguros e conformes às normas vigentes.
              </p>
              <a
                href="#servicos"
                className="inline-flex w-fit rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Saiba mais
              </a>
            </div>

            {icons.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-6 rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
                {icons.map((asset) => (
                  <Image
                    key={asset.id}
                    src={asset.url}
                    alt={asset.name}
                    width={48}
                    height={48}
                    className="opacity-60"
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <section
          id="sobre"
          className="border-b border-zinc-200 bg-white px-6 py-16 text-center"
        >
          <div className="mx-auto max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Especialistas em engenharia contra incêndio
            </h2>
            <p className="text-zinc-600">
              Missão, valores e história da empresa podem ser desenvolvidos aqui
              a partir do bloco equivalente em{" "}
              <span className="font-medium">reference.html</span>.
            </p>
          </div>
        </section>

        <section
          id="servicos"
          className="border-b border-zinc-200 bg-zinc-50 px-6 py-16"
        >
          <div className="mx-auto max-w-6xl space-y-10">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-semibold text-zinc-900">
                Segurança contra incêndios: expertise e dedicação
              </h2>
            </div>

            {services.length > 0 && (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((svc) => (
                  <li
                    key={svc.id}
                    className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="mb-2 font-semibold text-zinc-900">
                      {svc.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600">
                      {svc.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section id="contato" className="px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-semibold text-zinc-900">Contato</h2>
            <p className="mt-2 text-zinc-600">
              Formulário e demais blocos podem ser adicionados aqui conforme o
              layout em <span className="font-medium">reference.html</span>.
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-zinc-200 bg-zinc-100 px-6 py-8 text-center text-sm text-zinc-600">
        PG AVCB Engenharia contra incêndio.
      </footer>
    </>
  );
}
