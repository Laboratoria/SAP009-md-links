import stats from '../src/stats.js';

describe('stats', () => {
  it('should return the correct statistics', async () => {
    const linksFormatados = [
      { href: 'https://example.com', ok: true },
      { href: 'https://example.com', ok: true },
      { href: 'https://example.com', ok: false },
      { href: 'https://example.com', ok: true },
      { href: 'https://another-example.com', ok: false },
    ];

    const result = await stats(linksFormatados);

    expect(result.total).toBe(5);
    expect(result.unique).toBe(2);
    expect(result.broken).toBe(2);
  });
});