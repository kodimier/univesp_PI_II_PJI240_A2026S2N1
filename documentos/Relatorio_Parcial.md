# UNIVERSIDADE VIRTUAL DO ESTADO DE SÃO PAULO

Bruna Tavares Kumayama
Bruno Pinheiro de Oliveira
Celso Albuquerque Gonçalves
Fernando Lima Barbosa
Leandro Yoshio Shimada
Nelson Thomaz Michels
Paulo Fellipe Proença dos Santos
Victor Hugo Ferreira Paschoal

**Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB**

Itanhaém / Peruíbe - SP
2026

---

# UNIVERSIDADE VIRTUAL DO ESTADO DE SÃO PAULO

**Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB**

Relatório Técnico-Científico apresentado na disciplina de Projeto Integrador II para o curso de Ciência de Dados, Engenharia de Computação e Tecnologia da Informação da Universidade Virtual do Estado de São Paulo (UNIVESP).

Itanhaém / Peruíbe - SP
2026

---

KUMAYAMA, Bruna Tavares; OLIVEIRA, Bruno Pinheiro de; GONÇALVES, Celso Albiquerque; BARBOSA, Fernando Lima; SHIMADA, Leandro Yoshio; MICHELS, Nelson T; SANTOS, Paulo Fellipe Proença dos; PASCHOAL, Victor Hugo Ferreira.
Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB. Relatório Técnico-Científico. Ciência de Dados, Engenharia de Computação e Tecnologia da Informação - Universidade Virtual do Estado de São Paulo. Tutor: Amanda Silva do Carmo. Polo Itanhaém e Peruíbe, 2026.

## RESUMO

Este O presente trabalho documenta o desenvolvimento parcial de uma solução computacional evolutiva voltada à empresa PG AVCB, consultoria especializada em Engenharia de Segurança Contra Incêndios sediada no litoral sul paulista. A pesquisa origina-se do descompasso operacional ocasionado pelo aumento de demandas após o primeiro ciclo do projeto, resultando em sobrecarga na triagem de contatos via WhatsApp, ausência de compartilhamento do atendimento entre múltiplos operadores e lentidão no cadastramento manual de pessoas jurídicas e condomínios. O objetivo central compreende o desenvolvimento e o acoplamento de um módulo de CRM (Customer Relationship Management) acessível ao painel administrativo previamente construído, incorporando consumo automatizado de dados cadastrais via BrasilAPI, diretrizes de acessibilidade na web (WCAG/Lighthouse), suíte de testes de software e persistência em nuvem com Firebase. A metodologia estrutura-se nos preceitos do Design Thinking, perpassando as etapas de imersão, ideação e prototipagem contínua. Os resultados parciais comprovam a viabilidade estrutural do fluxo arquitetural concebido: a extensão dos esquemas do Firebase Firestore para suportar estágios de atendimento, a integração de rotas assíncronas no framework Next.js para consumo de APIs públicas e a aplicação de diretrizes de contraste e navegação por teclado. O versionamento colaborativo sob o GitHub e o emprego de testes automatizados garantem a confiabilidade e estabilidade necessárias para entregar uma ferramenta inclusiva e de alto rendimento corporativo.

**PALAVRAS-CHAVE:** PG AVCB; CRM; Automação de Leads; BrasilAPI; Acessibilidade Web; Firebase; Next.js

## LISTA DE ILUSTRAÇÕES

## SUMÁRIO

## 1 INTRODUÇÃO

No segmento de Engenharia de Segurança Contra Incêndios, a emissão e a renovação de documentos regulatórios, tais como o Auto de Vistoria do Corpo de Bombeiros (AVCB) e o Certificado de Licença do Corpo de Bombeiros (CLCB) configuram serviços de alta especificidade técnica e rigor procedimental, demandando atendimento assertivo e gestão ágil de prazos legais. A empresa parceira PGAVCB, atuante nos municípios de Praia Grande e Peruíbe com abrangência em todo o litoral sul do Estado de São Paulo, concluiu exitosamente no ciclo anterior a implantação de uma infraestrutura web dinâmica com painel administrativo. Tal iniciativa superou o antigo déficit de exposição mercadológica e estabeleceu canais de captação digital integrados.

Contudo, a elevação no volume de acessos e a centralização dos contatos primários no aplicativo WhatsApp revelaram uma nova barreira operacional. A dinâmica de atendimento pulverizou-se em um único canal desprovido de ferramentas de gestão compartilhada, provocando lentidão nas respostas, conversas desordenadas e risco de perda de propostas comerciais de pessoas jurídicas. Paralelamente, o preenchimento dos dados cadastrais necessários para emissão de orçamentos e abertura de pastas técnicas (como razão social, CNPJ, logradouro e atividade econômica) permaneceu dependente de digitação manual, tornando o fluxo de trabalho burocrático e suscetível a erros de transcrição.

Diante deste panorama real de mercado, o objeto do presente projeto integrador consiste no projeto, desenvolvimento e integração de um módulo nativo de CRM (Customer Relationship Management) diretamente acoplado ao painel administrativo da empresa, amparado pelo framework Next.js e pela infraestrutura em nuvem do Google Firebase. O sistema incorpora o consumo automatizado de dados cadastrais públicos por meio da BrasilAPI, o atendimento a padrões rigorosos de acessibilidade web (WCAG 2.1) e uma rotina sistemática de testes e controle de versão profissional via GitHub.

O estudo articula-se organicamente às disciplinas formativas dos cursos de Computação da UNIVESP. Disciplinas como Engenharia de Software, Desenvolvimento Web, Banco de Dados e Interação Humano-Computador fornecem o arcabouço conceitual para transformar necessidades operacionais em componentes de software reutilizáveis, seguros e acessíveis, demonstrando como a tecnologia aplicada mitiga gargalos organizacionais e potencializa a prestação de serviços essenciais à coletividade.

## 2 DESENVOLVIMENTO

### 2.1 OBJETIVOS

Desenvolver e integrar um módulo de CRM (Customer Relationship Management) acessível ao painel administrativo da empresa PGAVCB, fundamentado no framework Next.js e no banco de dados em nuvem Google Firebase, centralizando as demandas de atendimento, automatizando a consulta de dados cadastrais via BrasilAPI e estabelecendo conformidade com diretrizes de acessibilidade e testes de software.

#### 2.1.1 OBJETIVOS ESPECÍFICOS

* Diagnosticar sistematicamente os fluxos de atendimento corporativo da PGAVCB, catalogando as falhas na triagem de contatos e no cadastramento de potenciais clientes.
* Projetar a arquitetura da informação e a interface do módulo de CRM com ênfase em usabilidade e conformidade com as diretrizes da WCAG 2.1 (contraste cromático, semântica e suporte a navegação por teclado).
* Estruturar a persistência em nuvem no Firebase Firestore para gerenciar coleções de contatos organizadas em estágios de funil de vendas e histórico de laudos.
* Estabelecer governança de código no GitHub por meio de fluxos de trabalho colaborativos em ramificações (branches), aplicando testes unitários e de integração para validação contínua da qualidade do artefato.
* Avaliar a solução preliminar junto à comunidade externa, mensurando os ganhos de celeridade e a redução do retrabalho operacional.

### 2.2 DELIMITAÇÃO DO PROBLEMA

A evolução dos ecossistemas digitais impõe que as interfaces corporativas não apenas atraiam visitantes, mas também sustentem a conversão e o relacionamento contínuo com os clientes. Na rotina da PGAVCB, constatou-se que o avanço gerado pela implantação da landing page no ciclo anterior esbarrou em limitações no processamento interno das demandas: múltiplos colaboradores não dispunham de um ambiente unificado para acompanhar o status de orçamentos solicitados via WhatsApp, gerando desencontro de informações e risco concreto de perda de contratos com condomínios e estabelecimentos comerciais.

A esse fator soma-se a inexistência de integrações para validação e busca cadastral, exigindo que dados extensos de pessoas jurídicas fossem coletados e transcritos manualmente para os arquivos de vistoria técnica. O sistema também carecia de auditoria formal de acessibilidade e mecanismos automatizados de testes, requisitos imprescindíveis para a robustez de um sistema de informação. Em virtude desse diagnóstico de campo, estabeleceu-se a seguinte questão de pesquisa:

> "De que forma a integração de um módulo CRM com consumo de API externa, recursos de acessibilidade e persistência em nuvem pode eliminar a perda de potenciais clientes e conferir celeridade ao gerenciamento de laudos de segurança contra incêndio na empresa PG AVCB?"

#### 2.2.1 JUSTIFICATIVA

A execução deste projeto justifica-se por sua relevância em quatro áreas fundamentais:

#### 2.2.2 RELEVÂNCIA SOCIAL E LOCAL

A relevância social do projeto vincula-se diretamente à natureza da atividade da parceira externa: ao conferir eficiência operacional e celeridade ao trâmite de regularização de laudos técnicos perante o Corpo de Bombeiros, a aplicação estimula a conformidade legal de edificações, minimizando riscos de sinistros em áreas comerciais e habitacionais da Baixada Santista e preservando vidas.

#### 2.2.3 RELEVÂNCIA EMPRESARIAL E CULTURAL

Quanto ao viés empresarial e gerencial, a ferramenta emancipa a gestão ao extinguir controles informais em cadernos ou janelas isoladas de aplicativos, estabelecendo rastreabilidade de etapas e métricas consolidadas. Concomitantemente, redefine a identidade cultural de atendimento da marca, migrando de uma postura reativa e fragmentada para uma conduta proativa, colaborativa e pautada na transparência com a comunidade local.

#### 2.2.4 RELEVÂNCIA ACADÊMICA

No domínio acadêmico, o estudo justifica-se pela consolidação de competências em Engenharia de Software e Banco de Dados, evidenciando como técnicas full-stack e boas práticas de acessibilidade se articulam para solucionar demandas concretas de organizações produtivas.

#### 2.2.5 RELEVÂNCIA E CONTRIBUIÇÕES PARA O PROJETO LOCAL

A principal contribuição proporcionada à empresa PGAVCB materializa-se na entrega de um ativo tecnológico proprietário, seguro e altamente escalável, desenvolvido sob medida para mitigar seus gargalos operacionais imediatos. Com a consolidação do módulo de CRM e o consumo automatizado de dados cadastrais via BrasilAPI, a organização supera a dependência de processos manuais e o risco de perda de contatos no atendimento fragmentado por mensagens instantâneas. A plataforma evolui de uma interface de atração inicial para um ambiente robusto de gestão de relacionamento, plenamente apto a qualificar a conversão de acessos em propostas comerciais estruturadas, mantendo o histórico unificado de cada processo de segurança contra incêndios.

Para a comunidade externa e os municípios de Praia Grande e Peruíbe, o projeto fortalece diretamente a economia regional ao modernizar a capacidade operacional de uma empresa prestadora de serviços técnicos essenciais. A otimização do fluxo de atendimento e a celeridade no fornecimento de laudos de AVCB estimulam a regularização e a conformidade legal de estabelecimentos comerciais, industriais e condomínios habitacionais junto ao Corpo de Bombeiros. Dessa forma, a aplicação prática da engenharia de software atua não apenas como vetor de competitividade mercantil e transformação digital, mas como um mecanismo indispensável de salvaguarda do patrimônio edificado e de proteção à vida no Litoral Sul de São Paulo.

### 2.3 FUNDAMENTAÇÃO TEÓRICA

A construção de uma solução web exige a convergência entre metodologias de inovação, estratégias de marketing digital e tecnologias de alta performance. Esta seção fundamenta os pilares teóricos que sustentam o desenvolvimento do projeto.

#### 2.3.1 O DESIGN THINKING NA SOLUÇÃO DE PROBLEMAS

Os requisitos para utilização do módulo de CRM orientou-se pelos preceitos do Design Thinking, assegurando que as funcionalidades planejadas respondessem diretamente às fragilidades operacionais do negócio. Ao afastar-se de um modelo estritamente prescritivo de engenharia de software, a metodologia viabilizou uma dinâmica colaborativa contínua com os gestores da PG AVCB. Nesse processo, a experiência prática da empresa no setor de segurança contra incêndios somou-se às demandas dos clientes por um atendimento ágil, convertendo necessidades reais em diretrizes funcionais para o sistema. O valor dessa construção conjunta apoia-se no arcabouço teórico que concebe a abordagem como uma prática empática e compartilhada:

> "Design Thinking is a problem-solving approach and a human-centered innovation. It's a five step process: Observation, Ideation, Prototyping, Testing and Implementation. It puts people we design for at the center of the process and invites them to co-create solutions." (UNDP, 2014, p. 5).

A condução do trabalho fundamentada na empatia e no diálogo sistemático com os parceiros externos desloca a atuação do grupo da mera implementação de rotinas computacionais para a entrega de um artefato de real utilidade socioeconômica. Essa orientação assegura que a modelagem da interface e as regras de negócio atendam com precisão às fragilidades operacionais diagnosticadas durante a fase exploratória da empresa.

#### 2.3.2 ARQUITETURA REATIVA EM NEXT.JS E PERSISTÊNCIA EM NUVEM COM FIREBASE

A construção de um painel de gestão de leads demanda interfaces reativas com rápido tempo de carregamento e manipulação assíncrona de estado. Conforme apontam Mokoginta, Putri e Wattimena (2024).

> A construção de interfaces reativas e de alto desempenho apoia-se em técnicas avançadas de renderização e carregamento sob demanda, as quais otimizam o processamento no navegador e conferem agilidade na atualização dinâmica dos dados do sistema sem comprometer a experiência do operador (MOKOGINTA; PUTRI; WATTIMENA, 2024).

A utilização de ecossistemas baseados em Next.js e React viabiliza o desenvolvimento de aplicações de alta performance por meio de técnicas de renderização híbrida e manipulação eficiente, assegurando respostas instantâneas às ações dos operadores.

O Next.js configura-se como um framework de desenvolvimento web construído sobre a biblioteca React e a linguagem JavaScript, projetado para otimizar o roteamento de páginas, a divisão de código e os modelos de renderização no servidor. No contexto evolutivo do Projeto Integrador II, a preservação e expansão desse ecossistema justificam-se pela necessidade de reaproveitamento da base tecnológica estabelecida no ciclo anterior (Projeto Integrador I). Ao manter o mesmo arcabouço para a landing page institucional e para o novo módulo de CRM, evita-se a reescrita de código, assegura-se a consistência da identidade visual e consolida-se um ambiente de roteamento unificado, alinhando o artefato às diretrizes formativas da UNIVESP para aplicações web modernas baseadas em componentes desacoplados e hospedagem em nuvem.

A operacionalização do framework estrutura-se em rotas dinâmicas e isolamento de responsabilidades:
* **Unificação da Camada de Apresentação:** Enquanto as rotas públicas mantêm a exposição dos serviços e o formulário de captação de clientes, as rotas administrativas comportam as interfaces internas de triagem de contatos, funil de leads e consulta cadastral de empresas, restritas ao uso dos colaboradores da PG AVCB.
* **Desacoplamento e Segurança Arquitetural:** A comunicação entre o front-end e os serviços de retaguarda dá-se por meio do consumo assíncrono de APIs RESTful estruturadas em FastAPI, parametrizadas por variáveis de ambiente. Esse arranjo impede a exposição indevida de regras de negócio, chaves de autenticação ou lógicas de banco de dados diretamente no navegador do cliente.

Sob a perspectiva da engenharia de software e dos requisitos de usabilidade, a arquitetura adotada viabiliza a centralização dos custos de implantação e manutenção em um único ecossistema computacional. A organização modular das páginas favorece a conformidade com as diretrizes de acessibilidade digital (WCAG 2.1), uma vez que permite delimitar marcações semânticas precisas, controles de foco de teclado e rotas limpas para cada fluxo operacional do CRM.

Para a rotina corporativa da PGAVCB, a solução converte o sítio institucional em um canal dinâmico de conversão e gestão de relacionamento. Os operadores passam a ter acesso concorrente ao sistema administrativo a partir de múltiplos dispositivos via navegador web, mitigando a pulverização de atendimentos no WhatsApp, agilizando a emissão de laudos de AVCB/CLCB e conferindo rastreabilidade técnica a cada processo comercial.

No que tange à infraestrutura de banco de dados e retaguarda, adota-se o Google Firebase Firestore sob o modelo de Backend as a Service (BaaS). A literatura especializada destaca os benefícios dessa arquitetura distribuída:

> O uso de componentes de software de prateleira e serviços de computação em nuvem permite que a equipe de projeto foque em requisitos de alto nível, acelerando a entrega de valor ao usuário final (PRESSMAN; MAXIM, 2021).

O Google Firebase configura-se como um ecossistema abrangente de computação em nuvem estruturado sob o modelo Backend as a Service (BaaS), mantido e operado pela Google. No escopo do Projeto Integrador II, a plataforma é empregada prioritariamente por meio do seu serviço de banco de dados NoSQL orientado a documentos, além de prover a infraestrutura necessária para gerenciamento de sessões e autenticação segura dos operadores do painel administrativo. Esse ambiente gerencia o armazenamento de dados fora do dispositivo local em servidores distribuídos e altamente escaláveis da infraestrutura Google Cloud, eliminando a sobrecarga operacional de provisionar, configurar e manter servidores dedicados de bancos relacionais locais pela equipe.

A incorporação da plataforma Google Firebase atende com precisão ao diagnóstico operacional proposto no atual projeto. O modelo anterior, dependente do recebimento de mensagens fragmentadas em aparelhos telefônicos individuais, gerava extravio de históricos comerciais, desorganização no funil de atendimento e impossibilidade de atuação concorrente por mais de um atendente. O banco NoSQL documental do ecossistema Google Firebase adapta-se de forma nativa a esse cenário: registros de clientes (compostos por dados fiscais, histórico de mensagens e evolução de propostas técnicas) são estruturados em documentos e coleções semi esquematizadas, garantindo acesso seguro, centralizado e em tempo real a partir de qualquer navegador web corporativo. A comunicação com o banco de dados do Google Firebase é intermediada pela camada de serviços em FastAPI, utilizando a biblioteca oficial da Google.

Em conformidade com as boas práticas de segurança da informação, a chave de credenciais de serviço da Google (`serviceAccountKey.json`) jamais é inserida no controle de versões do repositório GitHub. O acesso aos recursos em nuvem é configurado via variáveis de ambiente restritas ao ambiente de execução do servidor. Destacam-se na adoção do Firebase:

* **Segurança por Camadas e Desacoplamento:** O cliente web (navegador do atendente) não possui chaves privilegiadas da plataforma Google; todas as leituras e escritas críticas são validadas pela API intermediária antes da persistência no banco da Google.
* **Centralização de Estado:** Tanto a landing page quanto o painel de CRM sincronizam suas leituras em um único repositório em nuvem, superando controles dispersos em planilhas ou blocos de anotações.
* **Auditabilidade e Pipeline de Testes:** Para garantir a independência dos testes e viabilizar a integração contínua no GitHub, o acesso ao banco da Google Firebase é abstraído por meio de rotinas simuladas (mocks), permitindo que os scripts de teste (como Jest e Pytest) sejam executados em cada commit sem necessidade de conexão real aos servidores de produção da Google.

A plataforma Google Firebase oferta solução para perda de oportunidades comerciais ao transformar conversas isoladas em registros auditáveis. A gestão da empresa PG AVCB ganha autonomia para acompanhar a esteira de atendimento em tempo real, desde o primeiro contato do cliente até a tramitação conclusiva dos laudos junto ao Corpo de Bombeiros.

#### 2.3.3 CAMADA DE SERVIÇOS BACKEND COM FASTAPI

O FastAPI configura-se como um framework assíncrono em linguagem Python projetado para a construção de interfaces de programação de aplicações (APIs) de alto desempenho fundamentadas nos padrões RESTful e no protocolo HTTP. A ferramenta destaca-se pelo suporte nativo à tipagem estática, documentação interativa automatizada e serialização rigorosa de dados de entrada e saída. No projeto em desenvolvimento, o FastAPI atua como a camada intermediária de retaguarda (backend), operando como a ponte de comunicação e isolamento entre a interface de usuário (Next.js), o banco de dados em nuvem (Google Firebase), o serviço de validação cadastral (BrasilAPI) e a integração de mensagens instantâneas do WhatsApp.

Inicialmente, destacamos a utilização do framework Next.js na apresentação e o Google Firebase na persistência. Entretanto, a inserção de uma camada de API dedicada responde a exigências de segurança da informação e governança de software. A execução direta de lógicas críticas no navegador do usuário representaria riscos graves à segurança corporativa da PG AVCB, tais como a exposição pública de chaves de serviço administrativas da Google, tokens de acesso à API do WhatsApp e regras confidenciais de negócio.

A manutenção do ecossistema Python com FastAPI, herdado da infraestrutura consolidada no ciclo anterior (Projeto Integrador I - Landing Page com Painel Administrativo para a Empresa PG AVCB), apresenta vantagens estratégicas determinantes:

* **Reaproveitamento de Ativos de Software:** Preserva e expande as rotas já homologadas de verificação de integridade do sistema (health check), catálogo de serviços técnicos e captura de formulários de contato.
* **Qualidade e Testabilidade:** Facilita a estruturação de rotinas de testes automatizados com o framework Pytest, atendendo rigorosamente aos critérios de validação e controle de qualidade via GitHub.
* **Isolamento de Responsabilidades:** Permite que a camada em Next.js concentre-se nas rotinas de acessibilidade visual, usabilidade e renderização reativa do painel administrativo, enquanto o processamento das regras de negócio permanece centralizado no servidor. O FastAPI não concorre nem substitui o Next.js ou o Google Firebase, mas complementa e orquestra a interoperabilidade entre ambos.

A implementação das rotas no backend estrutura-se para assegurar tráfego assíncrono, estruturado e protegido:

* **Exposição de Endpoints RESTful:** Rotas parametrizadas e consumidas pela interface Next.js por meio da variável de ambiente `NEXT_PUBLIC_API_URL`.
* **Persistência Controlada no Firestore:** Intermediação das operações de leitura e gravação no banco NoSQL do Google Firebase por intermédio de biblioteca, garantindo que nenhuma transação seja efetuada sem validação prévia de privilégios.
* **Consumo de Serviços Públicos Externos:** Integração de cliente HTTP assíncrono para requisições junto à BrasilAPI, processando números de CNPJ informados e estruturando os dados societários para autopreenchimento imediato no cadastro de clientes.

A opção pela utilização pela camada FastAPI emancipa a infraestrutura tecnológica da PG AVCB. A captação de clientes deixa de ser uma mera vitrine estática e converte-se em um fluxo transacional robusto, no qual solicitações de propostas e dados de vistoria técnica são processados de forma estável, segura e simultânea para múltiplos colaboradores. Adicionalmente, a equipe de desenvolvimento de interface obtém liberdade para evoluir e refinar os componentes visuais do CRM com conformidade de acessibilidade (WCAG 2.1) sem a necessidade de reescrever chamadas a bancos ou serviços externos a cada nova tela concebida.

#### 2.3.4 INTEGRAÇÃO DE APIS RESTFUL E AUTOMAÇÃO DE DADOS CADASTRAIS (BRASILAPI)

A eficiência em sistemas modernos assenta-se na capacidade de interoperabilidade por meio de serviços padronizados. Conforme Masse (2012), as APIs RESTful estabelecem interfaces padronizadas orientadas a recursos que operam sobre os métodos e protocolos da web, permitindo que aplicações distintas troquem informações de forma segura e desacoplada em formato JSON.

> "REST APIs provide a standardized way for systems to interact over the web, leveraging HTTP methods and URIs to represent and manipulate network resources. By modeling domain data into clean, addressable representations typically formatted as JSON-applications achieve high levels of interoperability, scalability, and loose coupling between client and server architectures." (MASSE, 2012)

A incorporação da BrasilAPI ao ecossistema do CRM da PGAVCB atua como mecanismo de automação cadastral. Ao fornecer pontes diretas com bases oficiais públicas, a ferramenta permite que a inserção do número de CNPJ de uma entidade solicitante recupere instantaneamente razão social, nome fantasia, endereço completo e situação cadastral, mitigando a morosidade e reduzindo a taxa de inconsistências no banco de dados.

A BrasilAPI constitui uma plataforma pública e colaborativa de interfaces de programação de aplicações (APIs) voltada à integração centralizada de bases de dados abertos governamentais e corporativos no território nacional. No escopo do Projeto Integrador II - Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB, em desenvolvimento, o serviço é consumido para a validação e recuperação estruturada de informações societárias de pessoas jurídicas a partir do número do Cadastro Nacional da Pessoa Jurídica (CNPJ). A consulta retorna dados cadastrais normalizados em formato JSON, abrangendo razão social, nome fantasia, logradouro completo e situação cadastral perante os órgãos reguladores.

A atividade da PGAVCB é voltada ao atendimento corporativo e comercial, com ênfase na emissão e renovação de laudos de AVCB e CLCB para condomínios e estabelecimentos do Litoral Sul paulista. A coleta manual de dados fiscais identificada na fase de diagnóstico gerava morosidade no tempo de resposta e suscetibilidade a erros de digitação nas pastas técnicas de vistoria.

Para mitigar exposições de segurança e assegurar tolerância a falhas, a consulta externa não é disparada diretamente pelo navegador do cliente, mas intermediada pela camada de serviços, sendo algumas das características do uso em FastAPI:

* **Entrada e Validação Sintática:** O operador do sistema informa o número de CNPJ no painel administrativo em Next.js (ou o dado é captado via triagem inicial de atendimento).
* **Requisição Segura no Backend:** A API interna valida os dígitos verificadores do documento e realiza uma chamada HTTP assíncrona ao endpoint oficial `https://brasilapi.com.br/api/cnpj/v1/`
* **Normalização e Retorno:** A camada de retaguarda trata eventuais códigos de erro, aplica políticas de tempo limite (timeout) e repassa o objeto estruturado com os dados cadastrais para o painel em Next.js.
* **Persistência Confiável:** Com a validação visual do operador, o registro do lead é gravado no Google Firebase Firestore com dados oficiais consistentes.
* **Interoperabilidade e Resiliência:** O isolamento da requisição na camada de backend assegura mecanismos de tratamento para cenários de indisponibilidade do serviço público externo, preservando sempre a alternativa de preenchimento manual pelo atendente para evitar o bloqueio do fluxo operacional.
* **Padronização da Base de Dados:** A recuperação direta de registros oficiais elimina inconsistências de formatação nos campos de razão social e logradouro, viabilizando buscas e relatórios analíticos precisos dentro do CRM.

A automação cadastral reduz o tempo de qualificação e abertura de pastas técnicas de minutos para segundos, eliminando o retrabalho de transcrição de dados e permitindo que os colaboradores concentrem seus esforços no atendimento consultivo aos clientes. Concomitantemente, mitiga-se a taxa de desistência nos canais de contato e estabelece-se um histórico comercial confiável e unificado no painel da PGAVCB.

#### 2.3.5 INTEGRAÇÃO COM A WHATSAPP CLOUD API

O canal oficial de mensagens instantâneas da PG AVCB representa a principal via de captação de clientes da empresa. No Projeto Integrador II - Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB, a incorporação desse canal estrutura-se por meio da WhatsApp Business Cloud API (interface oficial mantida pela Meta), operando via recepção assíncrona de eventos (webhooks) direcionados à camada de backend. Essa arquitetura viabiliza que múltiplos operadores compartilhem o mesmo número telefônico corporativo a partir de terminais web distintos, superando a dependência de um dispositivo móvel físico exclusivo. Rejeita-se categoricamente a utilização de bibliotecas não oficiais de automação de interface, escolha que assegura a conformidade estrita aos termos de serviço da plataforma, a conformidade jurídica à Lei Geral de Proteção de Dados (LGPD).

A intervenção técnica responde diretamente ao diagnóstico consolidado na reunião de imersão com a comunidade externa realizada em 19 de agosto de 2026. A análise de campo identificou que a concentração das interações em um único aparelho celular gerava morosidade nas respostas, desorganização no acompanhamento comercial, abandono de propostas por clientes corporativos e ausência total de histórico estruturado. Sem um mecanismo de triagem centralizado, as visitas impulsionadas pela landing page convertiam-se em conversas isoladas. O módulo de CRM estabelece uma camada de gestão e governança sobre essas interações, unificando a esteira de atendimento à persistência em nuvem e à validação cadastral.

A integração entre o canal de mensagens WhatsApp e o sistema ocorre segundo o seguinte fluxo técnico:

* **Recepção de Eventos por Webhook:** O provedor da API encaminha as mensagens recebidas via requisições HTTP POST para o endpoint dedicado no backend (`/api/whatsapp/webhook`), cuja rota correspondente trata a validação formal de segurança exigida pelo protocolo da Meta.
* **Processamento e Persistência:** A camada em FastAPI processa a carga de dados, cadastra ou atualiza a entidade de contato no banco NoSQL Google Firebase e aloca a interação na fila de triagem compartilhada.
* **Atendimento Concorrente:** A interface em Next.js exibe a fila de chamados em tempo real, permitindo que operadores autenticados assumam os atendimentos de forma simultânea. A transmissão das respostas ao cliente dá-se de modo transparente via consumo da API oficial.
* **Automação Cadastral Cruzada:** No momento em que o cliente informa o número do CNPJ no chat, o sistema aciona a BrasilAPI em segundo plano, preenchendo automaticamente razão social, endereço e situação societária na pasta de processo de AVCB/CLCB.

No que tange à segurança da informação, tokens de acesso, credenciais e chaves criptográficas de autenticação permanecem estritamente isolados em variáveis de ambiente protegidas, sem exposição no repositório GitHub.

Evidenciam-se, a seguir, os principais impactos técnicos e as diretrizes de governança de qualidade consolidados pelo sistema:

* **Centralização do Estado Transacional:** O ciclo de vida e o histórico das mensagens residem na infraestrutura em nuvem do Google Firebase, desvinculando o armazenamento de dados da memória física de dispositivos telefônicos locais.
* **Visibilidade Operacional por Estágios:** A aplicação adota estados formais de funil (novo, em triagem, aguardando cliente, convertido e perdido), tornando os gargalos e o tempo de espera plenamente monitoráveis no painel.
* **Estratégia de Testes Contínuos:** Para viabilizar a validação automatizada no GitHub Actions sem depender de chamadas tarifadas ou da infraestrutura em produção, as suítes de testes em Pytest utilizam cargas de dados fictícias (mocks).

A transição para um atendimento centralizado elimina o risco de extravio de propostas e assegura celeridade no atendimento de estabelecimentos e condomínios que demandam regularização contra incêndios no Litoral Sul. A administração e a equipe técnica da PGAVCB passam a operar em paralelo, com distribuição ordenada de carga de trabalho e rastreabilidade total de cada vistoria, integrando a atração digital pública e a captação direta em um funil corporativo unificado.

#### 2.3.6 CONTROLE DE VERSÃO GITHUB

O Git atua como o sistema distribuído de controle de versões empregado para gerenciar o ciclo de vida do código-fonte do projeto, enquanto a plataforma remota GitHub, por meio do repositório oficial `https://github.com/kodimier/univesp_PI_II_PJI240_A2026S2N1` consolida o ambiente colaborativo de desenvolvimento do grupo. A garantia da qualidade do artefato apoia-se na execução sistemática de testes automatizados, estruturados com o framework Pytest no backend e com Jest no frontend, integrados a rotinas de integração contínua via GitHub Actions.

A estruturação do versionamento atende rigorosamente às diretrizes pedagógicas da UNIVESP. O acompanhamento acadêmico da disciplina requer a comprovação da participação individual dos integrantes do grupo do Projeto Integrador II por meio de registros de autoria auditáveis no repositório. Dessa maneira:

* Os módulos de serviços e rotas de API são versionados diretamente pelos integrantes responsáveis pela implementação da camada de retaguarda.
* A pasta `documentos/` concentra as contribuições dos membros designados para fundamentação bibliográfica, elaboração de relatórios técnicos e demais documentos teóricos.
* A execução e o monitoramento de rotinas de testes automatizados via GitHub consolidam as metas operacionais previstas para a validação contínua da qualidade.

A ausência desse ecossistema comprometeria a auditabilidade do desenvolvimento em equipe e privaria a aplicação de salvaguardas essenciais contra falhas de regressão no módulo de CRM.

O gerenciamento do repositório adota um fluxo estruturado de trabalho cooperativo com políticas estritas de governança de código:

* **Modelo de Ramificações (Branches):** Utiliza-se a ramificação `dev` para integração e desenvolvimento ativo das funcionalidades, reservando-se a ramificação `main` para as versões estáveis e homologadas para entrega e avaliação.
* **Padronização de Entregas:** Adoção de commits semânticos e descritivos em língua portuguesa, preservando o histórico cronológico individual de cada colaborador sem reescrita artificial de histórico.
* **Modularização de Diretórios:** Organização física delimitada entre a camada de apresentação (`frontend/`), as regras de negócio e rotas de integração (`backend/`) e os artefatos acadêmicos (`documentos/`).
* **Rastreabilidade e Avaliação Transparente:** O histórico descentralizado documenta de forma inequívoca o escopo de atuação de cada desenvolvedor nas camadas de frontend, backend e documentação analítica.
* **Prevenção de Regressão por Integração Contínua:** A esteira de CI no GitHub impede a inserção silenciosa de inconsistências entre as rotas da interface web, a API intermediária e os objetos simulados (mocks) da camada de dados.
* **Revisão Sistemática de Código:** A utilização de pull requests dirigidos à ramificação de desenvolvimento viabiliza a auditoria prévia entre os pares antes da consolidação definitiva dos recursos no sistema.

Para a PG AVCB, a governança de código entrega um ativo tecnológico modular, reprodutível e documentado, possibilitando que novos colaboradores executem, testem e publiquem a aplicação de maneira padronizada, eliminando divergências de ambiente e mitigando vulnerabilidades antes da homologação final do protótipo.

#### 2.3.7 MÓDULO DE CRM

A gestão estratégica do relacionamento com o cliente ultrapassa a mera utilização de canais digitais de contato, demandando a estruturação de processos integrados que garantam a rastreabilidade e a perenidade das interações comerciais. O Customer Relationship Management (CRM) não deve ser concebido exclusivamente como uma ferramenta tecnológica ou um banco de dados transacional, mas como uma estratégia organizacional integrada que alinha tecnologia, pessoas e processos para mapear necessidades, personalizar o atendimento e elevar os níveis de fidelização e retenção de clientes.

> O Customer Relationship Management não se resume a uma ferramenta tecnológica ou a um software isolado, configurando-se como uma estratégia de negócios voltada ao entendimento e à antecipação das necessidades dos clientes. Trata-se de uma abordagem holística que integra processos, pessoas e tecnologia para atrair e fidelizar o público, maximizando o valor do relacionamento ao longo do tempo. (ZENONE, 2019)

Nesse sentido, a consolidação de uma plataforma de CRM visa mitigar a fragmentação comunicacional, estabelecendo uma visão unificada e contínua do ciclo de vida de cada consumidor na organização.

No cenário diagnosticado na empresa PG AVCB, a expansão das demandas evidenciou a insuficiência de controles informais mantidos em dispositivos móveis individuais. A centralização dos atendimentos em conversas isoladas gerava lentidão no retorno, perda de histórico e riscos na formalização de propostas técnicas de regularização contra incêndios. A implementação de um módulo de CRM integrado responde a essa vulnerabilidade gerencial ao transformar mensagens esparsas em um funil corporativo estruturado:

* **Centralização e Rastreabilidade do Histórico:** Cada solicitação de orçamento de AVCB passa a ser registrada em um repositório centralizado em nuvem, garantindo que múltiplos operadores acessem os antecedentes da negociação sem perda de contexto operacional.
* **Qualificação e Segmentação de Leads:** O módulo categoriza os estágios de atendimento (triagem inicial, proposta em elaboração, laudo emitido), permitindo à administração acompanhar gargalos na conversão de novos clientes corporativos e condomínios.
* **Mitigação do Descompasso Operacional:** A automatização de etapas de cadastro aliada à visão sistêmica do relacionamento reduz o retrabalho manual de digitação, permitindo que a equipe corporativa dedique maior tempo à consultoria técnica preventiva e ao cumprimento de prazos legais.

Dessa forma, o módulo de CRM atua como o elo estruturante que converte o tráfego gerado pela presença digital da empresa em ativos relacionais e econômicos consistentes, assegurando eficiência operacional, suporte à tomada de decisões gerenciais e excelência na prestação de serviços de segurança contra incêndios no Litoral Sul.

#### 2.3.8 ACESSIBILIDADE DIGITAL (WCAG 2.1) E ENGENHARIA DA QUALIDADE DE SOFTWARE

A acessibilidade em sistemas web (conhecida pelo sigla a11y) é regida internacionalmente pelas diretrizes do consórcio W3C por intermédio das Web Content Accessibility Guidelines (WCAG 2.1). Essa especificação organiza os requisitos de conformidade em quatro princípios fundamentais: perceptibilidade, operabilidade, compreensibilidade e robustez.

Na interface administrativa desenvolvida, o cumprimento dessas diretrizes envolve o uso obrigatório de marcação semântica em formulários (tags `<label>`), cálculo de taxa de contraste adequado entre primeiro plano e fundo, navegabilidade orientada a atalhos de teclado e suporte a tecnologias assistivas (leitores de tela), sendo auditada por meio de ferramentas analíticas consolidadas, como o Google Lighthouse. Por fim, a garantia da estabilidade do software apoia-se na adoção de testes automatizados unitários e de integração, garantindo que modificações contínuas no repositório GitHub não gerem falhas de regressão no ambiente produtivo.

### 2.4 METODOLOGIA

A metodologia adotada para o desenvolvimento deste projeto fundamenta-se no Design Thinking, uma abordagem centrada no ser humano que busca soluções inovadoras por meio da empatia e da colaboração. O processo está sendo estruturado em quatro etapas: Ouvir e Interpretar, Criar e Prototipar e por último Implementar e Testar.

#### 2.4.1 OUVIR E INTERPRETAR

Na fase inicial deste novo ciclo, o grupo buscou aprofundar a compreensão sobre os desafios operacionais da comunidade externa, representada pela empresa PGAVCB, atuante no segmento de Engenharia de Segurança Contra Incêndios no Litoral Sul de São Paulo.

As informações foram coletadas por meio de uma reunião com a Sra. Kátia. Durante a conversa, foram diagnosticadas as principais dores decorrentes do crescimento da demanda digital: a sobrecarga e lentidão no atendimento via WhatsApp, a perda de clientes em potencial por falta de histórico das conversas, a impossibilidade de múltiplos colaboradores atenderem no mesmo canal e a morosidade no preenchimento manual de cadastros de pessoas jurídicas e condomínios que demandam laudos de AVCB. Além disso, a equipe realizou uma análise técnica da infraestrutura web existente.

Essa abordagem qualitativa permitiu identificar que o problema central já não se limitava à presença digital estática superada no ciclo anterior, mas concentrava-se na carência de um sistema integrado de CRM com persistência em nuvem, automação de consultas cadastrais e recursos de acessibilidade para organizar e agilizar o fluxo operacional de atendimento.

#### 2.4.2 CRIAR E PROTOTIPAR

A partir da análise dos dados coletados na fase de imersão, o grupo adotou a estratégia de engenharia de requisitos para idealizar a evolução da solução tecnológica, visando converter as dores operacionais dos sócios em funcionalidades de software que aliem robustez técnica, usabilidade e inclusão digital. Nesse contexto, utilizou-se a abordagem qualitativa para mapear as funcionalidades prioritárias, transformando o diagnóstico de sobrecarga nas conversas de WhatsApp, morosidade cadastral e falta de triagem compartilhada em requisitos funcionais e não funcionais do sistema.

A solução em desenvolvimento consiste na implementação de um módulo nativo de CRM (Customer Relationship Management) diretamente integrado ao painel administrativo da PGAVCB. Para assegurar elevado desempenho, respostas dinâmicas e navegabilidade acessível, o front-end está sendo desenvolvido em JavaScript com a biblioteca React e o framework Next.js. Essa interface incorpora requisitos rigorosos de acessibilidade web (baseados nas diretrizes da WCAG 2.1), contemplando contraste cromático regulado, navegação orientada a atalhos de teclado e marcação semântica.

Na camada de retaguarda e persistência de dados, a arquitetura conecta-se ao banco de dados em nuvem Google Firebase, viabilizando a gestão centralizada do funil de contatos e a sincronização em tempo real das etapas de atendimento e histórico de orçamentos de AVCB/CLCB. Complementando a infraestrutura, o sistema integra rotas para o consumo assíncrono da BrasilAPI, permitindo a validação e o autopreenchimento dinâmico de dados cadastrais (como razão social, logradouro e município) a partir da inserção do CNPJ ou CEP do solicitante.

No que tange à prototipagem, qualidade de código e governança de desenvolvimento, a equipe utiliza o GitHub como plataforma de versionamento distribuído. A estrutura adota branches estruturadas para o trabalho colaborativo simultâneo e rotinas de testes automatizados com Jest e Pytest para validação contínua de componentes e rotas. Atualmente, o projeto encontra-se na fase de codificação dos componentes reativos do painel de CRM e estruturação dos esquemas de dados no Firebase Firestore.

#### 2.4.3 IMPLEMENTAR E TESTAR

Por se tratar de um relatório parcial, a fase de testes e implementação final configura-se como o próximo marco do cronograma definido no Plano de Ação. Nesse sentido, foram estipuladas estratégias metodológicas que contemplam diferentes etapas de validação do módulo CRM e de suas respectivas integrações arquiteturais.

Inicialmente, será adotado um protocolo rigoroso de testes de software, no qual a aplicação será submetida a avaliações de usabilidade e acessibilidade digital (em conformidade com as diretrizes WCAG 2.1), bem como a testes funcionais e de integração. O objetivo central desta etapa é verificar a integridade do fluxo de dados assíncrono entre o painel de atendimento (front-end em Next.js), a consulta automatizada de dados cadastrais (via BrasilAPI) e a persistência estruturada do funil de leads no banco de dados em nuvem Google Firebase.

Além disso, o grupo realizará uma nova reunião técnica de validação com a comunidade externa, representada pelos sócios da PGAVCB, para a apresentação e homologação do protótipo funcional do sistema. Essa imersão prática tem como finalidade coletar devolutivas (feedbacks) quanto à facilidade de uso do novo ambiente de CRM, avaliando a eficiência da triagem de contatos corporativos, a redução do tempo de preenchimento de cadastros e a eficácia do atendimento compartilhado por múltiplos operadores.

Por fim, com base nas observações e métricas obtidas junto aos usuários finais, serão propostas e implementadas as correções de código e melhorias de interface necessárias antes da entrega definitiva do sistema. Dessa forma, busca-se garantir que a solução tecnológica atue efetivamente como um motor de produtividade, promovendo agilidade, rastreabilidade plena das vistorias técnicas e total autonomia na gestão de relacionamento com os clientes da empresa.

### 2.5 RESULTADOS PRELIMINARES

Os resultados preliminares deste projeto refletem a transição do diagnóstico teórico para a materialização técnica da solução, seguindo o ciclo do Design Thinking proposto para o projeto integrador.

#### 2.5.1 RESULTADOS PRELIMINARES

A fase de imersão resultou na identificação clara dos gargalos operacionais e de comunicação da PGAVCB decorrentes do aumento de demandas após o primeiro ciclo (Projeto Integrador I). O principal resultado foi a consolidação de uma lista de requisitos críticos de sistema, validados em reunião com a administradora da empresa Sra. Kátia.

* **Sobrecarga e Perda de Contatos no WhatsApp:** O diagnóstico mais relevante apontou que o direcionamento de contatos exclusivamente para um único número de WhatsApp gera morosidade no tempo de resposta, duplicidade, desorganização na triagem e perda de potenciais clientes corporativos que desistem pelo tempo de espera. Além disso, mensagens cruciais acabam esquecidas na caixa de entrada sem qualquer histórico estruturado.
* **Ausência de Atendimento Simultâneo e Distribuído:** Identificou-se a impossibilidade de dividir o fluxo de atendimento entre múltiplos colaboradores da equipe em diferentes computadores, limitando a capacidade operacional da empresa no litoral sul durante os picos de solicitações de regularização de AVCB (Auto de Vistoria do Corpo de Bombeiros) e CLCB (Certificado de Licença do Corpo de Bombeiros).
* **Morosidade no Processo Manual de Cadastro de Leads:** Constatou-se que a coleta de dados de novos clientes ainda ocorria de forma estritamente manual, gerando lentidão e retrabalho na digitação de informações cadastrais extensas de empresas e condomínios.
* **Definição de Requisitos para o Módulo de CRM:** Os sócios enfatizaram a urgência de centralizar os contatos em um ecossistema próprio. Isso culminou no requisito primordial do projeto: construir um módulo de CRM integrado ao painel existente, apoiado pela persistência em nuvem no Firebase e pelo autopreenchimento de cadastros via BrasilAPI, garantindo uma interface acessível e colaborativa para toda a equipe operacional.

#### 2.5.2 RESULTADOS DO PASSO: CRIAR (PROTOTIPAGEM E ARQUITETURA)

Na etapa de ideação e arquitetura, a equipe expandiu a modelagem conceitual do sistema anterior. Foi estruturado o Modelo Entidade-Relacionamento (figura 1) do módulo CRM para o Firebase Firestore, incorporando novas entidades para registro de interações e dados empresariais:

```text
-------------------------------------------------------
|                ENTIDADE: CLIENTE                    |
-------------------------------------------------------
| PK id_cliente     : String (UUID / Hash Firestore)  |
|    cnpj           : String (14 dígitos)             |
|    razao_social   : String (via BrasilAPI)          |
|    nome_fantasia  : String (via BrasilAPI)          |
|    cep            : String (8 dígitos)              |
|    logradouro     : String                          |
|    municipio      : String (Praia Grande / Peruíbe) |
|    telefone_contato: String                         |
|    email          : String                          |
-------------------------------------------------------
                        |
                    1:N (Gera)
                        v
-------------------------------------------------------
|              ENTIDADE: PROCESSO_CRM                 |
-------------------------------------------------------
| PK id_processo    : String                          |
| FK id_cliente     : String                          |
|    tipo_servico   : String (AVCB / CLCB / Laudo / FAT)|
|    status_funil   : String (Novo / Em Triagem / Proposta)|
|    origem_lead    : String (WhatsApp / Orgânico)    |
|    historico_notas: Array of Objects [Data, Operador]|
|    data_criacao   : Timestamp                       |
-------------------------------------------------------
```
*Legenda: Modelo Entidade-Relacionamento*

A arquitetura de software desenhada conecta a interface Next.js ao banco Firebase Firestore (figura 2), intermediada por rotas assíncronas que realizam a comunicação com a BrasilAPI:

```text
[ Usuário / Operador ]
    | (Navegador com suporte a acessibilidade e teclado)
    v
[ Frontend: Next.js / React (Módulo CRM) ]
    |
    +---> [ API Route / Backend FastAPI ] ---> [ BrasilAPI Externa (CNPJ/CEP) ]
    |
    +---> [ Google Firebase Firestore (Persistência em Nuvem / BaaS) ]
```
*Legenda: conexão de interface a banco de dados*

#### 2.5.3 RESULTADOS DO PASSO: IMPLEMENTAR (SOLUÇÃO INICIAL)

Embora o cronograma esteja em sua fase intermediária, a infraestrutura inicial para o desenvolvimento do módulo de CRM alcançou sua entrega concreta fundamental com a estruturação formal do repositório (figura 3) no GitHub. `https://github.com/kodimier/univesp_PI_II_PJI240_A2026S2N1`

*Legenda: Criação de repositório GitHub*

A criação do ambiente de controle de versão distribuído dedicado à evolução do sistema, com a ramificação de desenvolvimento, estruturação do fluxo de trabalho baseado em branches e padronização de commits semânticos para assegurar a rastreabilidade integral das alterações.

## REFERÊNCIAS

UNDP. Design Thinking for Public Service Excellence. Singapura: UNDP Global Centre for Public Service Excellence, 2014.

BRASILAPI. Brasil API: transformando o Brasil em uma API. Disponível em: https://brasilapi.com.br/docs. Acesso em: 10 set. 2026.

CHACON, Scott; STRAUB, Ben. Pro Git. 2. ed. New York: Apress, 2014. Versão atualizada em out. 2024. Disponível em: https://git-scm.com/book/pt-br/v2

FASTAPI. FastAPI Documentation. 2026. Disponível em: https://fastapi.tiangolo.com/.

FLANAGAN, David. JavaScript: o guia definitivo. 7. ed. Porto Alegre: Bookman, 2021. Disponível em: https://app.minhabiblioteca.com.br/reader/books/9788582607008. Acesso em: 10 set. 2026.

ZENONE, Luiz Claudio. CRM (Customer Relationship Management): marketing de relacionamento, fidelização de clientes e pós-venda. São Paulo: Actual/Grupo Almedina, 2019. E-book. ISBN 9788562937248. Disponível em: https://app.minhabiblioteca.com.br/reader/books/9788562937248/

KRUG, Steve. Não me faça pensar: uma abordagem de bom senso à usabilidade na web. 2. ed. Rio de Janeiro: Alta Books, 2005. Disponível em: https://www.ks-1.ru/data/images/61/cele591f36ad754cb7afffa8babeaa0cfba90ee4.pdf. Acesso em: 10 set. 2026.

MASSE, Mark. REST API design rulebook: designing consistent RESTful web service interfaces. " O'Reilly Media, Inc.", 2011.

MOKOGINTA, Putri; WATTIMENA, C. Developing Modern JavaScript Frameworks for Building Interactive Single-Page Applications. International Journal Software Engineering and Computer Science (IJSECS), v. 4, n. 2, p. 484-496, ago. 2024.

PRESSMAN, Roger S.; MAXIM, Bruce R. Engenharia de software: uma abordagem profissional. 9. ed. Porto Alegre: AMGH, 2021.

SÃO PAULO (Estado). Decreto Estadual nº 69.118, de 09 de dezembro de 2024. Institui o Regulamento de Segurança contra Incêndios das edificações e áreas de risco no Estado de São Paulo. Diário Oficial do Estado de São Paulo, São Paulo, 09 dez. 2024. Disponível em: https://www.al.sp.gov.br/repositorio/legislacao/decreto/2024/decreto-69118-09.12.2024.html

WORLD WIDE WEB CONSORTIUM (W3C). Web Content Accessibility Guidelines (WCAG) 2.1. W3C Recommendation, 2018. Disponível em: https://www.w3.org/TR/WCAG21/

THE A11Y PROJECT. The A11Y Project: a community-driven effort to make digital accessibility easier. Disponível em: https://www.a11yproject.com/
