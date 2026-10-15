import fs from 'node:fs';
import assert from 'node:assert/strict';
import { JSDOM, VirtualConsole } from 'jsdom';
const files=['content-gerais.js','content-legislacao.js','content-informatica.js','content-especificos.js'];
for(const optional of ['content-regimento.js','content-pessoal.js','content-normas.js','content-reais.js','content-reais-ti.js','content-reais-basicos.js','content-tips.js','content-exams.js','study-tools.js'])if(fs.existsSync(optional))files.push(optional);
const errors=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://alepa.example/',runScripts:'outside-only',virtualConsole:vc,pretendToBeVisual:true});
const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
for(const file of files)w.eval(fs.readFileSync(file,'utf8'));
const lessons=[...w.GERAIS,...w.LEGISLACAO,...(w.REGIMENTO||[]),...(w.PESSOAL||[]),...w.INFORMATICA,...w.ESPECIFICOS];
const ids=new Set();let questions=0;let words=0;
for(const l of lessons){assert(!ids.has(l.id),'duplicate id '+l.id);ids.add(l.id);assert.equal(l.questions.length,10,l.id);assert(l.sections.length>=3,l.id);assert(l.sources.length,l.id);for(const s of l.sections){assert(s.title&&s.body,l.id);words+=s.body.replace(/<[^>]+>/g,' ').split(/\s+/).length}for(const r of [...l.sources,...l.videos]){assert.equal(new URL(r.url).protocol,'https:')}const stems=new Set();for(const q of l.questions){assert(!stems.has(q.prompt),l.id+' duplicate question');stems.add(q.prompt);assert.equal(q.options.length,5,l.id);assert.equal(new Set(q.options).size,5,l.id+' duplicate options');assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<5,l.id);assert(q.explanation.length>10,l.id+' short explanation');questions++}}
w.eval(fs.readFileSync('app.js','utf8'));
assert.equal(w.document.querySelectorAll('.subject-card').length,5);
const tick=()=>new Promise(resolve=>setTimeout(resolve,10));
for(const l of lessons){w.location.hash=l.id;await tick();assert.equal(w.document.querySelector('h1').textContent,l.title);assert.equal(w.document.querySelectorAll('#exercicios .quiz-card').length,10);for(const [i,q]of l.questions.entries()){const card=w.document.querySelectorAll('#exercicios .quiz-card')[i];card.querySelectorAll('.option')[q.answer].click();assert(card.querySelector('.feedback').textContent.includes('Você acertou'),l.id+' correct feedback');assert.equal(card.querySelectorAll('button:disabled').length,5)}assert(w.document.querySelector('#quiz-summary').textContent.includes('10 acertos'));w.document.querySelector('#retry').click();const q=l.questions[0];w.document.querySelectorAll('#exercicios .quiz-card')[0].querySelectorAll('.option')[(q.answer+1)%5].click();assert(w.document.querySelector('.feedback').textContent.includes('incorreta'),l.id+' incorrect feedback');const notes=w.document.querySelector('#notes');notes.value='Revisar '+l.id;notes.dispatchEvent(new w.Event('input'));w.document.querySelector('[data-complete]').click();assert(JSON.parse(w.localStorage.getItem('trilha-alepa-v1')).done.includes(l.id));}
w.location.hash='inicio';await tick();assert(w.document.querySelector('#side-percent').textContent==='100%');
w.document.querySelector('#search').value='NÃO-EXISTE-123';w.document.querySelector('#search').dispatchEvent(new w.Event('input'));assert(w.document.querySelector('#curriculum').textContent.includes('Nenhuma aula'));
w.document.querySelector('#search').value='formula';w.document.querySelector('#search').dispatchEvent(new w.Event('input'));assert(w.document.querySelectorAll('.lesson-link').length>0);
w.document.querySelector('#menu-toggle').click();assert(w.document.querySelector('#sidebar').classList.contains('open'));w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));assert(!w.document.querySelector('#sidebar').classList.contains('open'));
assert(w.document.body.classList.contains('dark'));w.document.querySelector('#theme').click();assert(!w.document.body.classList.contains('dark'));w.document.querySelector('#theme').click();
let realCount=0;for(const l of lessons){if(!l.realQuestions?.length)continue;w.location.hash=l.id;await tick();const cards=w.document.querySelectorAll('#provas .quiz-card');assert.equal(cards.length,l.realQuestions.length);for(const [i,q]of l.realQuestions.entries()){assert(q.source&&q.gabaritoSource,'real question must identify exam and answer-key sources');const card=cards[i];assert.equal(card.querySelector('.feedback').textContent,'');card.querySelectorAll('.option')[q.answer].click();assert.equal(card.querySelector('.feedback').textContent,'','Do not reveal key on selection');card.querySelector('[data-reveal]').click();assert(card.querySelector('.feedback').textContent.includes('Você acertou'));realCount++}}
w.location.hash=lessons[0].id;await tick();w.document.querySelector('.skip').click();await tick();assert.equal(w.location.hash,'#'+lessons[0].id,'Skip link must preserve lesson');
w.location.hash='%E0%A4%A';await tick();assert(w.document.querySelector('.subject-card'),'Malformed route must recover');
const saved=w.localStorage.getItem('trilha-alepa-v1');const invalid=JSON.parse(saved);invalid.version=1;invalid.notes[lessons[0].id]='x'.repeat(50001);
await w.document.querySelector('#import').onchange({target:{files:[{size:100000,text:async()=>JSON.stringify(invalid)}]}});assert.equal(w.localStorage.getItem('trilha-alepa-v1'),saved,'Invalid import must preserve progress');
const valid=JSON.parse(saved);valid.version=1;valid.notes[lessons[0].id]='Anotação importada';await w.document.querySelector('#import').onchange({target:{files:[{size:100000,text:async()=>JSON.stringify(valid)}]}});assert.equal(JSON.parse(w.localStorage.getItem('trilha-alepa-v1')).notes[lessons[0].id],'Anotação importada');assert.equal(w.document.querySelector('#import-button').tagName,'BUTTON');
assert.equal(Object.keys(w.STUDY_TIPS).length,lessons.length);
assert.equal(w.FLASHCARDS.length,lessons.length*2);
assert.equal(new Set(w.FLASHCARDS.map(c=>c.id)).size,w.FLASHCARDS.length);
for(const l of lessons){assert(w.STUDY_TIPS[l.id]?.trap);assert.equal(w.FLASHCARDS.filter(c=>c.lessonId===l.id).length,2)}
w.location.hash='flashcards/'+lessons[0].id;await tick();
assert.equal(w.document.querySelector('#flash-lesson').value,lessons[0].id);
assert.equal(w.document.querySelector('#flash-subject').value,lessons[0].subject);
assert(w.document.querySelector('#flash-known').disabled,'Rate only after revealing');
const firstCard=w.FLASHCARDS.find(c=>c.lessonId===lessons[0].id);
assert.equal(w.document.querySelector('.flash-content').textContent,firstCard.front);
w.document.querySelector('#flash-flip').click();assert.equal(w.document.querySelector('.flash-content').textContent,firstCard.back);
w.document.querySelector('#flash-known').click();let savedTools=JSON.parse(w.localStorage.getItem('trilha-alepa-v1'));assert.equal(savedTools.flashcards[firstCard.id].status,'known');assert.equal(savedTools.flashcards[firstCard.id].interval,3);assert(savedTools.flashcards[firstCard.id].due>Date.now());
w.document.querySelector('#flash-flip').click();w.document.querySelector('#flash-review').click();assert(w.document.querySelector('#flash-restart'));
w.document.querySelector('#flash-mode').value='due';w.document.querySelector('#flash-mode').dispatchEvent(new w.Event('change'));assert(!w.document.querySelector('#flash-flip'),'Future cards excluded from due filter');
w.document.querySelector('#flash-mode').value='review';w.document.querySelector('#flash-mode').dispatchEvent(new w.Event('change'));assert(w.document.querySelector('#flash-flip'));
w.location.hash='simulados';await tick();assert.equal(w.document.querySelectorAll('.exam-card').length,w.EXAMS.length);
for(const exam of w.EXAMS){assert.equal(exam.key.length,exam.questionCount);assert(exam.key.every(k=>k===null||'ABCDE'.includes(k)));assert(exam.source&&exam.answerSource);w.location.hash='simulados/'+exam.id;await tick();assert.equal(w.document.querySelectorAll('.exam-row').length,exam.questionCount);assert(!w.document.querySelector('.exam-result a'),'Key must remain hidden');
 const radios=w.document.querySelectorAll('[data-exam-number="0"]');radios[0].click();w.document.querySelector('[data-clear="0"]').click();assert.equal(Object.keys(JSON.parse(w.localStorage.getItem('trilha-alepa-v1')).examSessions[exam.id].answers).length,0);
 for(const [i,k]of exam.key.entries())if(k)w.document.querySelector(`[data-exam-number="${i}"][value="${k}"]`).click();
 assert(!w.document.querySelector('.exam-correct'),'No correction before finishing');w.document.querySelector('#exam-finish').click();assert.equal(w.document.querySelectorAll('.exam-correct').length,exam.key.filter(Boolean).length);assert.equal(w.document.querySelectorAll('.exam-cancelled').length,exam.annulled.length);assert(w.document.querySelector('.exam-result a'));assert.equal(w.document.querySelectorAll('[data-exam-number]:not(:disabled)').length,0);
 w.location.hash='simulados';await tick();w.location.hash='simulados/'+exam.id;await tick();assert(w.document.querySelector('#exam-reset'),'Finished attempt survives navigation');
}
const backup={version:1,...JSON.parse(w.localStorage.getItem('trilha-alepa-v1'))};w.location.hash='inicio';await tick();await w.document.querySelector('#import').onchange({target:{files:[{size:100000,text:async()=>JSON.stringify(backup)}]}});savedTools=JSON.parse(w.localStorage.getItem('trilha-alepa-v1'));assert.deepEqual(savedTools.flashcards,backup.flashcards);assert.deepEqual(savedTools.examSessions,backup.examSessions);
w.location.hash='simulados/'+w.EXAMS[0].id;await tick();w.document.querySelector('#exam-reset').click();assert.equal(w.document.querySelectorAll('[data-exam-number]:checked').length,0);assert(!w.document.querySelector('.exam-result a'));
for(const script of w.document.querySelectorAll('script[src]'))assert(fs.existsSync(script.getAttribute('src')),'Missing production script '+script.getAttribute('src'));
assert.equal(errors.length,0,errors.join('\n'));
console.log(JSON.stringify({lessons:lessons.length,questions,realCount,words,subjects:5,flashcards:w.FLASHCARDS.length,examPapers:w.EXAMS.length,examQuestions:w.EXAMS.reduce((n,e)=>n+e.key.length,0),interactiveChecks:'lesson quizzes, notes, completion, navigation, import/export state, flashcard filters/reveal/rating, exam answer sheet/correction/annulments/reset passed',visualQA:'not performed — no connected browser'},null,2));
dom.window.close();
