#!/usr/bin/env node
/* eslint-disable max-len */

import chalk from 'chalk';
import fs from 'fs';
import extrairLinks from './index.js';
import listaValidada from './http-validacao.js';

/* PROCESS.ARGV é um obj proprio do Node que representa valores de argumento e objeto, capturamos as informações passadas pela linha de comando */

const caminho = process.argv;

async function imprimeLista(valida, resultado) {
  if (valida) {
    const linha = await listaValidada(resultado);
    linha.forEach((link) => {
      console.log(chalk.blue(`${link.file} | ${link.href} | ${link.text} | ${link.status}`));
    });
  } else if (caminho.includes('--stats')) {
    const linksUnicos = new Set(resultado.map((link) => link.href));
    console.log(chalk.bgBlueBright.bold(`Total de links: ${resultado.length}`));
    console.log(chalk.bgBlueBright.bold(`Links únicos: ${linksUnicos.size}`));
  } else {
    resultado.forEach((link) => {
      console.log(`${link.file} | ${link.href} | ${link.text}`);
    });
  }
}

// responsavel por mandar nossa lista de links p/ tela do terminal
// const resultao chamará pegaArquivo passando o caminho na posição 2
function processaTexto(argumento) {
  // eslint-disable-next-line no-shadow
  const caminho = argumento[2];
  const valida = argumento[3] === '--validate';

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
    extrairLinks(argumento[2])
      .then((resultado) => {
        imprimeLista(valida, resultado);
      })
      .catch((e) => {
        console.error('Erro ao processar o arquivo', e);
      });
  } else if (fs.lstatSync(caminho).isDirectory()) {
    fs.promises.readdir(caminho)
    // O then é usado para definir um callback que será executado quando a promessa for resolvida, ou seja, quando a leitura do diretório for concluída com sucesso.
      .then((arquivos) => {
        arquivos.forEach((nomeDeArquivo) => {
          extrairLinks(`${caminho}/${nomeDeArquivo}`)
            .then((lista) => {
              imprimeLista(valida, lista, nomeDeArquivo);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
processaTexto(caminho);
