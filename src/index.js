// a biblioteca File system é nativa do node.js, não precisa npm install
import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

// faz a leitura específica do trecho que queremos a partir do regex
export default function extraiLinks(caminhoDoArquivo) {
  const encoding = 'utf-8';
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  return fs.promises
    .readFile(caminhoDoArquivo, encoding)
    // função assíncrona pq a leitura de um file grande pode demorar
    // e a aplicação deve seguir rodando até chegar o resultado
    .then((texto) => {
      // [...] "expande" o objeto iterável e comporta todos os itens capturados
      // matchAll-> método de strings que retorna todos os resultados correspondentes
      const capturas = [...texto.matchAll(regex)];
      // map percorre o array de capturas e retorna um array com os resultados
      // pegando as capturas índice 1 e 2 que são os dois regex montados acima
      const resultados = capturas.map((captura) => ({
        href: captura[2],
        text: captura[1],
        file: caminhoDoArquivo,
      }));
      // identificando se o array de links é vazio para enviar um aviso
      return resultados.length !== 0 ? resultados : 'não há links no arquivo';
    })
    .catch(trataErro);
}

// REGEX
// pegando tudo que esá dentro de colchetes
// \[([ˆ[\]]*?)\]
// pegando tudo que esá dentro dos parenteses, que são os links
// \((https?:\/\/[ˆ\s?#.].[ˆ\s]*)\)
