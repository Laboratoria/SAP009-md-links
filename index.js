import fs from 'fs';
import chalk from 'chalk';


function tratarErro(erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
  }
  
  function lerArquivo(caminhoDoArquivo) {
  const codificacao = 'utf-8';
  fs.promises.readFile(caminhoDoArquivo, codificacao)
  .then((texto) => console.log(chalk.blue(texto)))
  .catch(tratarErro)
  }

  // lerArquivo('./src/texto');
  lerArquivo('./src/texto.md');

//este arquivo deve exportar a função mdLinks.