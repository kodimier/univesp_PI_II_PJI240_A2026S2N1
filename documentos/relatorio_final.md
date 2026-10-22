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
University Virtual do Estado de São Paulo
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
ajudando a equipe a acompanhar cada etapa da venda e a entender melhor a necessidade do
cliente (KOTLER; KELLER, 2006). Em empresas prestadoras de serviços técnicos, manter o
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
• Avaliar o sistema finalizado junto aos gestores da PG AVCB, verificando na prática a
economia de tempo no cadastro e os beneficios do atendimento compartilhado.
8
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
2.2.2 RELEVÂNCIA SOCIAL E LOCAL
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
• Unificação da Apresentação: As rotas públicas mantiveram a divulgação dos serviços de
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
os bancos de dados não relacionais orientados a documentos proporcionaram grande
maleabilidade de esquemas e alta capacidade de expansão, dispensando a equipe da
manutenção física de servidores locais. Essa estrutura substituiu controles frágeis mantidos
em planilhas e manuscritos por um ambiente compartilhado, no qual o histórico de vistorias
técnicas (AVCB e CLCB) agora é armazenado de maneira centralizada.
Conforme preconiza Valente (2020), as boas práticas de desenvolvimento recomendam que
chaves de access a serviços em nuvem não sejam expostas em repositórios remotos. Desse
modo, as credenciais administrativas do projeto permanecem guardadas sob variáveis de
ambiente no servidor, assegurando que transações e requisições no Firestore sejam
previamente validadas antes de sua persistência.
2.3.4 CAMADA DE SERVIÇOS BACKEND COM FASTAPI
O FastAPI atua como o serviço intermediário de retaguarda (backend) em linguagem Python.
Segundo Perkovic (2016), o uso do Python no desenvolvimento orientado a serviços oferece
legibilidade, sintaxe direta e facilidade na manipulação de dados em rede. A ferramenta
viabiliza a construção de rotas estáveis e protegidas, funcionando como a ponte de
comunicação entre a interface em Next.js, o banco NoSQL Firebase, a consulta de cadastros
fiscais (BrasilAPI) e os eventos assíncronos do WhatsApp.
A adoção de uma camada dedicada de retaguarda evita a execução de rotinas críticas
diretamente na tela do operador. Conforme ensina Wazlawick (2019), a separação clara de
responsabilidades entre a apresentação visual e os serviços de retaguarda resguarda a
estabilidade e a segurança da informação, impedindo o vazamento de chaves privadas e
credenciais empresariais.
A preservação da infraestrutura em Python herdada do ciclo anterior garante beneficios
técnicos imediatos:
• Reaproveitamento de Ativos: Mantiveram as rotas validadas de saúde do sistema, catálogo
institucional de serviços e captação de contatos.
• Testabilidade Contínua: Permitiu a estruturação de rotinas automáticas com ferramentas de
verificação como o Pytest. Conforme explica Delamaro (2016), o uso metódico de testes de
software identifica falhas de modo precoce, impedindo a regressão do código a cada nova
funcionalidade adicionada.
• Isolamento de Processos: Deixou o Next.js focado na experiência de uso e na acessibilidade
visual, transferindo os cálculos e os acessos externos para a camada de serviços.
Essa configuração converteu o sistema da PGAVCB em um fluxo seguro e transacional,
garantindo que propostas e dados de laudos pudessem ser manipulados concorrentemente por
vários membros da equipe, sem conflito de informações.
2.3.5 INTEGRAÇÃO DE APIS RESTFUL E AUTOMAÇÃO DE DADOS CADASTRAIS
(BRASILAPI)
A troca segura de informações entre plataformas distintas exige serviços padronizados de
comunicação. De acordo com Laudon e Laudon (2014), os sistemas de informação modernos
dependem da integração digital para eliminar gargalos e garantir que dados confiáveis
cheguem a todos os setores de uma empresa.
No CRM da PGAVCB, a integração com o serviço público BrasilAPI atua no preenchimento
automatizado de dados societários. Ao invés do atendente digitar manualmente o nome,
endereço e porte da empresa solicitante, o sistema consulta essas informações a partir do
CNPJ. Conforme indicam Kotler e Keller (2006), a eliminação de atritos operacionais nos
momentos iniciais do atendimento comercial impede a perda de negócios e melhora a
percepção de valor dos serviços prestados.
Para evitar indisponibilidades e manter a segurança, a consulta cadastral seguiu um caminho
controlado pelo servidor:
• Validação Inicial: O operador preenche o CNPJ na interface ou o número é recebido no
fluxo da triagem inicial.
• Requisição pelo Servidor: A camada interna checa a validade sintática do documento e
efetua a chamada ao serviço da BrasilAPI.
• Tratamento e Retorno: Eventuais oscilações externas são contornadas por limites de espera
(timeout), devolvendo os campos padronizados à interface ou permitindo a complementação
manual caso a rede pública fique fora do ar.
• Gravação Centralizada: Com a revisão visual da equipe, as informações societárias oficiais
são gravadas no Firestore junto ao cadastro do cliente.
Esse preenchimento automático reduziu de minutos para segundos a abertura de pastas
técnicas de regularização, eliminando erros de digitação e permitindo que os colaboradores
dediquem atenção à análise das exigências técnicas do Corpo de Bombeiros conforme a
legislação vigente.
2.3.6 INTEGRAÇÃO COM A WHATSAPP CLOUD API
O aplicativo WhatsApp representa o ponto de entrada mais expressivo para o contato de
clientes na PGAVCB. No Projeto Integrador II, esse canal passa a ser integrado ao sistema
por meio da interface oficial disponibilizada pela Meta (WhatsApp Cloud API), comunicando-
se com o backend por meio de eventos assíncronos (webhooks). A utilização da interface
oficial assegura o estrito respeito à privacidade e à legalidade no tratamento de contatos
comerciais, em conformidade com as diretrizes da Lei Geral de Proteção de Dados
(PINHEIRO, 2021).
Conforme diagnosticado na reunião com a coordenação da empresa, a dependência de um
aparelho móvel único provocava atrasos nas conversas, extravio de pedidos e impossibilidade
de atendimento coletivo. Conforme apontam Demo et al. (2015), o gerenciamento sistemático
do relacionamento com o cliente (CRM) exige canais corporativos integrados, sob pena de
pulverizar informações estratégicas em meios informais.
O fluxo de funcionamento da mensageria organiza-se da seguinte maneira:
• Recepção de Notificações: Ao chegar uma mensagem no número corporativo, o serviço da
Meta dispara um aviso para a rota segura do servidor intermediário.
Persistência do Histórico: A mensagem é registrada no banco em nuvem e classificada na
fila de espera da equipe.
Atendimento Simultâneo: Qualquer colaborador autenticado no painel web pode abrir o
diálogo e responder diretamente pela tela do computador, sem precisar manusear o aparelho
telefônico fisico.
• Busca Cadastral no Chat: Se o cliente informa o número de seu CNPJ na conversa, o
sistema aciona a BrasilAPI em segundo plano, preenchendo os dados do imóvel ou empresa
de forma imediata.
Essa centralização trouxe ordem ao atendimento, estabelece estágios formais para as
negociações (novo, em triagem, proposta e concluído) e garante que nenhum orçamento fique
esquecido na caixa de entrada.
2.3.7 CONTROLE DE VERSÃO E TESTES AUTOMATIZADOS NO GITHUB
O versionamento colaborativo do projeto utiliza o sistema Git com repositório remoto no
GitHub. De acordo com Valente (2020), o emprego de ferramentas de controle de versão é
elementar na engenharia de software contemporânea, pois viabiliza a cooperação entre
membros da equipe, garante a rastreabilidade do histórico de mudanças e previne
sobreposições acidentais no código-fonte.
A organização do repositório atendeu diretamente às exigências pedagógicas da UNIVESP,
permitindo auditar o envolvimento de cada integrante através por intermédio do repositório
https://github.com/kodimier/univesp PI II PJI240 A2026S2N1 ao longo das semanas de
desenvolvimento:
Divisão de Responsabilidades: Códigos de interface, rotas do servidor e relatórios
acadêmicos são submetidos pelos respectivos responsáveis pelas entregas.
Fluxo de Ramificações: O grupo emprega ramificações (branches) de desenvolvimento
(dev) para novas implementações, resguardando a linha principal estável (main) para as
versões entregues e avaliadas.
• Sanitização de Código: O arquivo .gitignore bloqueia o envio de pastas locais extensas e
protege dados sigilosos e credenciais do projeto.
• Garantia de Qualidade: Rotinas de testes programadas no Pytest validam o funcionamento
das rotas da aplicação. Como indicam Delamaro (2016), as rotinas de verificação
automatizadas oferecem confiabilidade técnica, garantindo que o acoplamento de novas telas
não comprometa recursos homologados previamente.
Para a parceira externa, essas boas práticas asseguram a entrega de um código limpo,
documentado e reproduzível, pronto para receber novas evoluções no futuro.
2.3.8 ACESSIBILIDADE DIGITAL E ERGONOMIA DE SOFTWARE
A construção de sistemas corporativos acessíveis visa garantir que qualquer pessoa,
independentemente de eventuais limitações funcionais ou tecnológicas, possa operar as telas
com eficiência e conforto. Essa diretriz tem respaldo legal na Lei Brasileira de Inclusão da
Pessoa com Deficiência (BRASIL, 2015), que estabelece a obrigatoriedade da disponibilidade
de recursos acessíveis em canais de informação e comunicação digital.
Conforme explicam Torres, Mazzoni e Alves (2002), a acessibilidade no espaço virtual
demanda escolhas técnicas deliberadas de design e codificação, assegurando que conteúdos e
formulários sejam plenamente perceptíveis e manuseáveis por todos os públicos. No painel de
CRM da PGAVCB, essas recomendações refletem-se no uso de marcações semânticas em
todos os campos de entrada, controle adequado de contraste de cores para facilitar a leitura e
possibilidade de operar todos os botões e formulários exclusivamente por atalhos de teclado.
O presente projeto baseou-se nas diretrizes internacionais de acessibilidade para páginas web
(conhecidas internacionalmente pela sigla ally), estabelecidas pelo consórcio W3C por meio
das Web Content Accessibility Guidelines (WCAG 2.1). Essa especificação divide os critérios
de conformidade em quatro pilares essenciais: perceptibilidade, operabilidade,
compreensibilidade e robustez. A importância dessas normas no cenário nacional também foi
demonstrada em pesquisas que examinam a sua integração com o padrão brasileiro e-MAG
(BACH et al., 2009).
Durante a construção do painel administrativo, a adequação a esses parâmetros abrangeu a
aplicação rigorosa de marcação semântica em formulários (utilizando elementos como label),
o ajuste preciso da proporção de contraste entre os elementos visuais e o fundo, a garantia de
navegação fluida por meio de atalhos de teclado e a compatibilidade com recursos de
acessibilidade, a exemplo de leitores de tela. O sistema passou por auditorias conduzidas por
meio de instrumentos consolidados de análise, como o Google Lighthouse, alinhando-se às
orientações do W3C Brasil (2018). Além disso, a estabilidade operacional da ferramenta foi
assegurada mediante a implementação de rotinas de testes automatizados, tanto unitários
quanto integrados, impedindo que alterações frequentes no repositório do GitHub
provocassem falhas de regressão no ambiente de produção.
Nas telas administrativas implementadas, o cumprimento de tais exigências materializou-se
no emprego de marcação semântica apropriada em formulários (label), na definição de paletas
com contraste adequado e na disponibilização de navegação via teclado e suporte a
tecnologias assistivas. Para assegurar a eficácia dessas medidas, a validação da acessibilidade
associou recursos automatizados a inspeções manuais, contemplando testes práticos de
navegação por teclas e verificação com leitores de tela (W3C BRASIL, 2020).
2.4 APLICAÇÃO DAS DISCIPLINAS ESTUDADAS NO PROJETO INTEGRADOR
O desenvolvimento da solução final para a PG AVCB reuniu conhecimentos práticos de
diversas disciplinas cursadas na UNIVESP ao longo da graduação:
Desenvolvimento Web e Fundamentos de Internet e Web: A construção da interface visual e
a estruturação das rotas do sistema refletiram diretamente os ensinamentos dessas
disciplinas. O uso do framework Next.js combinado com a biblioteca React possibilitou a
renderização híbrida e o carregamento sob demanda, assegurando a reatividade e a
navegação dinâmica exigidas para o painel de CRM e para a landing page institucional
(VALENTE, 2020; FLANAGAN, 2021).
Algoritmos e Programação de Computadores / Programação Orientada a Objetos: A lógica
por trás da manipulação assíncrona de dados, o tratamento de respostas HTTP e a
estruturação dos scripts de backend em Python utilizando o framework FastAPI
fundamentaram-se nos conceitos de modularidade, clareza sintática e tratamento estruturado
de dados assimilados nas disciplinas de programação (PERKOVIC, 2016; WAZLAWICK,
2019).
• Banco de Dados: A adoção do Google Firebase Firestore como modelo de Backend as a
Service (BaaS) e banco de dados NoSOL orientado a documentos decorre diretamente do
estudo de estruturas não relacionais. A flexibilidade na criação de coleções e documentos
permitiu armazenar perfis de clientes, dados fiscais e o histórico de interações de forma
centralizada e escalável, superando as limitações de controles fragmentados em planilhas
(ELMASRI; NAVATHE, 2018).
Interface Humano-Computador (IHC): Os critérios de usabilidade, a organização visual do
painel administrativo e a conformidade estrita com as diretrizes de acessibilidade digital
(WCAG 2.1 e padrão e-MAG) aplicaram-se diretamente no desenho de elementos semânticos
(label), na definição de contrastes adequados e na garantia de navegação por atalhos de
teclado e tecnologias assistivas (TORRES; MAZZONI; ALVES, 2002; W3C BRASIL,
2020).
• Engenharia de Software / Gerência e Qualidade de Software: A redução de falhas e a
garantia da estabilidade do código foram alcançadas por meio de práticas de versionamento
contínuo no GitHub e da aplicação de testes automatizados com ferramentas como Pytest e
Jest, assegurando a rastreabilidade das alterações e prevenindo falhas de regressão no
ambiente produtivo (DELAMARO, 2016; VALENTE, 2020).
Segurança da Informação: A preocupação com a proteção de dados corporativos e
credenciais confidenciais refletiu-se na isolação de chaves sensíveis (como a chave de
serviço do Firebase e parâmetros da BrasilAPI) em variáveis de ambiente, impedindo a
exposição direta de regras de negócio ou chaves privadas no navegador do usuário.
Gestão da Inovação e Desenvolvimento de Produtos Planejamento Estratégico de
Negócios: A concepção da ferramenta pautou-se em metodologias ágeis e centrais no ser
humano, como o Design Thinking, permitindo compreender os problemas operacionais da
empresa PG AVCB que sofria com o fluxo centralizado de atendimento em um único
aparelho celular, o projeto integrador entregou uma solução sob medida que reestruturou o
funil de conversão e a emissão de laudos de AVCB e CLCB (VIANNA et al., 2012).
2.5 METODOLOGIA
A metodologia do projeto apoia-se nos princípios do Design Thinking, uma abordagem
participativa e prática para a resolução de problemas organizacionais. Conforme abordam
Filatro e Cavalcanti (2023) e Vianna et al. (2012), o Design Thinking estimula o
desenvolvimento de soluções sustentadas pela empatia, pelo trabalho colaborativo e pela
experimentação prática contínua, colocando as reais necessidades dos usuários no centro das
decisões de projeto. O projeto divide-se em três etapas principais: Ouvir e Interpretar, Criar e
Prototipar, e Implementar e Testar.
2.5.1 OUVIR E INTERPRETAR
A etapa inicial focou na compreensão dos gargalos vivenciados pela empresa parceira no
atendimento a estabelecimentos comerciais e condomínios. Por meio de reunião com a
gestora da PGAVCB, SRa. Kátia, catalogou-se a demora nas respostas pelo aplicativo, o
risco de perda de contatos comerciais por falta de histórico e a lentidão na coleta manual de
dados para vistorias técnicas. A apuração permitiu constatar que a prioridade da empresa não
era mais a criação de uma página institucional simples, mas a implantação de uma ferramenta
de gestão integrada (CRM) que organizasse a triagem de atendimentos de forma colaborativa.
2.5.2 CRIAR E PROTOTIPAR
Com base nas necessidades diagnosticadas, a equipe definiu os requisitos prioritários para a
evolução do sistema. A solução traduziu-se na modelagem de um módulo administrativo
construído em Next.js para o painel de atendimento e no desenho da persistência em nuvem
com o banco NoSQL Google Firebase. Os protótipos contemplaram a automatização cadastral
por meio da BrasilAPI, o suporte à acessibilidade digital e a arquitetura assíncrona para
recepção de mensagens do WhatsApp. Conforme preconizam Vianna et al. (2012), a
prototipagem antecipa a visualização da ferramenta final e valida as escolhas de engenharia
antes da entrega conclusiva.
2.5.3 IMPLEMENTAR E TESTAR
A etapa conclusiva do ciclo metodológico consistiu na codificação definitiva, integração dos
serviços em nuvem, validação técnica e entrega operacional da plataforma à empresa parceira.
A construção do software seguiu um fluxo colaborativo estruturado no repositório GitHub, no
qual as implementações na camada visual (Next.js) e no servidor intermediário (FastAPI)
foram gerenciadas por meio de ramificações (branches) dedicadas. Antes da consolidação na
linha principal do projeto, o código passou por baterias de testes automatizados com o uso da
ferramenta Pytest, assegurando a integridade das rotas de comunicação com o banco de dados
Google Firebase Firestore, a estabilidade das consultas cadastrais via BrasilAPI e o correto
processamento dos eventos assíncronos oriundos da WhatsApp Cloud API.
Em paralelo à verificação funcional do código, as telas do módulo administrativo foram
submetidas a auditorias de acessibilidade digital e ergonomia. A combinação de análises
automatizadas via Google Lighthouse com inspeções manuais confirmou a eficácia das
marcações semânticas em formulários (label), a adequação das taxas de contraste visual e a
fluidez da navegação integral por atalhos de teclado e leitores de tela, cumprindo os critérios
da norma WCAG 2.1.
Com o ambiente devidamente estabilizado e homologado, realizou-se a implantação da
solução e a sessão de apresentação prática junto à administração e aos operadores da PG
AVCB. Durante os testes de aceitação em cenário real de uso, a equipe da consultoria operou
o funil de atendimento de forma simultânea em diferentes computadores, validando a
recepção centralizada de mensagens e o preenchimento automático de dados societários e de
condomínios a partir do CNPJ.
O retorno apresentado pelos gestores da PG AVCB foi amplamente positivo, atestando o êxito
na conclusão do projeto. A administração destacou que a ferramenta solucionou de maneira
definitiva o gargalo antes concentrado em um único aparelho celular, proporcionando redução
imediata no tempo de abertura de pastas técnicas e elaboração de orçamentos, além de
conferir maior rastreabilidade, segurança e organização ao acompanhamento dos processos de
emissão e renovação de laudos AVCB e CLCB perante o Corpo de Bombeiros.