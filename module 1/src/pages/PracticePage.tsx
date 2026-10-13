import { ApiLab } from '../features/practice/ApiLab';
import { StudentLab } from '../features/practice/StudentLab';
import { TodoLab } from '../features/practice/TodoLab';

export function PracticePage() {
  return (
    <section
      id="practice"
      className="page-section"
      aria-labelledby="practice-title"
    >
      <p className="eyebrow">THE FRONTEND PLAYGROUND</p>
      <h2 id="practice-title">Học bằng cách thực hành.</h2>
      <p className="muted">
        Các bài tập JavaScript và TypeScript từ mục 3–6. Thay đổi dữ liệu để
        quan sát kết quả.
      </p>
      <div className="practice-grid">
        <div className="stack">
          <TodoLab />
          <ApiLab />
        </div>
        <StudentLab />
      </div>
    </section>
  );
}
