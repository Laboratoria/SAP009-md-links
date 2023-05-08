import fs from 'fs';
import chalk from 'chalk';
import { imprimeLista } from './cli.js'; 
import { manejaErro } from './index.js';

// function tratarErro(erro) {
//   throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
// }

function extraiLinks(caminhoArquivo) {
  const encoding = 'utf-8';
  /* para pegar links dentro e fora [] () / gm: global e multilinhas */
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  return fs.promises.readFile(caminhoArquivo, encoding)
    .then((texto) => {
      // matchAll método de string / ...expande o obj iteravel
      const capturas = [...texto.matchAll(regex)];
      const resultado = capturas.map((captura) => ({
        href: captura[2],
        text: captura[1],
        file: caminhoArquivo,

      }));
      return resultado;
    })
    .catch((erro) => manejaErro(erro));
}

function mdLink(argumentos) {
  // eslint-disable-next-line no-shadow
  const { caminho } = argumentos;
  try {
    fs.lstatSync(caminho);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log(chalk.red('Arquivo ou Diretório não existe'));
      return;
    }
  }
  // isFile vai retornar true se for o caminho de um arquivo
  if (fs.lstatSync(caminho).isFile()) {
    extraiLinks(argumentos.caminho)
      .then((resultado) => {
        imprimeLista(argumentos, resultado);
      })
      .catch((e) => {
        console.error('Erro ao processar o arquivo', e);
      });
  } else if (fs.lstatSync(caminho).isDirectory()) {
    fs.promises.readdir(caminho)
    // O then é usado para definir um callback que será executado quando a promessa for resolvida, ou seja, quando a leitura do diretório for concluída com sucesso.
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

export { extraiLinks, mdLink };
