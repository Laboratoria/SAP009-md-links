const { readFile } = require("../readDir.js");
const fs = require('fs');
jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn()
    }
}))

const mockContent = 'qualquerstring';
const mockBuffer = {
    toString: jest.fn(() => mockContent),
}
fs.promises.readFile.mockResolvedValue(mockBuffer);
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
   