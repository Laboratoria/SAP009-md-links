import { mdLinks, extrairInformacoes } from '../src/md-links';

describe('extrairInformacoes', () => {
  it('deve extrair link de um arquivo', () => {
    const href = 'https://pt.wikipedia.org/wiki/Markdown';
    const text = 'Markdown';
    const string = `[${text}](${href})`;
    const file = 'texto.md';

    const info = extrairInformacoes(string, file);

    expect(info).toEqual({ href, text, file });
  });
});

// teste Md-Links
describe('funcao md-links', () => {
  it('deve resolver e retornar um array de objeto', () => {
    const encode = 'utf-8';
    const caminhoDoArquivo = 'texto.md';
    mdLinks(caminhoDoArquivo);

    expect(readFile).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledWith(caminhoDoArquivo, encode, (err, data));
  });
  it('deve retornar um erro quando não receber parâmetro', () => {
    expect(() => mdLinks()).toThrow();
  });
  it('deve retornar um array de objetos com as propriedades corretas quando validate === true', () => {
    const expectedLinks = [
      {
        texto: 'Exemplo',
        link: 'https://www.exemplo.com',
        arquivo: 'texto.md',
        status: 200,
        message: 'OK',
      },
    ];

    mdLinks('texto.md', { validate: true })
      .then((result) => {
        expect(result).toEqual(expect.arrayContaining(expectedLinks));
      });
  });
  it('deve ser um erro', () => {
    mdLinks('./src/texto.md')
      .catch((err) => {
        expect(err).toEqual("ENOENT: no such file or directory, open './src/texto.md'");
      });
  });
});