import fs from 'fs';
import chalk from 'chalk';
import { imprimeLista } from './cli.js';

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

function processaTexto(argumentos) {
  const { caminho } = argumentos;
  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log(chalk.red('arquivo ou diretório não existe'));
      return;
    }
  } if (fs.lstatSync(caminho).isFile()) {
    extraiLinks(argumentos.caminho)
      .then((resultado) => {
        imprimeLista(argumentos, resultado);
      })
      .catch((erro) => {
        console.error('Erro ao processar o arquivo', erro);
      });
  } else if (fs.lstatSync(caminho).isDirectory()) {
    fs.promises.readdir(caminho)
      .then((arquivos) => {
        arquivos.forEach((nomeDeArquivo) => {
          extraiLinks(`${caminho}/${nomeDeArquivo}`)
            .then((lista) => {
              imprimeLista(argumentos, lista, nomeDeArquivo);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export {
  trataErro,
  extraiLinks,
  processaTexto,
};
