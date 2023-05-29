import fs from 'fs';
import chalk from 'chalk';
import validate from './validate.js';

function mdLinks(pathFile, options) {
  const fileExists = fs.existsSync(pathFile);
  return new Promise((resolve, reject) => {
    if (!pathFile.endsWith('.md')) {
      reject(new Error(chalk.red(`❌ O arquivo "${pathFile}" não é um arquivo em formato Markdown! ❌`)));
  } 
  fs.stat(pathFile, (error, stats) => {
    if (error) {
      reject(new Error(chalk.red(`❌ O arquivo "${pathFile}" não existe ❌`)));
    } else if (stats.size === 0) {
      reject(new Error(chalk.red(`❌ O arquivo "${pathFile}" está vazio❌`)));
    }
    else {
      fs.readFile(pathFile, 'utf-8', (err, data) => {
        if (err) {
          reject(new Error(chalk.red(`❌ Erro ao ler o arquivo "${pathFile}"❌`)));
        }
          const regex = /\[(.+?)\]\((https?:\/\/[^\s]+)\)/gm;
          const links = data.match(regex);
          if (links === null) {
             reject(new Error(chalk.red(`❌ O arquivo "${pathFile}" não contém links! ❌`)));
          } else {
             const linksFormatados = links.map(match => {
             const removerStr = match.replace(/^./,'').replace(/.$/,'');
             const linksDivididos = removerStr.split('](');
             const href = linksDivididos[1];
             const text = linksDivididos[0];
             const file = pathFile;
             const linkObj = { href, text, file };
             return linkObj;
            });
            if(options.validate === false) {
             resolve(linksFormatados);
            } else {
             validate(linksFormatados)
             .then(response => {
              resolve(response);
             })
            } 
          }
      });
    }
  });

  })
}

export default mdLinks;
