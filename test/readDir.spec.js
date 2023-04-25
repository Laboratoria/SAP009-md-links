const { read, readFile, readDirectory } = require("../readDir.js");
const fs = require('fs');
jest.mock('fs', () => ({
    promises: {
      readdir: jest.fn(),
      readFile: jest.fn(),
      stat: jest.fn(),
    }
}));

const mockContent = 'qualquerstring';
const mockBuffer = {
  toString: jest.fn(() => mockContent),
}
fs.promises.readFile.mockResolvedValue(mockBuffer);

const mockFiles = ['arquivo.md', 'arquivo.txt', 'arquivo2.md'];
fs.promises.readdir.mockResolvedValue(mockFiles);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('readFile', () => {
    it('deve chamar a função de ler arquivo', () => {
      const pathFile = './arquivoteste.md';
      // readFiles(pathFile);
      const resultado = {
        file: pathFile,
        data: mockContent,
      };
      return readFile(pathFile).then((result) => {
        expect(result).toEqual(resultado);
        expect(fs.promises.readFile).toHaveBeenCalledTimes(1);
        expect(fs.promises.readFile).toHaveBeenCalledWith(pathFile);
        expect(mockBuffer.toString).toHaveBeenCalledTimes(1);
    })
    });
  });
  
describe('readDirectory', () => {
  it('deve ler um diretório', () => {
    const path = './diretorioteste';
    // readFiles(pathFile);
    const resultado = [
      {
        file: expect.stringContaining('arquivo.md'),
        data: mockContent,
      },
      {
        file: expect.stringContaining('arquivo2.md'), 
        data: mockContent,
      }
    ];

    return readDirectory(path).then((result) => {
      expect(result).toEqual(resultado);
      expect(fs.promises.readdir).toHaveBeenCalledTimes(1);
      expect(fs.promises.readdir).toHaveBeenCalledWith(path);
      expect(fs.promises.readFile).toHaveBeenCalledTimes(2);
      expect(fs.promises.readFile).toHaveBeenCalledWith(resultado[0].file);
      expect(fs.promises.readFile).toHaveBeenCalledWith(resultado[1].file);
    })
  });
});

describe('read', () => {
  it('deve ler um diretorio caso o caminho seja de uma pasta', () => {
    const mockStat = {
      isDirectory: jest.fn(() => true),
    }
    fs.promises.stat.mockResolvedValueOnce(mockStat);
    const path = './diretorioteste';

    return read(path)
    .then((result) => {
      expect(fs.promises.stat).toHaveBeenCalledTimes(1);
      expect(fs.promises.stat).toHaveBeenCalledWith(path);
      expect(mockStat.isDirectory).toHaveBeenCalledTimes(1);
      expect(mockStat.isDirectory).toHaveBeenCalledWith(path);
      expect(result.length).toEqual(2);
    })
  });
  it('deve ler um arquivo caso o caminho seja um arquivo', () => {
    const mockStat = {
      isDirectory: jest.fn(() => false),
    }
    fs.promises.stat.mockResolvedValueOnce(mockStat);
    const path = './arquivoteste.md';

    return read(path)
    .then((result) => {
      expect(fs.promises.stat).toHaveBeenCalledTimes(1);
      expect(fs.promises.stat).toHaveBeenCalledWith(path);
      expect(mockStat.isDirectory).toHaveBeenCalledTimes(1);
      expect(mockStat.isDirectory).toHaveBeenCalledWith(path);
      expect(result.file).toEqual(path);
    })
  });
})