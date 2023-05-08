#!/usr/bin/env node
import { mdLinks } from './md-links.js';
import chalk from 'chalk';
import process from 'process';
import fetch from 'node-fetch';

const caminhoDoArquivo = process.argv[2];

const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats')
};

if (options.validate && options.stats) {
  mdLinks(caminhoDoArquivo, options)
    .then((result) => {
      const links = result.map((item) => item.link);
      const broken = result.filter((item) => item.status !== 200);
      console.log(`Total: ${chalk.green(result.length)} \nUnique: ${chalk.green(links.length)} \nBroken: ${chalk.red(broken.length)}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }else if(options.validate){
    mdLinks(caminhoDoArquivo, options)
      .then((result) =>{
          result.map((item) => {
            if(item.status !== 200){
              console.log(`${chalk.blue(item.arquivo)} ${chalk.cyanBright(item.link)} ${chalk.red(item.texto)} ${chalk.red(item.status)} ${chalk.yellowBright(item.message)}`)
            }else{
              console.log(`${chalk.blue(item.arquivo)} ${chalk.cyanBright(item.link)} ${chalk.green(item.texto)} ${chalk.greenBright(item.status)} ${chalk.yellowBright(item.message)}`)
            }
          });
      }).catch((err)=>{
          console.log(err);
      })
  }else if (options.stats) {
    mdLinks(caminhoDoArquivo, options)
      .then((informacoes) => {
        const links = informacoes.map((item) => item.link);
        console.log(`Total: ${chalk.green(informacoes.length)} \nUnique: ${chalk.green(links.length)}`);
      }).catch((err) => {
        console.log(err);
      });
  }else{
    mdLinks(caminhoDoArquivo, options)
      .then((informacoes) => {
        informacoes.map((item) => {
          console.log(`${chalk.blue(item.arquivo)} ${chalk.cyanBright(item.link)} ${chalk.yellow(item.texto)}`)
        });
      }).catch((err) => {
        console.log(err);
      });
  }
   