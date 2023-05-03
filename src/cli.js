#!/usr/bin/env node
// cli -> manipulação das infos vindas da linha de comando do terminal
// de acordo com as funções criadas no index para entregar o resultado
import chalk from 'chalk';
import fs from 'fs';
import extraiLinks from './index.js';
import listaValidada from './http-validacao.js';

// varivável que guarda as chegadas do terminal
// proccess.argv captura as infos da linha de comando
const caminho = process.argv;

// função p/ refatorar os console.logs com retorno desse resultado
async function imprimeLista(valida, resultado = '') {
  if (valida) {
    const linha = await listaValidada(resultado);
    linha.forEach((link) => {
      console.log(
        `${link.file} | ${link.href} | ${link.text} | ${link.status}`,
      );
    });
  } else {
    resultado.forEach((link) => {
      console.log(
        `${link.file} | ${link.href} | ${link.text}`,
      );
    });
  }
  if (process.argv.includes('--stats')) {
    const linksUnicos = new Set(resultado.map((link) => link.href));
    console.log(chalk.bgBlueBright(`total de links: ${resultado.length}`));
    console.log(chalk.bgBlue(`links únicos: ${linksUnicos.size}`));
  }
}

// envia a lista de links para a tela do terminal
// função assíncrona pq depende de outra função assíncrona pra entregar o resultado
function processaTexto(argumentos) {
  // pegando o index 2 pois os dois primeiros itens são somente
  // o local onde ele encontrou infos e o terceiro é o objeto em si
  const caminhoArgumento = argumentos[2];
  // guardando o 4o elemento do array, que será o comando p/ executar o que o usuário quer
  const valida = argumentos[3] === '--validate';

  // testa se o caminho está correto
  try {
    fs.lstatSync(caminhoArgumento);
  // se cair no erro, aparece o erro ENOENT no terminal, então o if é p/
  //  alterar ele p/ um aviso compreensível p/ o usuário
  } catch (erro) {
    if (erro.code === 'ENOENT') {
      console.log(chalk.red('arquivo ou diretório não existe'));
      return;
    }
  }

  // isFile retorna true se for o caminho de arquivo e false se não for
  if (fs.lstatSync(caminhoArgumento).isFile()) {
    extraiLinks(argumentos[2])
    // resultado chamará a pegaArquivo passando <caminho> na posição 2 do array
      .then((resultado) => {
        imprimeLista(valida, resultado);
      })
      .catch((erro) => {
        console.error('Erro ao processar o arquivo', erro);
      });
    // caso não seja um caminho de arquivo, verifica se é um caminho de um diretório
  } else if (fs.lstatSync(caminho).isDirectory()) {
    fs.promises.readdir(caminho)
    // caso seja um diretório, ele retorna os arquivos dentro desse diretório
      .then((arquivos) => {
        arquivos.forEach((nomeDeArquivo) => {
          extraiLinks(`${caminho}/${nomeDeArquivo}`)
            .then((lista) => {
              imprimeLista(valida, lista, nomeDeArquivo);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
processaTexto(caminho);

// o then usa uma função de callback dentro originária da função na qual
// ele tá inserido p então executar sua ação
