import { readFile } from 'node:fs';

const exibirAquivo = (caminhoDoArquivo) => {
    const encode = 'utf-8';
    const regex = /\[[^\]]+\]\(([^)]+)\)/gm
    readFile(caminhoDoArquivo, encode, (err, data) => {
        if (err) throw err;
        console.log(data.match(regex));
    });
};

exibirAquivo('./texto.md');