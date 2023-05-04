import fs from 'fs';
import chalk from 'chalk';

function tratarErro(erro) {
  throw new Error(chalk.red(erro.code));
}

export default function extrairLinks(caminhoArquivo) {
  const encoding = 'utf-8';
  /* para pegar links dentro e fora [] () / gm: global e multilinhas */
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  return fs.promises.readFile(caminhoArquivo, encoding)
    .then((texto) => {
      // matchAll método de string / ...expande o obj iteravel
      const capturas = [...texto.matchAll(regex)];
      const resultado = capturas.map((captura) => ({
        href: captura[2],
        text: captura[1],
        file: caminhoArquivo,

      }));
      return resultado;
    })
    .catch(tratarErro);
}

// função para tratar erro

// //função para encontrar e ler o arquivo .md
// function pegaArquivo(caminhoArquivo) {
//   const encoding ='utf-8'; //fs ->biblioteca / readFile parametro(caminho, encoding, callback)
//   return fs.promises.readFile(caminhoArquivo, encoding) /*é assincrona já que não há como saber o tamanho do arquivo, o que pode causar travamento, por isso o uso da promises, then e catch*/
//     .then((texto) => (extrairLinks(texto)))
//     .catch (tratarErro)
// }
// export default pegaArquivo;

// // function pegaArquivo(caminhoArquivo) {
// //   const encoding ='utf-8'; //fs ->biblioteca / readFile parametro(caminho, encoding, callback)
// //   fs.readFile(caminhoArquivo, encoding, (erro, texto) => {
// //     if (erro){
// //       tratarErro(chalk.red(erro.code, "Arquivo não encontrado"));
// //     }
// //     console.log(chalk.blue(texto))
// //   })
// // }
// // pegaArquivo('./arquivo/');
