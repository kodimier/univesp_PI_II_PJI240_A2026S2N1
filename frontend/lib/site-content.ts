export type SiteContent = {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    title: string;
    text: string;
  };
  contact: {
    title: string;
    description: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
};

export const STORAGE_KEY = "pgavcb_site_content";

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "PG AVCB Engenharia",
    shortName: "PG",
    tagline: "Proteção completa para o seu patrimônio",
    description:
      "Segurança contra incêndio com atendimento técnico, processo claro e conformidade com as normas vigentes.",
  },
  hero: {
    eyebrow: "Engenharia de prevenção contra incêndio",
    title: "Proteção completa para o seu patrimônio.",
    subtitle:
      "Atendimento especializado em AVCB, CLCB, laudos técnicos e soluções para condomínios, empresas e indústrias.",
    primaryCta: "Falar com especialista",
    secondaryCta: "Conhecer soluções",
  },
  about: {
    title: "Excelência técnica e transparência",
    text:
      "A PG AVCB nasceu para unir rigor técnico, atendimento humano e clareza no processo de regularização. Trabalhamos para reduzir riscos, acelerar aprovações e entregar soluções seguras e eficientes para cada tipo de imóvel.",
  },
  contact: {
    title: "Pronto para regularizar seu imóvel?",
    description:
      "Preencha o formulário e nossa equipe vai avaliar o seu caso com rapidez, clareza e atenção técnica.",
  },
  services: [
    {
      id: "avcb",
      title: "Obtenção e Renovação de AVCB",
      description:
        "Acompanhamento completo para vistoria, documentação e regularização do Auto de Vistoria do Corpo de Bombeiros.",
      icon: "shield",
    },
    {
      id: "clcb",
      title: "Emissão de CLCB",
      description:
        "Processo ágil para obtenção da Certidão de Licença do Corpo de Bombeiros com apoio técnico e documental.",
      icon: "file-check",
    },
    {
      id: "laudos",
      title: "Laudos Técnicos e ART",
      description:
        "Inspeções, laudos de conformidade e emissão de responsabilidade técnica para sua estrutura e operação.",
      icon: "clipboard-list",
    },
    {
      id: "brigada",
      title: "Treinamento de Brigada",
      description:
        "Treinamento prático e teórico para equipes, reforçando segurança e atendimento de emergência.",
      icon: "users",
    },
  ],
};

export function getSiteContent(): SiteContent {
  if (typeof window === "undefined") return defaultSiteContent;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultSiteContent;

    const parsed = JSON.parse(saved) as Partial<SiteContent>;
    return {
      brand: { ...defaultSiteContent.brand, ...parsed.brand },
      hero: { ...defaultSiteContent.hero, ...parsed.hero },
      about: { ...defaultSiteContent.about, ...parsed.about },
      contact: { ...defaultSiteContent.contact, ...parsed.contact },
      services: parsed.services?.length ? parsed.services : defaultSiteContent.services,
    };
  } catch {
    return defaultSiteContent;
  }
}

export function saveSiteContent(nextContent: SiteContent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
}
