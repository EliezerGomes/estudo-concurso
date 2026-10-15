/* Enunciados consultados no acervo externo; respostas reproduzidas pelo Qconcursos. */
(() => {
 const source='https://www.qconcursos.com/questoes-de-concursos/provas/fundacao-cetap-2017-prefeitura-de-ourem-pa-agente-administrativo/questoes?discipline_ids%5B%5D=46';
 const entries=[
 ['info-hardware','Q2743736',0,'Software designa os programas e instruções. Hardware é a parte física; processamento, entrada e saída são operações.'],
 ['esp-bases','Q2743736',0,'A distinção central é entre os componentes físicos e os programas executados. O item trata dos programas.'],
 ['esp-arquitetura','Q2743740',2,'O acervo registra C: II e III. A afirmação I inverte volatilidade: RAM perde seu conteúdo quando falta energia. A III adota a definição tradicional de ROM; existem variantes reprogramáveis, como EEPROM, que exigem essa ressalva técnica.'],
 ['info-planilhas','Q2743745',1,'A média de C1=4 e C2=6 é 5, valor de B3. As outras expressões não produzem o valor da célula indicada: A soma 1+5=6; C máximo de1 e2=2; D média de4 e5=4,5; E mínimo de4 e6=4.']
 ];
 window.QUESTOES_REAIS??=[];
 for(const [lessonId,id,answer,explanation] of entries)window.QUESTOES_REAIS.push({lessonId,question:{prompt:`Abra a fonte em “Prova e origem” e localize ${id}. Leia o enunciado e as alternativas originais; registre aqui sua escolha antes de revelar o gabarito.`,options:['Alternativa A da questão original','Alternativa B da questão original','Alternativa C da questão original','Alternativa D da questão original','Alternativa E da questão original'],answer,explanation:explanation+' Gabarito reproduzido pelo acervo Qconcursos; não houve conferência com o documento primário da banca.',origin:`CETAP · Ourém/PA · Agente Administrativo · 2017 · ${id}`,source,gabaritoSource:source,externalPrompt:true}});
})();
