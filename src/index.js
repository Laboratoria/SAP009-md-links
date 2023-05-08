import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

function extraiLinks(caminhoDoArquivo) {
  const encoding = 'utf-8';
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  return fs.promises
    .readFile(caminhoDoArquivo, encoding)
    .then((texto) => {
      const capturas = [...texto.matchAll(regex)];
      const resultados = capturas.map((captura) => ({
        href: captura[2],
        text: captura[1],
        file: caminhoDoArquivo,
      }));
      return resultados.length !== 0 ? resultados : 'não há links no arquivo';
    })
    .catch(trataErro);
}

export {
  extraiLinks,
  trataErro,
};
