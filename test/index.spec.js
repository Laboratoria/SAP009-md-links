import mdLinks from '../src/index.js';
import fs from 'fs';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  stat: jest.fn(),
  readFile: jest.fn(),
}));

describe('mdLinks', () => {
  it('deve rejeitar se o arquivo não é um arquivo Markdown', () => {
    fs.existsSync.mockReturnValue(true);
    const pathFile = 'arquivos/arquivo.txt';
    return expect(mdLinks(pathFile)).rejects.toThrow('O arquivo "arquivos/arquivo.txt" não é um arquivo em formato Markdown!');
  });

  it('deve rejeitar se o arquivo não existe', () => {
    fs.stat.mockImplementation((path, callback) => {
      const error = new Error ('Arquivo não encontrado');
      error.code = 'ENOENT';
      callback(error, null);
    })
    const pathFile = 'arquivos/text.md';
    return expect(mdLinks(pathFile)).rejects.toThrow('O arquivo "arquivos/text.md" não existe');
  });

  it('deve rejeitar se o arquivo estiver vazio', () => {
    const arquivoVazio = '';
    fs.stat.mockImplementation((path, callback) => {
      const stats = {
        size: arquivoVazio.length,
      };
      callback(null, stats);
    });
    fs.readFile.mockImplementation((path, options, callback) => {
      callback(null, arquivoVazio);
    });
    const pathFile = 'arquivos/arquivo-vazio.md';
    return expect(mdLinks(pathFile)).rejects.toThrow('O arquivo "arquivos/arquivo-vazio.md" está vazio');
  });

  it('Deve rejeitar se houver um erro ao ler o arquivo', () => {
    fs.stat.mockImplementation((path, callback) => {
      const stats = {
        size: 10,
      }
      callback(null, stats);
    });
    fs.readFile.mockImplementation((path, encoding, callback) => {
      const error = new Error('Erro ao ler o arquivo');
      callback(error, null);
    });
    const pathFile = 'arquivos/arquivo.md';
    return expect(mdLinks(pathFile)).rejects.toThrow('Erro ao ler o arquivo "arquivos/arquivo.md"')
  });
   
  it('deve rejeitar com o erro "O arquivo não contém links"', () => {
    fs.existsSync.mockReturnValue(true);
    fs.stat.mockImplementation((path, callback) => {
      callback(null, { size: 100 });
    });
    fs.readFile.mockImplementation((path, encoding, callback) => {
      const arquivoSemLink = 'Este arquivo não contém links.';
      callback(null, arquivoSemLink);
    });
    const pathFile = 'arquivos/arquivo-sem-link.md';
    const options = { validate: true };
    return expect(mdLinks(pathFile, options)).rejects.toThrow(/O arquivo.* não contém links/);
  });
  
  it('deve receber o conteúdo do arquivo e retornar os links formatados', () => {
   fs.existsSync.mockReturnValue(true);
    fs.stat.mockImplementation((path, callback) => {
      callback(null, { size: 100 });
    });
    fs.readFile.mockImplementation((path, encoding, callback) => {
      const mockConteudo = "qualquer string com links md: [Link](https://google.com)"
      callback(null, mockConteudo);
    });
    const pathFile = 'arquivos/arquivo.md';
    const options = { validate: false };
    const resultado = [
      { 
        href: 'https://google.com', 
        text: 'Link', 
        file: 'arquivos/arquivo.md' 
      }
    ]
    return mdLinks(pathFile, options).then(result => {
      expect(result).toEqual(resultado)
    })

  });

  it('deve retornar os links validados', () => {
    fs.existsSync.mockReturnValue(true);
     fs.stat.mockImplementation((path, callback) => {
       callback(null, { size: 100 });
     });
     fs.readFile.mockImplementation((path, encoding, callback) => {
       const mockConteudo = "qualquer string com links md: [Link](https://google.com)"
       callback(null, mockConteudo);
     });
     const pathFile = 'arquivos/arquivo.md';
     const options = { validate: true };
     const resultado = [
       { 
         href: 'https://google.com', 
         text: 'Link', 
         file: 'arquivos/arquivo.md',
         status: 200,
         ok: true,

       }
     ]
     return mdLinks(pathFile, options).then(result => {
       expect(result).toEqual(resultado)
     })
   });
});


