import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('.');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.pdf':'application/pdf'};
http.createServer((req,res)=>{try{const request=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+(request==='/'?'/index.html':request));if(!file.startsWith(root+path.sep)||!mime[path.extname(file)]||!fs.existsSync(file)){res.writeHead(404);return res.end('Arquivo não encontrado')}res.writeHead(200,{'Content-Type':mime[path.extname(file)],'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});fs.createReadStream(file).pipe(res)}catch{res.writeHead(400);res.end('Solicitação inválida')}}).listen(4173,'0.0.0.0',()=>console.log('Trilha ALEPA: http://localhost:4173'));
