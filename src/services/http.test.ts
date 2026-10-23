import { afterEach, expect, it, vi } from 'vitest';
import { fetchJson } from './http';

afterEach(() => vi.unstubAllGlobals());
const isStrings = (data: unknown): data is string[] =>
  Array.isArray(data) &&
  data.every((item: unknown) => typeof item === 'string');
it('checks HTTP failures before parsing JSON', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response('down', { status: 503 })),
  );
  await expect(fetchJson('/test', isStrings)).rejects.toThrow('HTTP 503');
});
it('rejects malformed JSON and invalid runtime shape', async () => {
  vi.stubGlobal(
    'fetch',
    vi
      .fn()
      .mockResolvedValueOnce(new Response('{'))
      .mockResolvedValueOnce(Response.json([1])),
  );
  await expect(fetchJson('/test', isStrings)).rejects.toThrow();
  await expect(fetchJson('/test', isStrings)).rejects.toThrow('định dạng');
});
it('returns valid data and forwards the abort signal', async () => {
  const fetchMock = vi.fn().mockResolvedValue(Response.json(['safe']));
  vi.stubGlobal('fetch', fetchMock);
  const controller = new AbortController();
  await expect(
    fetchJson('/test', isStrings, controller.signal),
  ).resolves.toEqual(['safe']);
  expect(fetchMock).toHaveBeenCalledWith('/test', {
    signal: controller.signal,
  });
});
