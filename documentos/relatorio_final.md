UNIVERSIDADE VIRTUAL DO ESTADO DE SÃO PAULO
Bruna Tavares Kumayama
Bruno Pinheiro de Oliveira
Celso Albuquerque Gonçalves
Fernando Lima Barbosa
Leandro Yoshio Shimada
Nelson Thomaz Michels
Paulo Fellipe Proença dos Santos
Victor Hugo Ferreira Paschoal
Implementação de Módulo CRM e Automação de Leads com Next.js e
Firebase para a empresa PGAVCB
Vídeo de apresentação do Projeto Integrador
<link>
Itanhaém / Peruíbe - SP
2026
UNIVERSIDADE VIRTUAL DO ESTADO DE SÃO PAULO
Implementação de Módulo CRM e Automação de Leads com Next.js e
Firebase para a empresa PGAVCB
Relatório Técnico-Científico apresentado na
disciplina de Projeto Integrador II para o curso
de Ciência de Dados, Engenharia de
Computação e Tecnologia da Informação da
Universidade Virtual do Estado de São Paulo
(UNIVESP).
Itanhaém/Peruíbe - SP
2026
KUMAYAMA, Bruna Tavares; OLIVEIRA, Bruno Pinheiro de; GONÇALVES, Celso
Albuquerque; BARBOSA, Fernando Lima; SHIMADA, Leandro Yoshio; MICHELS, Nelson
Thomaz; SANTOS, Paulo Fellipe Proença dos; PASCHOAL, Victor Hugo Ferreira.
Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a
empresa PGAVCB. Relatório Técnico-Científico. Ciência de Dados, Engenharia de
Computação e Tecnologia da Informação  Universidade Virtual do Estado de São Paulo.
Tutor: Amanda Silva do Carmo. Polo Itanhaém e Peruíbe, 2026.
RESUMO
Este trabalho apresenta o desenvolvimento e a entrega final de um sistema web voltado à
empresa PG AVCB, consultoria de Engenharia de Segurança Contra Incêndios que atua no
litoral sul de São Paulo. O projeto surgiu da necessidade de organizar o grande volume de
mensagens recebidas pela empresa após a criação do seu site inicial, o que causava demora
nas respostas pelo WhatsApp, dificuldade para dividir os chamados entre a equipe e lentidão
no cadastro manual de empresas e condomínios. O objetivo principal foi construir e integrar
um módulo de gestão de relacionamento com o cliente CRM ao painel administrativo
existente, utilizando Next.js, FastAPI e banco de dados em nuvem Google Firebase, além de
automatizar a busca de dados de CNPJ pela BrasilAPI e aplicar regras de acessibilidade
digital. A metodologia seguiu os passos do Design Thinking (ouvir, criar e implementar),
mantendo contato direto com os gestores da empresa em todas as etapas. Como resultado
final, o sistema foi concluído e colocado em funcionamento com sucesso, permitindo que
vários atendentes trabalhem ao mesmo tempo no funil de vendas e preencham cadastros em
poucos segundos, com código validado por testes automatizados no GitHub. Nas
considerações finais, destaca-se o retorno bastante positivo da administração da PG AVCB,
que aprovou a ferramenta e relatou ganho imediato de tempo na emissão de orçamentos e
maior controle sobre os processos de vistoria.
PALAVRAS-CHAVE: Acessibilidade Web BrasilAPI; CRM; Design Thinking; FastAPI;
GitHub; Google Firebase; Next.js; PG AVCB; WhatsApp.
LISTA DE ILUSTRAÇÕES
FIGURA 1-
FIGURA 2-
FIGURA 3-
1 INTRODUÇÃO
2 DESENVOLVIMENTO
2.1
2.
REFERÊNCIAS
SUMÁRIO
6
1 INTRODUÇÃO
O setor de Engenharia de Segurança Contra Incêndios trabalha diretamente com a emissão e
renovação de documentos obrigatórios, como o Auto de Vistoria do Corpo de Bombeiros
(AVCB) e o Certificado de Licença do Corpo de Bombeiros (CLCB). Por lidar com normas
técnicas de prevenção e exigências legais das autoridades públicas, entre elas o Corpo de
Bombeiros da Polícia Militar do Estado de São Paulo, as empresas da área precisam de um
atendimento rápido e organizado para não perder prazos importantes. A empresa parceira
deste trabalho, a PG AVCB, atende clientes nas cidades de Praia Grande, Peruíbe e região. No
semestre anterior, a empresa recebeu uma página web com painel básico, o que aumentou sua
visibilidade na internet e trouxe novos interessados pelos seus serviços.
Esse crescimento no número de contatos, porém, trouxe uma dificuldade prática para a rotina
do escritório. Como todos os pedidos chegavam em um único aparelho celular via WhatsApp,
o atendimento ficou sobrecarregado. Não havia como dividir as conversas entre diferentes
funcionários ao mesmo tempo, gerando demora no retorno aos clientes, perda do histórico de
negociações e desistência de condomínios e comércios que precisavam de orçamentos
urgentes. Além disso, para abrir uma pasta de vistoria ou montar uma proposta, era preciso
digitar manualmente todos os dados da empresa cliente como razão social, endereço completo
e CNPJ, uma tarefa demorada e sujeita a erros de digitação.
Diante dessa situação real, o objeto de estudo deste trabalho consiste na criação e
implementação de um módulo de CRM (Customer Relationship Management) facilitando a
gestão de relacionamento com o cliente, integrado ao painel administrativo da PG AVCB. Ο
sistema foi construído com o framework Next.js na parte visual, FastAPI no processamento
interno e banco de dados em nuvem Google Firebase. Para resolver a lentidão nos registros,
foi adicionada uma busca automática de dados de empresas por meio da BrasilAPI, além de
recursos de acessibilidade digital e rotinas de testes automatizados controlados pelo GitHub.
O uso de sistemas de CRM no ambiente empresarial é reconhecido na literatura de
administração como uma forma prática de reunir dados que antes ficavam espalhados,
ajudando a equipe a acompanhar cada etapa da venda e a entender melhor o que o cliente
precisa (KOTLER; KELLER, 2006). Em empresas prestadoras de serviços técnicos, manter o
registro claro dos contatos evita falhas de comunicação interna e aumenta a confiança de
quem contrata o serviço (DEMO et al., 2015). Do mesmo modo, a engenharia de software
moderna aponta que o desenvolvimento de sistemas web modulares, apoiados por bancos em
nuvem e testes contínuos, garantem programas mais estáveis e fáceis de manter no dia a dia
de uma empresa (WAZLAWICK, 2019).
2 DESENVOLVIMENTO
2.1 OBJETIVOS
7
Desenvolver e implementar um módulo de CRM integrado ao painel administrativo da
empresa PG AVCB, utilizando Next.js, FastAPI e Google Firebase, para centralizar o
atendimento de clientes, automatizar o preenchimento de cadastros por meio da BrasilAPI e
garantir padrões de acessibilidade e testes de software.
2.1.1 OBJETIVOS ESPECÍFICOS
Identificar as falhas na rotina de atendimento e triagem de mensagens da PG AVCB,
levantando os pontos que geravam atrasos e perda de orçamentos;
• Descrever e projetar as telas do módulo de CRM com foco na facilidade de uso e nas regras
de acessibilidade web (contraste adequado, leitura de tela e uso por teclado);
• Caracterizar a estrutura do banco de dados no Firebase Firestore para salvar o histórico das
conversas e organizar os clientes em colunas de acompanhamento (funil de atendimento);
• Determinar um fluxo de trabalho em equipe no GitHub, aplicando testes automatizados no
código para evitar erros de funcionamento;
Avaliar o sistema finalizado junto aos gestores da PG AVCB, verificando na prática a
economia de tempo no cadastro e os beneficios do atendimento compartilhado.
2.2 JUSTIFICATIVA E DELIMITAÇÃO DO PROBLEMA DELIMITAÇÃO DO
PROBLEMA
A presença de uma empresa na internet exige que ela tenha ferramentas internas capazes de
dar conta da demanda gerada pelo seu site. No cotidiano da PG AVCB, notou-se que o
aumento na procura pelos serviços de regularização contra incêndio travava na hora do
atendimento manual. A equipe não tinha uma tela única para ver quem já havia sido atendido
no WhatsApp ou em qual fase estava cada orçamento, o que causava confusão entre os
funcionários e perda de negócios. Somado a isso, a falta de preenchimento automático de
CNPJ atrasava a criação das pastas técnicas, e o painel anterior ainda precisava de melhorias
de acessibilidade e testes de segurança.
Para orientar a busca por uma solução prática, definiu-se a seguinte pergunta de pesquisa:
"De que maneira a implementação de um módulo CRM integrado à consulta automática de
dados públicos, recursos de acessibilidade e armazenamento em nuvem pode organizar o
atendimento em equipe e acelerar a emissão de propostas de segurança contra incêndio na
empresa PG AVCB?"
2.2.1 JUSTIFICATIVA
A realização deste projeto justifica-se pelos seguintes aspectos:
2.2.2 RELEVANCIA SOCIAL E LOCAL
Ao tornar mais rápida a organização dos processos de AVCB e CLCB, o projeto auxilia
comércios, indústrias e prédios residenciais da Baixada Santista a manterem suas vistorias em
dia perante o Corpo de Bombeiros, colaborando diretamente com a prevenção de acidentes e a
proteção da população local.
2.2.3 RELEVÂNCIA EMPRESARIAL E CULTURAL
A solução substitui anotações em papel e conversas soltas em celulares por um painel
organizado em nuvem. Isso muda a cultura de trabalho da empresa, que passa a atuar de
forma planejada, com histórico salvo e divisão clara de tarefas entre os atendentes.
2.2.4 RELEVANCIA ACADÊMICA
O trabalho permite colocar em prática os conhecimentos adquiridos durante a graduação,
unindo programação web, banco de dados não relacional, qualidade de software e
acessibilidade para resolver um problema real de uma microempresa brasileira.
2.2.5 RELEVÂNCIA E CONTRIBUIÇÕES PARA O PROJETO LOCAL
A PG AVCB passa a contar com uma ferramenta própria, feita sob medida e sem
mensalidades custosas de softwares prontos de mercado. O preenchimento automático de
dados da Receita Federal via BrasilAPI e a organização dos chamados dão fôlego para que a
empresa cresça no Litoral Sul sem perder a qualidade no atendimento.
2.3 FUNDAMENTAÇÃO TEÓRICA
O desenvolvimento do sistema apoiou-se em referências sobre metodologias colaborativas,
gestão de clientes e engenharia de sistemas web, fundamentais para o desenvolvimento do
projeto.
2.3.1 O DESIGN THINKS NA SOLUÇÃO DE PROBLEMAS
Para que um software seja realmente útil e cumpra o seu papel no ambiente corporativo, ele
não pode ser concebido de forma isolada, mas sim pensado a partir da rotina real e das
necessidades cotidianas das pessoas que vão utilizá-lo no dia a dia. Nesse contexto, o Design
Thinking oferece um caminho metodológico prático e centrado no ser humano, fundamentado
na escuta ativa, na troca constante de ideias com os parceiros do projeto e na construção de
protótipos iterativos que podem ser ajustados rapidamente conforme o feedback dos usuários
(CAVALCANTI; FILATRO, 2016). Ao invés de seguir estritamente uma lista fria e
engessada de especificações técnicas tradicionais, a equipe de desenvolvimento adota uma
postura empática, observando de perto o ambiente de trabalho, mapeando gargalos
operacionais e construindo a solução tecnológica lado a lado com os operadores e gestores.
Segundo Vianna et al. (2012), essa imersão profunda no cotidiano das pessoas envolvidas é o
que permite compreender com precisão as reais dificuldades e dores do negócio,
transformando observações qualitativas em diretrizes funcionais e em soluções práticas que
geram valor real e sustentável para a organização.
2.3.2 MÓDULO DE CRM
O conceito de CRM (Customer Relationship Management ou Gestão de Relacionamento com
o Cliente) transcende a mera aquisição ou implantação de uma ferramenta de software
isolada; ele engloba uma reformulação, determinando a maneira como a empresa gerencia
seus fluxos operacionais, padroniza o atendimento, audita o histórico de interações e estreita o
vínculo comercial com o consumidor (KOTLER; KELLER, 2006). Quando uma organização
ou empresa centraliza o repositório de histórico de conversas e informações cadastrais em um
ambiente em nuvem unificado, qualquer operador da equipe ganha escalabilidade e contexto
imediato para dar continuidade a um atendimento em andamento, eliminando a redundância
de solicitar os mesmos dados repetidas vezes ao lead.
Nas pequenas e médias empresas, a ausência desse controle transacional centralizado e de
mecanismos de rastreabilidade costuma gerar rupturas no funil de conversão e perda de
oportunidades comerciais devido a vulnerabilidades operacionais básicas, como a latência
excessiva no envio de propostas técnicas ou falhas de feedback, Demo et al. (2015).
No caso específico da empresa PG AVCB, a materialização desse conceito na arquitetura do
sistema permitiu segmentar os chamados em etapas visuais intuitivas e sequenciais tais como
novo contato, em análise, orçamento enviado e serviço fechado, sanando a desorganização
sistêmica decorrente da centralização de fluxos em um único dispositivo móvel e conferindo
plena conformidade e agilidade ao processo de engenharia; resultando numa resposta positiva
da gerência do estabelecimento em relação ao projeto apresentado.
2.3.3 ARQUITETURA REATIVA EM NEXT.JS E PERSISTÊNCIA EM NUVEM COM
FIREBASE
A construção de um painel voltado à triagem e gestão de contatos exige interfaces dinâmicas,
que combinem respostas imediatas a um tempo de carregamento reduzido. Conforme
explicam Flanagan (2021) e Valente (2020), o desenvolvimento centrado na linguagem
JavaScript e em arquiteturas web modernas viabiliza a execução assíncrona de rotinas e a
atualização rápida da tela, o que impede travamentos e torna o fluxo de navegação mais
produtivo para quem opera o sistema. A utilização de ferramentas reativas baseadas em React
e Next.js permitiu gerenciar o estado da aplicação de forma eficiente, atualizando as listas de
orçamentos e conversas em tempo real.
O Next.js atuou como uma estrutura de desenvolvimento web que aprimora os recursos do
React, organizou a divisão de rotas e o pré-processamento de páginas no lado do servidor. No
escopo evolutivo do Projeto Integrador II, a preservação desse ambiente apoiou-se no
reaproveitamento da base tecnológica homologada no ciclo anterior (Projeto Integrador I). Ao
integrar a página inicial pública e o módulo de CRM sob o mesmo padrão tecnológico, a
equipe eliminou a necessidade de reescrever códigos, mantendo a identidade visual da
plataforma unificada e atendeu aos princípios formativos da UNIVESP quanto à construção
de sistemas web modulares.
Essa divisão de papéis ocorreu de forma simplificada em duas frentes:
• Unificação da Apresentação: As rotas públicas manteram a divulgação dos serviços de
segurança contra incêndios e o formulário de captação, enquanto os caminhos
administrativos concentraram a triagem interna, os contatos corporativos e os estágios do
funil comercial, cujo acesso restringiu-se aos colaboradores da PGAVCB.
Segurança e Desacoplamento: A comunicação entre a interface visual e o servidor
intermediário dá-se via chamadas assíncronas parametrizadas por variáveis de ambiente,
impediu que regras confidenciais ou permissões internas ficassem expostas no navegador do
usuário.
Segundo Wazlawick (2019), a modularização das interfaces facilita a manutenção contínua e
a organização do código. Essa separação também simplifica a conformidade com a legislação
de inclusão e acessibilidade digital (BRASIL, 2015; TORRES; MAZZONI; ALVES, 2002),
permitindo a estruturação correta de rótulos semânticos, bom contraste visual e suporte
integral a atalhos de teclado. Para a rotina da empresa PGAVCB, a interface integrada
extinguiu a dependência de um celular exclusivo, possibilitando atendimentos simultâneos em
diferentes terminais web.
No armazenamento de dados, adotou-se o Google Firebase Firestore sob o modelo de
serviços em nuvem (Backend as a Service - BaaS). De acordo com Elmasri e Navathe (2018),
os bancos de dados não relacionais orientados a documentos proporcionram grande
maleabilidade de esquemas e alta capacidade de expansão, dispensando a equipe da
manutenção física de servidores locais. Essa estrutura substituiu controles frágeis mantidos
em planilhas e manuscritos por um ambiente compartilhado, no qual o histórico de vistorias
técnicas (AVCB e CLCB) agora é armazenado de maneira centralizada.
Conforme preconiza Valente (2020), as boas práticas de desenvolvimento recomendam que
chaves de acesso a serviços em nuvem não sejam expostas em repositórios remotos. Desse
modo, as credenciais administrativas do projeto permanecem guardadas sob variáveis de
ambiente no servidor, assegurando que transações e requisições no Firestore sejam
previamente validadas antes de sua persistência.