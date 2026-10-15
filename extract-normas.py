import sys, json, pathlib
sys.path.insert(0,'.tools/python')
from pypdf import PdfReader
records=json.loads(pathlib.Path('normas-fontes.json').read_text(encoding='utf-8'))
good=0
for item in records:
    for record in item.get('candidates',[item]):
        filename=pathlib.Path(f"tmp/normas/integra/{record.get('id')}.pdf")
        if not filename.exists():
            continue
        try:
            reader=PdfReader(filename)
            pages=[page.extract_text() or '' for page in reader.pages]
            text='\n\n'.join(pages)
            if len(text.strip())>100:
                record['texto']=text
                record['paginas']=len(pages)
                good+=1
        except Exception as error:
            print('Falha de extração:',record.get('id'),type(error).__name__)
pathlib.Path('content-normas.js').write_text('window.NORMAS = '+json.dumps(records,ensure_ascii=False)+';\n',encoding='utf-8')
print(json.dumps({'textos_extraidos':good,'referencias':len(records)},ensure_ascii=False))
