import stats from '../src/stats';

describe('stats', () => {
  it('calculates statistics correctly', () => {
    const linksFormatados = [
      { href: 'https://github.com', ok: true },
      { href: 'https://httpstat.us/400', ok: false },
      { href: 'https://www.alura.com.br/artigos/node-js', ok: true },
      { href: 'https://httpstat.us/404', ok: false },
      { href: 'https://github.com', ok: true },
      { href: 'https://www.hostgator.com.br/blog/o-que-e-npm/', ok: true },
    ];

    const expectedStats = {
      total: 6,
      unique: 5,
      broken: 2,
    };

    const resolveMock = jest.fn();
    const promiseMock = jest.fn(() => ({ resolve: resolveMock }));
    const setMock = jest.fn(() => linksFormatados.map((obj) => obj.href));

    global.Set = setMock;
    global.Promise = promiseMock;

    stats(linksFormatados);

    expect(promiseMock).toHaveBeenCalledWith(expect.any(Function));
    expect(setMock).toHaveBeenCalledWith(linksFormatados.map((obj) => obj.href));

    const resolveCallback = promiseMock.mock.calls[0][0];

    resolveCallback(expectedStats);

    expect(resolveMock).toHaveBeenCalledWith(expectedStats);
  });
});
