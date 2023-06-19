import validate from '../src/validate.js';

describe('validate', () => {
  it('deve validar os links corretamente', async () => {
    const linksFormatados = [
    {
      href: 'https://google.com', 
      text: 'Link', 
      file: 'arquivos/arquivo.md',
    }
    ];

    const expectedResults = [
    { 
      href: 'https://google.com', 
      text: 'Link', 
      file: 'arquivos/arquivo.md', 
      status: 200, 
      ok: true 
    }
    ];

    const results = await validate(linksFormatados);

    expect(results).toEqual(expectedResults);
  });

  it('deve disparar um erro, caso não seja possivel acessar o link', () => {
    const link = {
          href: 'https://siteinvalido.com',
          text: 'Link',
          file: 'arquivos/arquivo.md',
        }
    const erro = {
          href: 'https://siteinvalido.com',
          text: 'Link',
          file: 'arquivos/arquivo.md',
          status: 'ENOTFOUND',
          ok: false,
    }
    
    return expect(validate([link])).resolves.toEqual([erro]);
  })
});
