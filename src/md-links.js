import { readFile, lstatSync, readdirSync, } from 'node:fs';
import { extname, join } from 'node:path';

export const isDirectory = (path) => lstatSync(path).isDirectory();
export const isFile = (path) => lstatSync(path).isFile();

export const extrairInformacoes = (string, arquivo) => {
  const informacoes = string.split('](');
  const texto = informacoes[0].replace('[', '');
  const link = informacoes[1].replace(')', '');
  return {
    href: link,
    text: texto,
    file: arquivo,
  };
};

export const mdLinks = (caminhoDoArquivo, options) => {
  if (!caminhoDoArquivo) throw new Error('Paramêtro inválido')
  // verifica se o caminho do arquivo é um diretório
  if (isDirectory(caminhoDoArquivo)) {
    const arquivos = readdirSync(caminhoDoArquivo);
    const arquivosMd = arquivos.filter((arquivo) => extname(arquivo) === '.md');
    const promises = arquivosMd.map((arquivo) => {
      const caminhoCompleto = join(caminhoDoArquivo, arquivo);
      return mdLinks(caminhoCompleto, options);
    });
    return Promise.all(promises).then((resultados) => [].concat(...resultados));
  }
  // verifica se o caminho é um arquivo
  if (isFile(caminhoDoArquivo)) {
    /* endsWith => método de string que verifica se uma string termina com um determinado sufixo */
    if (!caminhoDoArquivo.endsWith('.md')) {
      console.error('O caminho especificado não se refere ao um arquivo Markdown')
    }
  }
  return new Promise((resolve, reject) => {
    const encode = 'utf-8';
    const regex = /\[[^\]]+\]\(([^)]+)\)/gm;
    readFile(caminhoDoArquivo, encode, (err, data) => {
      if (err) throw reject(err);
      const conteudo = data.match(regex);
      const informacoes = conteudo.map((item) => extrairInformacoes(item, caminhoDoArquivo));
      if (options.validate) {
        Promise.all(informacoes.map((item) => fetch(item.href)
          .then((res) => {
            item.status = res.status;
            if (res.status !== 200) {
              item.message = 'FAIL';
            } else {
              item.message = res.statusText;
            }
            return item;
          })
          .catch((err) => {
            item.status = err;
            item.message = 'Esse link não existe';
            return item;
          })))
          .then(resolve);
      } else {
        resolve(informacoes);
      }
    });
  });
};
