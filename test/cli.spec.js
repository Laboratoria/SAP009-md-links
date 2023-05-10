/* eslint-disable no-undef */
import chalk from 'chalk';
import { imprimeLista } from '../src/cli';

const spyLog = jest.spyOn(global.console, 'log').mockImplementation();

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
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining(chalk.ansi256(21).bold(`Links: ${arquivos.length}`)));
    expect(spyLog).toHaveBeenCalledWith(expect.stringContaining(chalk.ansi256(93).bold('Unique: 3')));
  });

  it('deve imprimir a lista de resultados validados quando o argumento validate for verdadeiro', () => {
    const argumentos = {
      stats: false,
      validate: true,
    };
    const arquivos = [
      {
        file: 'file1', href: 'https://www.exemplo.com', text: 'exemplo', status: 200,
      },
      {
        file: 'file2', href: 'https://www.google.com', text: 'google', status: 404,
      },
    ];
    imprimeLista(argumentos, arquivos);
    expect(spyLog).toHaveBeenCalledTimes(arquivos.length);
    expect(spyLog).toHaveBeenCalledWith(`${chalk.yellow('file1')} | ${chalk.yellow('https://www.exemplo.com')} | ${chalk.yellow('exemplo')} | ${200}`);
    expect(spyLog).toHaveBeenCalledWith(`${chalk.yellow('file2')} | ${chalk.yellow('https://www.google.com')} | ${chalk.yellow('google')} | ${404}`);
  });
});
