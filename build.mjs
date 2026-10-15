import fs from 'node:fs';
const files=['index.html','styles.css','app.js','content-gerais.js','content-legislacao.js','content-informatica.js','content-especificos.js','content-reais-basicos.js','edital.pdf'];
for(const optional of ['content-regimento.js','content-pessoal.js','content-normas.js','content-reais.js','content-reais-ti.js','retificacao-002.pdf'])if(fs.existsSync(optional))files.push(optional);
fs.mkdirSync('dist',{recursive:true});for(const file of files)fs.copyFileSync(file,'dist/'+file);
console.log('Site estático preparado em dist/: '+files.length+' arquivos.');
