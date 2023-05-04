#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import extraiLinks from './index.js';
import { listaValidada, statusBroken } from './http-validacao.js';

const caminho = process.argv;

async function imprimeLista(valida, resultado = '') {
  if (caminho.includes('--stats') && caminho.includes('--validate')) {
    const linksQuebrados = statusBroken(resultado);
    console.log(`links quebrados: ${linksQuebrados.length}`);
  } else if (caminho.includes('--stats')) {
    const linksUnicos = new Set(resultado.map((link) => link.href));
    console.log(chalk.bgBlueBright(` total de links: ${resultado.length} `));
    console.log(chalk.bgBlue(` links únicos:() ${linksUnicos.size} `));
  } else if (valida) {
    const linha = await listaValidada(resultado);
    linha.forEach((link) => {
      console.log(`${link.file} | ${chalk.yellow(link.href)} | ${link.text} | ${link.status}`);
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
