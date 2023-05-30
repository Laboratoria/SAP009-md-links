import mdLinks from '../src/index';
import fs from 'fs';

jest.mock('fs');

describe('mdLinks', () => {
  it('deve rejeitar se o arquivo não é um arquivo Markdown', () => {
    fs.existsSync.mockReturnValue(true);
    const pathFile = 'arquivos/arquivo.txt';
    return expect(mdLinks(pathFile)).rejects.toThrow('O arquivo arquivos/arquivo.txt" não é um arquivo em formato Markdown!');
  });
  it('deve rejeitar se o arquivo não existe',() => {
    fs.existsSync.mockReturnValue

  })
  });
