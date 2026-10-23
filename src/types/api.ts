export type ApiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export interface ApiResponse<T> {
  data: T;
  total: number;
}

export function describeState<T>(state: ApiState<T>): string {
  switch (state.status) {
    case 'idle':
      return 'Chưa gửi yêu cầu';
    case 'loading':
      return 'Đang tải dữ liệu…';
    case 'success':
      return 'Tải dữ liệu thành công';
    case 'error':
      return state.message;
  }
}
