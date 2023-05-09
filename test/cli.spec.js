/* eslint-disable no-undef */
import { imprimeLista } from '../src/cli';

const spyLog = jest.spyOn(global.console, 'log').mockImplementation();

describe('imprimeLista', () => {
  it('deveria ser uma função', () => {
    expect(typeof imprimeLista).toBe('function');
  });
});

describe('imprimeLista', () => {
  it('deve exibir a lista de resultados quando não tiver argumentos stats ou validate', () => {
    const argumentos = {
      stats: false,
      validate: false,
    };
    const arquivos = [{}, {}, {}];
    imprimeLista(argumentos, arquivos);
    expect(spyLog).toHaveBeenCalledTimes(arquivos.length);
  });

  it('deve exibir as estatísticas totais e únicas quando o argumento stats é verdadeiro', () => {
    const argumentos = {
      stats: true,
      validate: false,
    };
    const arquivos = [{
      file: 'arquivo1.md', href: 'http://url1.com', text: 'link1', status: 'OK',
    }, {
      file: 'arquivo2.md', href: 'http://url2.com', text: 'link2', status: 'FAIL',
    }, {
      file: 'arquivo3.md', href: 'http://url3.com', text: 'link3', status: 'OK',
    }];
    imprimeLista(argumentos, arquivos);
    expect(spyLog).toHaveBeenCalledTimes(1);
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining(`total: ${arquivos.length}`));
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining('unique: 3'));
  });

  it('deve imprimir a lista de resultados validados quando o argumento validate for verdadeiro', () => {
    const argumentos = {
      stats: false,
      validate: true,
    };
    const arquivos = [
      {
        file: 'file1', href: 'https://www.example.com', text: 'example', status: 200,
      },
      {
        file: 'file2', href: 'https://www.google.com', text: 'google', status: 404,
      },
    ];
    imprimeLista(argumentos, arquivos);
    expect(spyLog).toHaveBeenCalledTimes(arquivos.length);
    expect(spyLog).toHaveBeenCalledWith('file1 | \u001b[33mhttps://www.example.com\u001b[39m | example | 200');
    expect(spyLog).toHaveBeenCalledWith('file2 | \u001b[33mhttps://www.google.com\u001b[39m | google | 404');
  });
});
