import { fetchJson } from '../../services/http';
import { isRecord } from '../../utils/errors';
import type { Post } from './types';

function isPosts(value: unknown): value is Post[] {
  return (
    Array.isArray(value) &&
    value.every(
      (post: unknown) =>
        isRecord(post) &&
        typeof post.id === 'number' &&
        typeof post.title === 'string' &&
        typeof post.body === 'string',
    )
  );
}
export function getPosts(signal: AbortSignal): Promise<Post[]> {
  return fetchJson(
    'https://jsonplaceholder.typicode.com/posts?_limit=3',
    isPosts,
    signal,
  );
}
