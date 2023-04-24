#!/usr/bin/env node
const mdLinks = require('./index.js');
// const findMdFiles = require('./index.js');
const chalk = require('chalk');

const typedPath = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

// findMdFiles(typedPath, options)

mdLinks(typedPath, options)
  .then((answer) => {
    if (options.stats) {
      let linksList = [];
      let broken = 0;
      answer.forEach((itemObj) => {
        if (itemObj.ok === false) {
          broken++;
        }
        linksList.push(itemObj.href);
      });

      let mySet = new Set(linksList);
      console.log(
        chalk.red('\u2764') + ' ' + chalk.magenta(' Total: ') + linksList.length
      );
      console.log(
        chalk.red('\u2764') + ' ' + chalk.magenta(' Unique: ') + mySet.size
      );

      if (process.argv[4] === '--validate') {
        console.log(
          chalk.red('\u2764') + ' ' + chalk.magenta(' Broken: ') + broken
        );
      }
    } else if (options.validate) {
      answer.forEach((itemObj) => {
        let output = '';
        let icon = '';
        let link = '';

        if (itemObj.ok === true) {
          output = chalk.black.bold.underline('OK');
          icon = chalk.red('\u2764');
          link = chalk.magenta(itemObj.file);
        } else {
          output = chalk.red('FAIL');
          icon = chalk.red('\u2717');
          link = chalk.gray(itemObj.file);
        }
        console.log(
          icon + ' ' + link + ' ' + chalk.gray.bold(itemObj.href) + ' ' + output + ' ' +
            chalk.blackBright.bold(itemObj.status) + ' ' + chalk.magenta(itemObj.text)
        );
      });
    } else if (!options.validate) {
      answer.forEach((itemObj) => {
        console.log(
          chalk.red('\u2764') +' ' + chalk.magenta(itemObj.file) +' ' +chalk.gray(itemObj.href) 
          + ' ' + chalk.magenta(itemObj.text)
        );
      });
    }
  })
  .catch((erro) => {
    if (erro.code === 'ENOENT') {
      console.log(chalk.red('\u2717') + ' ' + ' Erro ao encontrar diretório');
    }
  });