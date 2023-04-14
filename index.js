const fs = require('fs');

function mdLinks(pathFile){

  return new Promise((resolve, reject) => {
    const fileExists = fs.existsSync(pathFile); //funções do fs p/ verificar infos sobre arquivos.
    const fileSize = fs.statSync(pathFile).size;

    if(fileExists === false || fileSize === 0){
      reject(chalk.red('\u2717') + ' ' + `O arquivo: ${chalk.red(pathFile)} está vazio ou não existe.`);
    }
    else{
      fs.readFile(pathFile, 'utf8', (err, data) => {
        if (err) throw err;
        const defaultRegex = /\[\w+.\w+\]\(\w+.+\)/gmi; 
        const searchLinks = data.match(defaultRegex);

        const linksArray = searchLinks.map(link => {
          const removeItens = link.replace(')','').replace('[','');
          const split = removeItens.split('](');
          const newObj = {
            href: split[1],
            text: split[0],
            file: pathFile,
          }
          return newObj;
        });
        resolve(linksArray);
      });
    }
  });
}
  
module.exports = mdLinks;

