/* eslint-disable no-undef */
import chalk from 'chalk';
import {
  trataErro,
  arquivoNaoExiste,
  erroArquivo,
  manejaErros,
} from '../src/erros';

describe('trataErro', () => {
  it('deve lançar um erro com a mensagem correta', () => {
    const erro = { code: 'ENOENT' };
    expect(() => trataErro(erro)).toThrowError(new Error(`${chalk.red(erro.code, 'não há arquivo no diretório')}`));
  });
});

describe('arquivoNaoExiste', () => {
  it('deve imprimir a mensagem de erro para um erro ENOENT', () => {
    const erro = { code: 'ENOENT' };
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    arquivoNaoExiste(erro);
    expect(consoleSpy).toHaveBeenCalledWith(chalk.redBright.bold('arquivo ou diretório não existe'));
  });
});

describe('erroArquivo', () => {
  it('deve chamar console.error com a mensagem de erro', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const erro = new Error('mensagem de erro');
    erroArquivo(erro);

    expect(consoleSpy).toHaveBeenCalledWith(chalk.red.bold('Erro ao processar o arquivo', erro));

    consoleSpy.mockRestore();
  });
});

describe('manejaErros()', () => {
  test('deve retornar a mensagem de erro correta para ENOTFOUND', () => {
    const erro = {
      cause: {
        code: 'ENOTFOUND',
      },
    };
    const resultado = manejaErros(erro);
    expect(resultado).toBe(chalk.ansi256(196).bold.italic('\u2717 link não encontrado \u2717'));
  });
});
