#!/usr/bin/env node

import chalk from 'chalk';
import process, { argv } from 'node:process';
import { mdLinks } from './md-links.js';

const caminhoDoArquivo = argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

if (options.validate && options.stats) {
  mdLinks(caminhoDoArquivo, options)
    .then((infos) => {
      const links = infos.map((item) => item.href);
      const broken = infos.filter((item) => item.status !== 200);
      console.log(`total:${chalk.blueBright(infos.length)}`);
      console.log(`unique:${chalk.greenBright(links.length)}`);
      console.log(`broken:${chalk.redBright(broken.length)}`);
    }).catch((err) => {
      console.log(err);
    });
} else if (options.stats) {
  mdLinks(caminhoDoArquivo, options)
    .then((infos) => {
      const links = infos.map((item) => item.href);
      console.log(`total:${chalk.blueBright(infos.length)}`);
      console.log(`unique:${chalk.greenBright(links.length)}`);
    }).catch((err) => {
      console.log(err);
    });
} else if (options.validate) {
  mdLinks(caminhoDoArquivo, options)
    .then((res) => {
      res.map((item) => {
        if (item.status !== 200) {
          console.log(`${chalk.magenta(item.file)} ${chalk.cyan(item.href)} ${chalk.green(item.text)} ${chalk.bgRed(item.message)} ${chalk.bgRedBright(item.status)}`);
        } else {
          console.log(`${chalk.magenta(item.file)} ${chalk.cyan(item.href)} ${chalk.green(item.text)} ${chalk.bgYellow(item.message)} ${chalk.bgYellowBright(item.status)}`);
        }
      });
    }).catch((err) => {
      console.log(err);
    });
} else {
  mdLinks(caminhoDoArquivo, options)
    .then((informacoes) => {
      informacoes.map((item) => {
        console.log(`${chalk.magenta(item.file)} ${chalk.cyanBright(item.href)} ${chalk.green(item.text)}`);
      });
    }).catch((err) => {
      console.log(err);
    });
}
