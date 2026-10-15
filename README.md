# Trilha ALEPA — Programação

Site estático em HTML, CSS e JavaScript, baseado no Anexo II enviado pelo usuário para o **cargo 05 — Analista Legislativo, Programação PL.AL.092**, concurso 002/2026 da ALEPA, banca Fundação CETAP.

## Abrir

Abra `index.html` no navegador. Não há servidor de aplicação, banco de dados ou chave de API. Para servir em rede local, opcionalmente execute `npm start` e acesse `http://localhost:4173`. No celular, conectado à mesma rede, use o IP do computador e a porta 4173, se permitido pelo firewall. A publicação hospedada é uma alternativa ao servidor local.

As aulas e questões funcionam localmente; referências, PDFs externos, fontes tipográficas e vídeos precisam de internet. A interface tem fontes de sistema como alternativa. O navegador pode bloquear alguns vídeos incorporados; existe também link para abrir o vídeo original.

## Recursos

- Drawer por disciplina, busca sem distinção de acentos e navegação direta por aula.
- Teoria, exemplos, referências oficiais e videoaulas externas.
- Dez questões autorais por aula, cinco alternativas, correção imediata e explicação.
- Área separada de questões históricas verificadas, com origem e gabarito revelado sob comando. Nos itens com enunciado externo, abra o caderno na questão indicada e registre a resposta no site.
- Anotações, marcação de conclusão, percentual de acertos e tema escuro.
- Exportação/importação de progresso em JSON. O armazenamento é local ao navegador e à origem: não há sincronização automática entre celular, computador e arquivos locais. Limpar os dados do navegador pode apagar o progresso.
- 57 aulas e 570 exercícios autorais, distribuídos pelas cinco disciplinas do cargo.
- Catálogo dos 65 atos internos do edital, com 68 documentos para leitura no site, links oficiais e identificação das numerações duplicadas no banco da ALEPA.

## Fontes e limites editoriais

O arquivo `edital.pdf` é uma cópia do anexo original, sem alterações. A retificação 002 de 01/10/2026 corrige **Resolução 18/2026 para 18/1989**. O site explicita essa correção; os documentos originais permanecem preservados.

O edital de abertura prevê 50 questões: Português 10, Legislação/Ética 10, Informática 5, Raciocínio Lógico 5 e Específicos 20. As regras de vigência dos itens 11.8 e 11.8.1 devem orientar a leitura da legislação. Fontes atualizadas posteriormente não alteram automaticamente o recorte da prova.

As aulas são material autoral independente, não um curso oficial da banca nem uma garantia de que toda possível cobrança esteja esgotada. A reunião de ementas e atos não equivale à consolidação jurídica integral. As Resoluções 02/1993, 04/1993 e 04/1995 têm registros de assuntos diferentes sob números coincidentes no acervo; as referências são apresentadas sem esconder a ambiguidade.

Somente questões com fonte identificável devem receber o rótulo de prova anterior. As referências de BANPARÁ 2025 foram conferidas com o gabarito definitivo retificado da CETAP. Os exemplos de Ourém 2017 usam respostas reproduzidas pelo acervo Qconcursos, com essa limitação explícita. Os enunciados são consultados externamente e a resposta pode ser marcada e corrigida no site. Ainda há aulas sem questões históricas verificadas. Vídeos federais de processo legislativo são apoio conceitual; prazos e regras locais devem ser estudados na legislação paraense. Nem toda aula dispõe de vídeo específico da ALEPA.

## Arquivos e manutenção

`index.html`, `styles.css` e `app.js` compõem a interface. Os arquivos `content-*.js` contêm as aulas, questões e fontes. Para acrescentar uma aula, use o mesmo schema: `id`, `subject`, `title`, `edital`, `sections`, `sources`, `videos`, `questions` e `realQuestions`. Cada questão usa `prompt`, `options`, `answer` (índice iniciando em zero) e `explanation`.

`collect-normas.mjs` é uma ferramenta opcional de pesquisa das fontes públicas da ALEPA; não é executada pelo site. A pasta `.tools` e os arquivos em `tmp` são auxiliares de pesquisa, não fazem parte da publicação.

Para desenvolvimento e verificações:

```text
npm install
npm test
npm run build
```

O build apenas copia os arquivos estáticos para `dist`. `jsdom` é uma dependência de teste, não é enviado ao navegador. Os testes verificam estrutura e interações no DOM; não substituem inspeção visual em navegadores reais. Nenhum navegador conectado estava disponível durante a implementação inicial.
