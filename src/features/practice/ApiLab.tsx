import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { StatePanel } from '../../components/ui/StatePanel';
import { describeState } from '../../types/api';
import type { ApiState } from '../../types/api';
import { getErrorMessage } from '../../utils/errors';
import { courseResponse, postResponse, userResponse } from './data';
import { getPosts } from './services';
import type { Post } from './types';

export function ApiLab() {
  const [state, setState] = useState<ApiState<Post[]>>({ status: 'idle' });
  const requestRef = useRef<AbortController | null>(null);
  useEffect(() => () => requestRef.current?.abort(), []);
  async function load() {
    requestRef.current?.abort();
    const request = new AbortController();
    requestRef.current = request;
    setState({ status: 'loading' });
    try {
      const data = await getPosts(request.signal);
      if (!request.signal.aborted) setState({ status: 'success', data });
    } catch (error: unknown) {
      if (!request.signal.aborted)
        setState({ status: 'error', message: getErrorMessage(error) });
    } finally {
      if (requestRef.current === request) requestRef.current = null;
    }
  }
  return (
    <article className="panel">
      <p className="eyebrow">04 + 06 / ASYNC & GENERICS</p>
      <h3>API & TypeScript an toàn</h3>
      <p>
        Fetch bài viết từ public API JSONPlaceholder. Dữ liệu JSON được kiểm tra
        từ <code>unknown</code> trước khi hiển thị.
      </p>
      <Button onClick={() => void load()} disabled={state.status === 'loading'}>
        {state.status === 'error'
          ? 'Thử tải lại bài viết'
          : 'Tải bài viết từ public API'}
      </Button>
      <p role="status">{describeState(state)}</p>
      {state.status === 'error' && (
        <StatePanel error title="Không tải được bài viết">
          <p>{state.message}</p>
        </StatePanel>
      )}
      {state.status === 'success' &&
        (state.data.length ? (
          <ul>
            {state.data.map((post) => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có bài viết.</p>
        ))}
      <h4>ApiResponse&lt;T&gt;</h4>
      <dl className="type-samples">
        <dt>User</dt>
        <dd>{userResponse.data.name}</dd>
        <dt>Post</dt>
        <dd>{postResponse.data.title}</dd>
        <dt>Course[]</dt>
        <dd>{courseResponse.total} khóa học mẫu</dd>
      </dl>
      <h4>Safe error message</h4>
      <p>Error: {getErrorMessage(new Error('Lỗi kết nối mẫu'))}</p>
      <p>Giá trị không phải Error: {getErrorMessage(null)}</p>
    </article>
  );
}
