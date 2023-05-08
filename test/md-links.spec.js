/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

// import fs from 'fs';
// import chalk from 'chalk';
import { extraiLinks, tratarErro } from '../src/mdLinks';
import { imprimeLista } from '../src/cli.js';

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

describe('tratarErro', () => {
  it('deve ser uma função', () => {
    expect(typeof tratarErro).toBe('function');
  });
  it('deve apresentar erro com a mensagem correta', () => {
    expect(() => {
      tratarErro({ code: 'ENOENT' });
    }).toThrow('ENOENT');
  });
});

describe('imprimeLista', () => {
  it('deveria ser uma função', () => {
    expect(typeof imprimeLista).toBe('function');
  });
});
