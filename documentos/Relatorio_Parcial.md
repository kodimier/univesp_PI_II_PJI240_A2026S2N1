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

Itanhaém/Peruíbe - SP
2026

---

# UNIVERSIDADE VIRTUAL DO ESTADO DE SÃO PAULO

**Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB**

Relatório Técnico-Científico apresentado na disciplina de Projeto Integrador II para o curso de Ciência de Dados, Engenharia de Computação e Tecnologia da Informação da Universidade Virtual do Estado de São Paulo (UNIVESP).

Itanhaém / Peruíbe - SP
2026

---

KUMAYAMA, Bruna Tavares; OLIVEIRA, Bruno Pinheiro de; GONÇALVES, Celso Albiquerque; BARBOSA, Fernando Lima; SHIMADA, Leandro Yoshio; MICHELS, Nelson T; SANTOS, Paulo Fellipe Proença dos; PASCHOAL, Victor Hugo Ferreira.
Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB Título do trabalho. Relatório Técnico-Científico. Ciência de Dados, Engenharia de Computação e Tecnologia da Informação Universidade Virtual do Estado de São Paulo. Tutor: Amanda Silva do Carmo. Polo Itanhaém e Peruíbe, 2026.

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

No que tange à infraestrutura de banco de dados e retaguarda, adota-se o Google Firebase Firestore sob o modelo de Backend as a Service (BaaS). A literatura especializada destaca os benefícios dessa arquitetura distribuída:

> O uso de componentes de software de prateleira e serviços de computação em nuvem permite que a equipe de projeto foque em requisitos de alto nível, acelerando a entrega de valor ao usuário final (PRESSMAN; MAXIM, 2021).

#### 2.3.3 INTEGRAÇÃO DE APIS RESTFUL E AUTOMAÇÃO DE DADOS CADASTRAIS (BRASILAPI)

A eficiência em sistemas modernos assenta-se na capacidade de interoperabilidade por meio de serviços padronizados. Conforme Masse (2012), as APIs RESTful estabelecem interfaces padronizadas orientadas a recursos que operam sobre os métodos e protocolos da web, permitindo que aplicações distintas troquem informações de forma segura e desacoplada em formato JSON.

> "REST APIs provide a standardized way for systems to interact over the web, leveraging HTTP methods and URIs to represent and manipulate network resources. By modeling domain data into clean, addressable representations typically formatted as JSON-applications achieve high levels of interoperability, scalability, and loose coupling between client and server architectures." (MASSE, 2012)

A incorporação da BrasilAPI ao ecossistema do CRM da PGAVCB atua como mecanismo de automação cadastral. Ao fornecer pontes diretas com bases oficiais públicas, a ferramenta permite que a inserção do número de CNPJ de uma entidade solicitante recupere instantaneamente razão social, nome fantasia, endereço completo e situação cadastral, mitigando a morosidade e reduzindo a taxa de inconsistências no banco de dados.

#### 2.3.4 ACESSIBILIDADE DIGITAL (WCAG 2.1) E ENGENHARIA DA QUALIDADE DE SOFTWARE

A acessibilidade em sistemas web (conhecida pelo sigla a11y) é regida internacionalmente pelas diretrizes do consórcio W3C por intermédio das Web Content Accessibility Guidelines (WCAG 2.1). Essa especificação organiza os requisitos de conformidade em quatro princípios fundamentais: perceptibilidade, operabilidade, compreensibilidade e robustez.

Na interface administrativa desenvolvida, o cumprimento dessas diretrizes envolve o uso obrigatório de marcação semântica em formulários (tags `<label>`), cálculo de taxa de contraste adequado entre primeiro plano e fundo, navegabilidade orientada a atalhos de teclado e suporte a tecnologias assistivas (leitores de tela), sendo auditada por meio de ferramentas analíticas consolidadas, como o Google Lighthouse. Por fim, a garantia da estabilidade do software apoia-se na adoção de testes automatizados unitários e de integração, garantindo que modificações contínuas no repositório GitHub não gerem falhas de regressão no ambiente produtivo.

### 2.4 METODOLOGIA

A metodologia adotada para o desenvolvimento deste projeto fundamenta-se no Design Thinking, uma abordagem centrada no ser humano que busca soluções inovadoras por meio da empatia e da colaboração. O processo está sendo estruturado em três etapas: Ouvir e Interpretar, Criar e Prototipar e por último Implementar e Testar.

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
