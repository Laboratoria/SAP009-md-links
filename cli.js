#!/usr/bin/env node
const mdLinks = require('./index.js');
const fetch = require('node-fetch');
const chalk = require('chalk');

const typedPath = process.argv[2];
const optionUser = process.argv[3];

mdLinks(typedPath)
  .then((answer) => {
    if (optionUser === '--validate') {
      answer.forEach((itemObj) => {
        fetch(itemObj.href)
          .then((result) => {
            let output = '';
            let icon = '';
            let link = '';

            if (result.ok === true) {
              output = chalk.black.bold.underline('OK');
              icon = chalk.red('\u2764');
              link = chalk.magenta(itemObj.file)
            } else {
              output = chalk.red('FAIL');
              icon = chalk.red('\u2717');
              link = chalk.gray(itemObj.file);
              
            }
            console.log(icon + ' ' + link + ' ' + chalk.gray.bold(itemObj.href) + ' ' 
            + output + ' ' + chalk.blackBright.bold(result.status) + ' ' + chalk.magenta(itemObj.text));
          })
          .catch((err) => {
            if (err.code === 'ENOTFOUND') {
              console.log(chalk.red("\u2717") + ' ' + chalk.red(err.code) + 
              chalk.gray(`: erro ao encontrar o site (${chalk.red(itemObj.href)})`));
            }
          });
      });
    } else if (optionUser === '--stats') {
        let linksList = [];
        answer.forEach((itemObj) => {
          linksList.push(itemObj.href);
        });
        
        let mySet = new Set(linksList);
        console.log(chalk.red('\u2764') + ' ' + chalk.magenta(' Total: ') + linksList.length)
        console.log(chalk.red('\u2764') + ' ' + chalk.magenta(' Unique: ') + mySet.size);

        if(process.argv[4] === '--validate'){
          answer.forEach((itemObj) => {
          fetch(itemObj.href)
          .then((result) => {
            let counter = 0;
            if (result.ok === false){
              counter = counter + 1;
              console.log(chalk.red('\u2717') + ' ' + chalk.red(' Broken: ') + counter);
            }
          })
          .catch((erro) => {
            console.log(erro);
          });
          });
        }
      } else if (!optionUser) {
        answer.forEach((itemObj) => {
          console.log(chalk.red("\u2764") + ' ' + chalk.magenta(itemObj.file) + ' ' + chalk.gray(itemObj.href)
          + ' ' + chalk.magenta(itemObj.text));
        });

    } else {
        console.log(chalk.red("\u2717") + " " + chalk.red('Não entendi o seu comando :( '));
    }
  })
  .catch((erro) => {
    if (erro.code === 'ENOENT'){
        console.log(chalk.red("\u2717") + ' ' + ' Erro ao encontrar diretório');
        }
  });
