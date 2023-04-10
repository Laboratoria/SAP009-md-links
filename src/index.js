
import fs from 'fs';
import chalk from 'chalk';



function trataErro(erro) {
  console.log(erro)
  throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));

}

function extrairLinksDoArquivo(caminhoDoArquivo) {
  const enconding = 'utf-8';
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  return fs.promises.readFile(caminhoDoArquivo, enconding)
    .then(texto => {
      const capturas = [...texto.matchAll(regex)];
      const resultados = capturas.map(captura => ({[captura[1]]: [captura[2]]}));
      return resultados.length !== 0 ? resultados : 'Não há links no arquivo';
    })
    .catch(erro => trataErro(erro));
}


 export default extrairLinksDoArquivo; 
