/* Fontes oficiais verificadas. Questões só serão inseridas após conferir o enunciado e a correspondência do caderno. */
window.QUESTOES_REAIS = [];
(() => {
  const source='https://www.qconcursos.com/questoes-de-concursos/provas/fundacao-cetap-2025-banpara-tecnico-em-informatica-desenvolvimento-de-sistemas-e-acompanhamento-de-projetos/questoes';
  const gabaritoSource='https://anexos.cdn.selecao.net.br/uploads/237/concursos/148/anexos/27bba549-f8fc-41f9-8186-2fb830e5ffd8.pdf#page=10';
  const rows=[
    ['pt-interpretacao',1,'C','interpretação','A síntese correta conecta o cuidado pessoal à capacidade de ajudar outras pessoas.'],
    ['pt-redacao',2,'B','pronomes de tratamento','Vossa dirige-se ao interlocutor; Sua refere-se à autoridade mencionada. O comando pede a formulação inadequada.'],
    ['pt-classes',3,'E','tratamento de autoridades','O tratamento tradicional indicado para magistrados é Vossa Excelência.'],
    ['pt-coesao',4,'A','antonímia','Compassivo expressa compaixão; a alternativa oficial contrapõe essa qualidade à severidade.'],
    ['pt-regencia',6,'D','pronome oblíquo','O complemento pronominal é objeto direto; a classificação como indireto é a afirmação incorreta.'],
    ['pt-periodo',8,'A','predicação','Verbo de ligação acompanhado de predicativo forma predicado nominal, não verbal.'],
    ['rl-proporcoes',11,'E','vazões','Saída líquida: 1/4 − 1/5 = 1/20 da capacidade por hora. Tempo: 20 horas.'],
    ['rl-numeros',13,'A','equação em problema','600/(n−2) − 600/n = 25. Logo n(n−2)=48 e n=8.'],
    ['rl-numeros',14,'D','sistema de equações','L+A=87 e L+2A=120. Portanto A=33 e L=54.'],
    ['rl-relacoes',15,'A','conjuntos','Há 42 pessoas fora do conjunto das arquitetas. Logo esse é o máximo para moradoras não arquitetas.'],
    ['leg-anticorrupcao',17,'E','leniência','A colaboração efetiva da pessoa jurídica pode fundamentar acordo de leniência, conforme art.16 da Lei12.846.']
  ];
  for(const [lessonId,n,letter,topic,explanation] of rows){
    window.QUESTOES_REAIS.push({lessonId,question:{
      prompt:`Questão ${n} — ${topic}. Abra o enunciado original na fonte (identificador Q${3255970+n}), leia as alternativas e registre aqui sua resposta.`,
      externalPrompt:true,
      options:['Alternativa A','Alternativa B','Alternativa C','Alternativa D','Alternativa E'],
      answer:'ABCDE'.indexOf(letter),explanation,
      origin:`CETAP · BANPARÁ2025 · Técnico em Informática/Desenvolvimento · Cargo06 · Prova1 · questão${n}`,
      source,gabaritoSource,
      verification:'Enunciado consultado no acervo Qconcursos; resposta conferida no gabarito oficial definitivo retificado, página10. Questões5 e12 anuladas não incluídas.'
    }});
  }
})();
window.PROVAS_REAIS_VERIFICADAS = [{
  title:'CETAP — PGE/PA 2021 — Cargo 08: Técnico de Procuradoria / Informática',
  source:'https://anexos.cdn.selecao.net.br/uploads/237/concursos/139/anexos/dtQgJDxXBcenigcg03IsgI1mc3Q7R0CWPMb7prq1.pdf',
  gabaritoSource:'https://anexos.cdn.selecao.net.br/uploads/237/concursos/139/anexos/oyb9VEwwqjTedB4VcjKfe6FuVhCMct2wxzUIQ7IZ.pdf',
  officialPage:'https://fundacaocetap.selecao.net.br/informacoes/139/',
  notes:'Gabarito definitivo de 24/11/2021, página 3, Cargo 08. Questões 2 e 14 anuladas. PDF da prova escaneado: classificação dos temas ainda pendente de leitura visual.',
  answers:['C',null,'B','B','D','D','A','C','A','C','C','C','D',null,'D','D','D','A','A','C','D','B','D','A','C','C','D','D','B','B','D','C','A','B','D','D','A','A','C','A','C','B','A','C','B','B','D','D','A','A','C','C','C','B','A','D','A','C','D','D']
}];
