Módulo de CRM e Automação de Leads - PG AVCB

Projeto Integrador II para os cursos de Ciência de Dados, Engenharia de Computação e Tecnologia da Informação da Universidade Virtual do Estado de São Paulo (UNIVESP) — Polo Itanhaém / Peruíbe - SP (2026).

📌 Sobre o Projeto

O projeto consiste no desenvolvimento e integração de um Módulo de CRM (Customer Relationship Management) nativo, acoplado ao painel administrativo da empresa PG AVCB (consultoria especializada em Engenharia de Segurança Contra Incêndios no Litoral Sul Paulista).

A solução resolve os gargalos operacionais no atendimento via WhatsApp, permitindo:

Gerenciamento compartilhado de chamados por múltiplos operadores
Automação de dados cadastrais de pessoas jurídicas (CNPJ/CEP via BrasilAPI)
Acompanhamento do funil de vendas para emissão de laudos de AVCB e CLCB
🚀 Principais Funcionalidades
Funil de Atendimento Centralizado: Gestão de solicitações e histórico de negociações em tempo real
Automação Cadastral via BrasilAPI: Consulta e autopreenchimento imediato de dados societários ao informar o CNPJ do cliente
Atendimento Compartilhado no WhatsApp: Integração via WhatsApp Cloud API para múltiplos atendentes operarem o mesmo número corporativo
Acessibilidade Digital (WCAG 2.1): Interface desenvolvida com foco em navegação por teclado, contraste adequado e suporte a leitores de tela
Persistência em Nuvem: Estruturação no banco de dados NoSQL Google Firebase Firestore
🛠 Arquitetura e Tecnologias
Componente	Tecnologia
Frontend	Next.js / React / TypeScript
Backend / API	FastAPI (Python)
Banco de Dados	Google Firebase Firestore (BaaS)
APIs Externas	BrasilAPI (CNPJ/CEP) e WhatsApp Cloud API
Deploy & Infraestrutura	Render (render.yaml)
CI/CD & Qualidade	GitHub Actions (.github/workflows), Pytest (Backend) e Jest (Frontend)
📁 Estrutura do Repositório
.
├── .github/workflows/          # Pipelines de CI/CD para testes automatizados
├── backend/                    # API em FastAPI, regras de negócio e integrações
├── documentos/                 # Relatórios técnicos, sumários e documentações do PI
├── frontend/                   # Painel administrativo e módulo CRM em Next.js
├── .gitignore                  # Arquivos ignorados pelo controle de versão
├── README.md                   # Documentação principal do repositório
└── render.yaml                 # Configurações de deploy e infraestrutura no Render
🌿 Governança de Branches
main: Versão estável e homologada do projeto
dev: Branch principal de desenvolvimento ativo, integração contínua e inclusão de documentação
👥 Integrantes do Grupo
Bruna Tavares Kumayama
Bruno Pinheiro de Oliveira
Celso Albuquerque Gonçalves
Fernando Lima Barbosa
Leandro Yoshio Shimada
Nelson Thomaz Michels
Paulo Fellipe Proença dos Santos
Victor Hugo Ferreira Paschoal

Tutora: Amanda Silva do Carmo
Polo: Itanhaém e Peruíbe - SP

📖 Documentação Adicional

Acesse a pasta /documentos para consultar:

Relatório Técnico-Científico Parcial
Atas de reunião
Planos de testes de acessibilidade e usabilidade
🚀 Quick Start

[Adicione instruções de setup, instalação de dependências e como rodar o projeto em desenvolvimento]

📝 Licença




Última atualização: 2026
