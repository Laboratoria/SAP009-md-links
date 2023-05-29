import mdLinks from './index.js';
import mock from 'mock-fs'


describe('mdLinks', () => {
  beforeEach(() => {
    // Configura o mock para simular o sistema de arquivos
    mock({
      'arquivo.md': `
      [Acesse o GitHub](https://github.com)
      [Sobre o Node.js](https://www.alura.com.br/artigos/node-js)
      [O que significa npm?](https://www.hostgator.com.br/blog/o-que-e-npm/)
      [Acesse o GitHub](https://github.com)
      [Site Inválido](https://httpstat.us/400)
      [Não encontrado](https://httpstat.us/404)
      `,
      'arquivo-vazio.md': '',
      'arquivo.txt': 'This is a text file.',
      'text.md': mock.not.file(),
    });
  });

  afterEach(() => {
     // Restaura o sistema de arquivos
    mock.restore();
  });
  
  test('should reject with an error when given a non-Markdown file', () => {
    const expectedErrorMessage = 'O arquivo "arquivo.txt" não é um arquivo em formato Markdown!';

    return expect(mdLinks('arquivo.txt')).rejects.toThrow(expectedErrorMessage);
  });

  test('should reject with an error when given an empty file', () => {
    const expectedErrorMessage = 'O arquivo "arquivo-vazio.md" está vazio';

    return expect(mdLinks('arquivo-vazio.md')).rejects.toThrow(expectedErrorMessage);
  });

  test('should reject with an error when given a non-existent file', () => {
    const expectedErrorMessage = 'O arquivo "text.md" não existe';

    return expect(mdLinks('text.md')).rejects.toThrow(expectedErrorMessage);
  });
  
  test('should return an array of links when given a valid markdown file', () => {
    const expected = [
      {
        href: 'https://github.com',
        text: 'Acesse o GitHub',
        file: '.arquivos/arquivo.md',
      },
      {
        href: 'https://www.alura.com.br/artigos/node-js',
        text: 'Sobre o Node.js',
        file: '.arquivos/arquivo.md',
      },
    ];
 
  return mdLinks('arquivo.md', { validate: false }).then((result) => {
    expect(result).toEqual(expected);
  });
 });
});
