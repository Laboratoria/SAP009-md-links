import { mdLinks, extrairInformacoes } from '../src/md-links';

describe('extrairInformacoes', () => {
  it('deve extrair link de um arquivo', () => {
    const href = 'https://pt.wikipedia.org/wiki/Markdown';
    const text = 'Markdown';
    const string = `[${text}](${href})`;
    const file = 'texto.md';

    const info = extrairInformacoes(string, file);

    expect(info).toEqual({ href, text, file });
  });
});
