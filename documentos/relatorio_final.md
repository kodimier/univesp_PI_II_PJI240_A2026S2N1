UNIVERSIDADE VIRTUAL DO ESTADO DE SÃO PAULO
Bruna Tavares Kumayama
Bruno Pinheiro de Oliveira
Celso Albuquerque Gonçalves
Fernando Lima Barbosa
Leandro Yoshio Shimada
Nelson Thomaz Michels
Paulo Fellipe Proença dos Santos
Victor Hugo Ferreira Paschoal
Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB
| Vídeo de apresentação do Projeto Integrador  <link>   |
Itanhaém / Peruíbe - SP
2026
UNIVERSIDADE VIRTUAL DO ESTADO DE SÃO PAULO
Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB 
Relatório Técnico-Científico apresentado na disciplina de Projeto Integrador II para o curso de Ciência de Dados, Engenharia de Computação e Tecnologia da Informação da Universidade Virtual do Estado de São Paulo (UNIVESP).
Itanhaém / Peruíbe - SP
2026
KUMAYAMA, Bruna Tavares; OLIVEIRA, Bruno Pinheiro de; GONÇALVES, Celso Albuquerque; BARBOSA, Fernando Lima; SHIMADA, Leandro Yoshio; MICHELS, Nelson Thomaz; SANTOS, Paulo Fellipe Proença dos; PASCHOAL, Victor Hugo Ferreira. Implementação de Módulo CRM e Automação de Leads com Next.js e Firebase para a empresa PGAVCB. Relatório Técnico-Científico. Ciência de Dados, Engenharia de Computação e Tecnologia da Informação – Universidade Virtual do Estado de São Paulo. Tutor: Amanda Silva do Carmo. Polo Itanhaém e Peruíbe, 2026.
RESUMO
Este trabalho apresenta o desenvolvimento e a entrega final de um sistema web voltado à empresa PG AVCB, consultoria de Engenharia de Segurança Contra Incêndios que atua no litoral sul de São Paulo. O projeto surgiu da necessidade de organizar o grande volume de mensagens recebidas pela empresa após a criação do seu site inicial, o que causava demora nas respostas pelo WhatsApp, dificuldade para dividir os chamados entre a equipe e lentidão no cadastro manual de empresas e condomínios. O objetivo principal foi construir e integrar um módulo de gestão de relacionamento com o cliente CRM ao painel administrativo existente, utilizando Next.js, FastAPI e banco de dados em nuvem Google Firebase, além de automatizar a busca de dados de CNPJ pela BrasilAPI e aplicar regras de acessibilidade digital. A metodologia seguiu os passos do Design Thinking (ouvir, criar e implementar), mantendo contato direto com os gestores da empresa em todas as etapas. Como resultado final, o sistema foi concluído e colocado em funcionamento com sucesso, permitindo que vários atendentes trabalhem ao mesmo tempo no funil de vendas e preencham cadastros em poucos segundos, com código validado por testes automatizados no GitHub. Nas considerações finais, destaca-se o retorno bastante positivo da administração da PG AVCB, que aprovou a ferramenta e relatou ganho imediato de tempo na emissão de orçamentos e maior controle sobre os processos de vistoria. 
.
PALAVRAS-CHAVE: Acessibilidade Web; BrasilAPI; CRM; Design Thinking; FastAPI; GitHub; Google Firebase; Next.js; PG AVCB; WhatsApp.
LISTA DE ILUSTRAÇÕES
FIGURA 1 -   	
FIGURA 2 -   	
FIGURA 3 -   	
SUMÁRIO
1 INTRODUÇÃO  	
2 DESENVOLVIMENTO  	
2.1   	
2.  	 
REFERÊNCIAS  	 
 
 
1 INTRODUÇÃO
O setor de Engenharia de Segurança Contra Incêndios trabalha diretamente com a emissão e renovação de documentos obrigatórios, como o Auto de Vistoria do Corpo de Bombeiros (AVCB) e o Certificado de Licença do Corpo de Bombeiros (CLCB). Por lidar com normas técnicas de prevenção e exigências legais das autoridades públicas, entre elas o Corpo de Bombeiros da Polícia Militar do Estado de São Paulo, as empresas da área precisam de um atendimento rápido e organizado para não perder prazos importantes. A empresa parceira deste trabalho, a PG AVCB, atende clientes nas cidades de Praia Grande, Peruíbe e região. No semestre anterior, a empresa recebeu uma página web com painel básico, o que aumentou sua visibilidade na internet e trouxe novos interessados pelos seus serviços. 
Esse crescimento no número de contatos, porém, trouxe uma dificuldade prática para a rotina do escritório. Como todos os pedidos chegavam em um único aparelho celular via WhatsApp, o atendimento ficou sobrecarregado. Não havia como dividir as conversas entre diferentes funcionários ao mesmo tempo, gerando demora no retorno aos clientes, perda do histórico de negociações e desistência de condomínios e comércios que precisavam de orçamentos urgentes. Além disso, para abrir uma pasta de vistoria ou montar uma proposta, era preciso digitar manualmente todos os dados da empresa cliente como razão social, endereço completo e CNPJ, uma tarefa demorada e sujeita a erros de digitação. 
Diante dessa situação real, o objeto de estudo deste trabalho consiste na criação e implementação de um módulo de CRM (Customer Relationship Management) facilitando a gestão de relacionamento com o cliente, integrado ao painel administrativo da PG AVCB. O sistema foi construído com o framework Next.js na parte visual, FastAPI no processamento interno e banco de dados em nuvem Google Firebase. Para resolver a lentidão nos registros, foi adicionada uma busca automática de dados de empresas por meio da BrasilAPI, além de recursos de acessibilidade digital e rotinas de testes automatizados controlados pelo GitHub. 
O uso de sistemas de CRM no ambiente empresarial é reconhecido na literatura de administração como uma forma prática de reunir dados que antes ficavam espalhados, ajudando a equipe a acompanhar cada etapa da venda e a entender melhor o que o cliente precisa (KOTLER; KELLER, 2018). Em empresas prestadoras de serviços técnicos, manter o registro claro dos contatos evita falhas de comunicação interna e aumenta a confiança de quem contrata o serviço (DEMO et al., 2015). Do mesmo modo, a engenharia de software moderna aponta que o desenvolvimento de sistemas web modulares, apoiados por bancos em nuvem e testes contínuos, garante programas mais estáveis e fáceis de manter no dia a dia (WAZLAWICK, 2019).