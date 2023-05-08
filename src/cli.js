#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import extraiLinks from './index.js';
import { calculaStats, listaValidada } from './http-validacao.js';

const caminho = process.argv;

function imprimeLista(valida, resultado = '') {
  if (caminho.includes('--stats') && caminho.includes('--validate')) {
    listaValidada(resultado).then((links) => {
      const stats = calculaStats(links);
      console.log(
        // eslint-disable-next-line prefer-template
        chalk.bgBlue(` total: ${stats.total} `) + '\n' + chalk.bgBlue(` unique: ${stats.unique} `) + '\n' + chalk.bgBlue(` broken: ${stats.broken} `),
      );
    });
  } else if (caminho.includes('--stats')) {
    listaValidada(resultado).then((link) => {
      const stats = calculaStats(link);
      console.log(
        // eslint-disable-next-line prefer-template
        chalk.bgBlue(` total: ${stats.total} `) + '\n' + chalk.bgBlue(` unique: ${stats.unique} `),
      );
    });
  } else if (valida) {
    listaValidada(resultado).then((linha) => {
      linha.forEach((link) => {
        console.log(
          `${link.file} | ${chalk.yellow(link.href)} | ${link.text} | ${link.status}`,
        );
      });
    });
  } else {
    resultado.forEach((link) => {
      console.log(`${link.file} | ${link.href} | ${link.text}`);
    });
  }
}

function processaTexto(argumentos) {
  const caminhoArgumento = argumentos[2];
  const valida = argumentos[3] === '--validate';
  try {
    fs.lstatSync(caminhoArgumento);
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log(chalk.red('arquivo ou diretório não existe'));
      return;
    }
  } if (fs.lstatSync(caminhoArgumento).isFile()) {
    extraiLinks(argumentos[2])
      .then((resultado) => {
        imprimeLista(valida, resultado);
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
