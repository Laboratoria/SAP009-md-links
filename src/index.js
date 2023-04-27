// module.exports = () => {
//   // ...
// };
import fs from 'fs';
import chalk from 'chalk';

function extrairLinks(texto){
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; //para pegar links dentro e fora [] () / gm: global e multilinhas
  const capturas = [...texto.matchAll(regex)]; //matchAll método de string / ...expande o obj iteravel
  const resultado = capturas.map(captura => ({[captura[1]]: [captura[2]]})) //indice 1 e 2 representam os grupos do regex, montados anteriormente
  return resultado.length !== 0 ? resultado : "Não há links no arquivo";
}

//função para tratar erro
function tratarErro(erro) {
  throw new Error(chalk.red(erro.code));(erro);
}

//função para encontrar e ler o arquivo .md
function pegaArquivo(caminhoArquivo) {
  const encoding ='utf-8'; //fs ->biblioteca / readFile parametro(caminho, encoding, callback)
  return fs.promises.readFile(caminhoArquivo, encoding) /*é assincrona já que não há como saber o tamanho do arquivo, o que pode causar travamento, por isso o uso da promises, then e catch*/
    .then((texto) => (extrairLinks(texto)))
    .catch (tratarErro)
}
export default pegaArquivo;

// function pegaArquivo(caminhoArquivo) {
//   const encoding ='utf-8'; //fs ->biblioteca / readFile parametro(caminho, encoding, callback)
//   fs.readFile(caminhoArquivo, encoding, (erro, texto) => {
//     if (erro){
//       tratarErro(chalk.red(erro.code, "Arquivo não encontrado"));
//     }
//     console.log(chalk.blue(texto))
//   })
// }
// pegaArquivo('./arquivo/');