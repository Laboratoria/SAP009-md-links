//a biblioteca File system é nativa do node.js, não precisa npm install
import fs from 'fs';
import chalk from 'chalk';

// faz a leitura específica do trecho que queremos a partir do regex
function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  // [...] "expande" o objeto iterável e comporta todos os itens capturados
  // matchAll-> método de strings que retorna todos os resultados correspondentes
  const capturas = [...texto.matchAll(regex)];
  // map percorre o array de capturas e retorna um array com os resultados
  // pegando as capturas índice 1 e 2 que são os dois regex montados acima
  const resultados = capturas.map(captura => ({[captura[1]]: [captura[2]]}))
  console.log(resultados);
}

function trataErro(erro) {
  console.log(erro)
  throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

// faz a leitura de todo o conteúdo do arquivo especificado ao chamar a função
function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';
  fs.promises
    .readFile(caminhoDoArquivo, encoding)
    // função assíncrona pq a leitura de um file grande pode demorar
    // e a aplicação deve seguir rodando até chegar o resultado
    .then((texto) => extraiLinks(texto))
    .catch(trataErro)
}

pegaArquivo('./arquivo/texto.md')

// REGEX
// pegando tudo que esá dentro de colchetes
// \[([ˆ[\]]*?)\]

// pegando tudo que esá dentro dos parenteses, que são os links
// \((https?:\/\/[ˆ\s?#.].[ˆ\s]*)\)