import fs from 'fs';

function tratarErro(erro) {
  throw new Error(erro.code, 'arquivo não encontrado');
  }
  
  function lerArquivo(caminhoDoArquivo) {
  const codificacao = 'utf-8';
  fs.promises.readFile(caminhoDoArquivo, codificacao)
  .then((texto) => console.log(texto))
  .catch(tratarErro)
  }

  lerArquivo('./src/texto.md');

//este arquivo deve exportar a função mdLinks.