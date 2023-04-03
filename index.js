// module.exports = () => {
//   // ...
// };
// biblioteca nativa do node.js
import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro){
  console.log(erro)
  //throw lança/joga os erros p/ fora da função
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

//async/await

async function pegarArquivo(caminhoDoArquivo) {
 try {
  const enconding = 'utf-8';
  const texto = await fs.promises.readFile(caminhoDoArquivo, enconding);
  console.log(chalk.green(texto));
 } catch(erro){
  trataErro(erro)
 }
  };

// promises com then
  // function pegarArquivo(caminhoDoArquivo){
  // const enconding = 'utf-8';
  // fs.promises.readFile(caminhoDoArquivo, enconding)
  // .then((texto) => console.log(chalk.green(texto)))
  // .catch(trataErro)
  // }

//  function pegarArquivo(caminhoDoArquivo){
//   const enconding = 'utf-8';
//   //chamando fs. serão exbidos alguns métodos da biblioteca
//   fs.readFile(caminhoDoArquivo, enconding, (erro, texto) => {
//     if(erro){
//       trataErro(erro);
//     }
//     console.log(chalk.green(texto));
//   })
//  }
 pegarArquivo('./readme.md')