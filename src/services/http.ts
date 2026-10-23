export async function fetchJson<T>(
  url: string,
  guard: (value: unknown) => value is T,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok)
    throw new Error(`Không tải được dữ liệu (HTTP ${response.status}).`);
  const data: unknown = await response.json();
  if (!guard(data)) throw new Error('Dữ liệu phản hồi không đúng định dạng.');
  return data;
}
