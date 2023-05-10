/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { extraiLinks } from '../src/mdLinks';
import { trataErro } from '../src/erros';

describe('extraiLinks', () => {
  it('deveria ser uma função', () => {
    expect(typeof extraiLinks).toBe('function');
  });
  it('dever extrair os link', () => {
    const caminhoArquivo = './test/teste.md';
    const resultadoEsperado = [
      {
        href: 'https://github.com',
        text: 'Github',
        file: caminhoArquivo,
      },
    ];

    return extraiLinks(caminhoArquivo).then((resultado) => {
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
});

describe('trataErro', () => {
  it('deveria ser uma função', () => {
    expect(typeof trataErro).toBe('function');
  });
});
