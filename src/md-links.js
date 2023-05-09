import fs from 'fs';
import { imprimeLista } from './output.js';
import { trataErro, arquivoInexistente, arquivoNaoProcessado } from './errors.js';
import { listaValidada } from './validate-stats.js';

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
    .catch((erro) => trataErro(erro));
}

function processaTexto(argumentos) {
  const { caminho } = argumentos;
  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      arquivoInexistente();
      return;
    }
  } if (fs.lstatSync(caminho).isFile()) {
    extraiLinks(argumentos.caminho)
      .then((resultado) => {
        if (argumentos.validate || argumentos.stats) {
          return listaValidada(resultado);
        }
        return resultado;
      })
      .then((resultado) => {
        imprimeLista(argumentos, resultado);
      })
      .catch((erro) => arquivoNaoProcessado(erro));
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
  extraiLinks,
  processaTexto,
};
