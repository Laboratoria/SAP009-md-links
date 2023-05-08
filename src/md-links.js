import { info } from 'node:console';
import { readFile } from 'node:fs';

export const extrairInformacoes = (string, arquivo) => {
  if (!string && !arquivo) throw new Error('dados inválidos')
  const informacoes = string.split('](');
  const texto = informacoes[0].replace('[', '');
  const link = informacoes[1].replace(')', '');
  return {
    arquivo,
    link,
    texto
  }
}

export const mdLinks = (caminhoDoArquivo, options) => {
  if (!caminhoDoArquivo) throw new Error('parâmetro inválido')
  return new Promise((resolve, reject) => {
    const encode = 'utf-8';
    const regex = /\[[^\]]+\]\(([^)]+)\)/gm;
    readFile(caminhoDoArquivo, encode, (err, data) => {
      if (err) throw reject(err);
      const conteudo = data.match(regex);
      const informacoes = conteudo.map((item) => extrairInformacoes(item, caminhoDoArquivo));
      if(options.validate){
        Promise.all(informacoes.map((item) =>
          fetch(item.link)
            .then((res) => {
              item.status = res.status;
              if(res.status !== 200){
                item.message = 'FAIL'
              } else {
                item.message = res.statusText;
              }
              return item;
            })
            .catch((err) => {
              item.status = err;
              item.message = 'Esse link não existe';
              return item;
            })
        ))
          .then(resolve)
      }else{
        resolve(informacoes);
      }

    });
  });
};

