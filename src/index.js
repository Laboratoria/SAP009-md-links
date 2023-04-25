import fs from 'fs';


const exibirAquivo = (caminhoDoArquivo) => {
  const encode = 'utf-8';
  const regex = /\[[^\]]+\]\(([^)]+)\)/gm
  fs.readFile(caminhoDoArquivo,encode, (err, data) => {
    if (err) throw err;
        console.log(data.match(regex));
    });
};

exibirAquivo('src/texto.md');
