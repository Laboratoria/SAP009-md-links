const fs = require('fs');
const chalk = require('chalk');
const fetch = require('node-fetch');

function mdlinks(pathFile){

  const fileExists = fs.existsSync(pathFile); //funções do fs p/ verificar infos sobre arquivos.
  const fileSize = fs.statSync(pathFile).size;
  if(fileExists === false || fileSize === 0){
    console.log(chalk.red('\u2717') + ' ' + `O arquivo ${chalk.red(pathFile)} está vazio ou não existe.`);
    return; // encerra a execução após imprimir, senão, da erro no foreach
  }
  fs.readFile(pathFile, 'utf8', (err, data) => {
    
    if (err) throw err;
    const defaultRegex = /\[\w+.\w+\]\(\w+.+\)/gmi; 
    const searchLinks = data.match(defaultRegex);
    searchLinks.forEach(link => {
      const removeItens = link.replace(')','').replace('[','');
      const split = removeItens.split('](');
      const newObj = {
        href: split[1],
        text: split[0],
        file: pathFile,
      }
      httpFetch(newObj.href);
      console.log(chalk.red('\u2764') + ' ' + chalk.magenta(newObj.file) + ' ' + chalk.gray(newObj.href) + ' ' + chalk.magenta(newObj.text));
    });
  });
}

module.exports = mdlinks;

function httpFetch(urlPath){
  if (urlPath === false) {
    return;
  } 
  fetch(urlPath)
    .then(answer => {
      // console.log(urlPath);
      console.log(answer.status);
      console.log(answer.ok);
    })
    .catch(err => console.error(err));
}

