import { readFile } from 'node:fs';

export const extrairInformacoes = (string, arquivo) => {
  const informacoes = string.split('](');
  const texto = informacoes[0].replace('[', '');
  const link = informacoes[1].replace(')', '');
  return {
    arquivo,
    link,
    texto
  }
}

export const mdLinks = (caminhoDoArquivo) => {
  return new Promise((resolve, reject) => {
    const encode = 'utf-8';
    const regex = /\[[^\]]+\]\(([^)]+)\)/gm;
    readFile(caminhoDoArquivo, encode, (err, data) => {
      if (err) throw reject(err);
      const conteudo = data.match(regex);
      const informacoes = conteudo.map((item) => extrairInformacoes(item, caminhoDoArquivo));
      resolve(informacoes);
    });
  })
};

