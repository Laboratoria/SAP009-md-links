
import fs from 'fs';
import chalk from 'chalk';

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map(captura => ({[captura[1]]: [captura[2]]}));
  return resultados.length !== 0 ? resultados : 'Não há links no arquivo';
}


function trataErro(erro) {
  console.log(erro)
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));

}

// async function pegarArquivo(caminhoDoArquivo) {
//   try {
//     const enconding = 'utf-8'; // qual enconding de caracteres sendo usado no arquivo
//     const texto = await fs.promises.readFile(caminhoDoArquivo, enconding);
//     return (extraiLinks(texto))
//   } catch (erro) {
//     trataErro(erro)
//   }
// };

function pegarArquivo(caminhoDoArquivo) {
  const enconding = 'utf-8'; 
  return fs.promises
    .readFile(caminhoDoArquivo, enconding)
    .then(texto => extraiLinks(texto))
    .catch(erro => trataErro(erro));
};

 export default pegarArquivo; 
