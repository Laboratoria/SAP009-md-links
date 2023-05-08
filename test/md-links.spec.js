import { extrairInformacoes, mdLinks } from  "../src/md-links";
import { readFile } from 'node:fs';

jest.mock('node:fs')
//teste extrairArquivos
describe('extrairInformacoes', () => {
  it('deve extrair informações de link de uma string', () => {
    const link = "https://pt.wikipedia.org/wiki/Markdown";
    const texto = "Markdown";
    const string = `[Markdown](https://pt.wikipedia.org/wiki/Markdown)`;
    const arquivo = "texto.md"
    const infos = extrairInformacoes(string, arquivo);

    expect(infos).toEqual({ arquivo, link, texto});

  });
  it('deve retornar um erro quando não receber a string como parâmetro', () => {
    expect(() => extrairInformacoes()).toThrow('dados inválidos')
  })

});
//teste Md-Links
describe('funcao md-links', () => {
  it('deve resolver e retornar um array de objeto', () => {
    const encode = 'utf-8';
    const caminhoDoArquivo = 'texto.md';
    mdLinks(caminhoDoArquivo);

    expect(readFile).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledWith(caminhoDoArquivo, encode, expect.any(Function));
  });
  it('deve retornar um erro quando não receber parâmetro', () => {
    expect(() => mdLinks()).toThrow()
  })
});

// test('deve ser um erro', () => {
//     mdLinks("./src/texto.md")
//     .catch(err => {
//       expect(err).toEqual("ENOENT: no such file or directory, open './src/texto.md'");
//     })
//   })
