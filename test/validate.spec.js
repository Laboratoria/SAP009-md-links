import validate from './validate';
import fetchMock from 'fetch-mock';

// Crie um mock para a função fetch
const mockFetch = (response) => {
    fetchMock.mock('*', response);
  };
  
// Limpe o mock após cada teste
afterEach(() => {
  fetchMock.restore();
});

//teste para links válidos
test('Validates formated links', () => {
    const linksFormatados = [
        { href: 'https://github.com' },
        { href: 'https://www.alura.com.br/artigos/node-js' },
        { href: 'https://www.hostgator.com.br/blog/o-que-e-npm/' },
    ];

    mockFetch({ status: 200, ok: true});

    return validate(linksFormatados).then((result) => {
        expect(result).toEqual([
            { href: 'https://github.com', status: 200, ok: true },
            { href: 'https://www.alura.com.br/artigos/node-js', status: 200, ok: true  },
            { href: 'https://www.hostgator.com.br/blog/o-que-e-npm/', status: 200, ok: true  },
        ]);
    });
});

//teste para links inválidos
test('Handles error for invalid links', () =>{
    const linksFormatados = [
        { href: 'https://httpstat.us/400' },
        { href: 'https://httpstat.us/404' },
    ];

    //mock a resposta de erro das requisições
    mockFetch(Promise.reject(new Error('Request failed')));

    return validate(linksFormatados).then((result) => {
        expect(result).toEqual([
            { href: 'https://httpstat.us/400', status: 'Error: Request failed', ok: false },
            { href: 'https://httpstat.us/404', status: 'Error: Request failed', ok: false  },
        ]);
    });
});



