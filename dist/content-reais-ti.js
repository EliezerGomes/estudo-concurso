/* Enunciados consultados no acervo Qconcursos; respostas conferidas no
   Gabarito Oficial Definitivo Retificado CETAP de 15/04/2025, página 10,
   Cargo 06, Prova 1. Não reproduzimos os enunciados: leitura externa. */
(() => {
  const source='https://www.qconcursos.com/questoes-de-concursos/provas/fundacao-cetap-2025-banpara-tecnico-em-informatica-desenvolvimento-de-sistemas-e-acompanhamento-de-projetos/questoes?page=3';
  const gabaritoSource='https://anexos.cdn.selecao.net.br/uploads/237/concursos/148/anexos/27bba549-f8fc-41f9-8186-2fb830e5ffd8.pdf#page=10';
  const entries=[
    ['esp-algoritmos',41,'Q3256011','expressão booleana',2,'Na conjunção, todos os termos devem ser verdadeiros; a variável negada precisa ser falsa.'],
    ['esp-projetos',43,'Q3256013','domínios do PMBOK',0,'O tratamento de ameaças e oportunidades integra o domínio de incertezas.'],
    ['esp-dw',44,'Q3256014','ETL',2,'Preparar e adequar formatos pertence à transformação; carregar grava os dados no destino.'],
    ['esp-qualidade',45,'Q3256015','maturidade CMMI',2,'A melhoria contínua com inovação caracteriza o nível 5, em otimização.'],
    ['esp-bancos',49,'Q3256019','normalização relacional',0,'A terceira forma normal não proíbe chaves estrangeiras. Elas sustentam relações entre tabelas.'],
    ['esp-projetos',56,'Q3256026','PMBOK 7',4,'Sustentabilidade não aparece como domínio de desempenho nessa edição específica.'],
    ['esp-qualidade',57,'Q3256027','DevOps e processo de desenvolvimento',1,'DevOps promove colaboração entre desenvolvimento e operações, apoiada por automação; não separação rígida.']
  ];
  window.QUESTOES_REAIS_TI=entries.map(([lessonId,number,id,topic,answer,comment])=>({lessonId,question:{
    prompt:`Questão ${number} — ${topic}. Abra a fonte e localize ${id}; leia o enunciado e as alternativas originais antes de responder aqui.`,
    options:['Alternativa A','Alternativa B','Alternativa C','Alternativa D','Alternativa E'],answer,
    explanation:`${comment} Resposta conferida no gabarito oficial definitivo retificado, Cargo 06, Prova 1, página 10.`,
    origin:`CETAP • BANPARÁ 2025 • Desenvolvimento de Sistemas e Acompanhamento de Projetos • Prova 1 • questão ${number} (${id})`,
    source,gabaritoSource,externalPrompt:true
  }}));
})();
