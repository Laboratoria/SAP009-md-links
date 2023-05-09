/* eslint-disable prefer-template */
/* eslint-disable no-undef */
// import chalk from 'chalk';
import { extraiLinks } from '../src/md-links';
import { imprimeLista } from '../src/output';
import { trataErro } from '../src/errors';

describe('extraiLinks', () => {
  it('deve ser uma função', () => {
    expect(typeof extraiLinks).toBe('function');
  });

  it('Deve extrair corretamente os links', () => {
    const caminhoDoArquivo = 'test/arquivo-teste.md';
    const resultadoEsperado = [
      {
        href: 'https://www.google.com',
        text: 'Google',
        file: caminhoDoArquivo,
      },
      {
        href: 'https://www.canva.com',
        text: 'Canva',
        file: caminhoDoArquivo,
      },
    ];

    return extraiLinks(caminhoDoArquivo).then((resultado) => {
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
});

describe('trataErro', () => {
  it('deve ser uma função', () => {
    expect(typeof trataErro).toBe('function');
  });

  it('deve lançar um erro com a mensagem correta', () => {
    expect(() => {
      trataErro({ code: 'ENOENT' });
    }).toThrow('ENOENT não há arquivo no diretório');
  });
});

describe('imprimeLista', () => {
  it('deve ser uma função', () => {
    expect(typeof imprimeLista).toBe('function');
  });
});
