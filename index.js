const fs = require('fs');
const chalk = require('chalk');

function mdLinks(pathFile){

  return new Promise((resolve, reject) => {
    
    const mdExtension = pathFile.match(/\.[0-9a-z]+$/i)[0];

    if(fs.existsSync(pathFile) === false || fs.statSync(pathFile).size === 0){
      reject(chalk.red('\u2717') + ' ' + chalk.grey(`O arquivo: ${chalk.red(pathFile)} não existe ou é vazio.`));
    }
    if(mdExtension !== '.md'){
      reject(chalk.red('\u2717') + ' ' + chalk.grey(`O arquivo: ${chalk.red(pathFile)} não possui extensão .md!`));
    }
    else{
      fs.readFile(pathFile, 'utf8', (err, data) => {
        const defaultRegex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; 
        const searchLinks = data.match(defaultRegex);
        
        if(searchLinks !== null){
          const linksArray = searchLinks.map(link => {
            const removeItens = link.replace(/.$/,'').replace(/^./,'');
            const splitItens = removeItens.split('](');

            const newObject = {
              href: splitItens[1],
              text: splitItens[0],
              file: pathFile,
            }
            return newObject;
          });
          resolve(linksArray);
        } else {
          console.log(chalk.red("\u2717") + ' ' + chalk.red('Não há links no arquivo!'));
        }
      });
    }
  });
}
module.exports = mdLinks;
