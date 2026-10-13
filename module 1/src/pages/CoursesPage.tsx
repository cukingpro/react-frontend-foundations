import { useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { StatePanel } from '../components/ui/StatePanel';
import { CourseForm } from '../features/courses/components/CourseForm';
import { CourseList } from '../features/courses/components/CourseList';
import { useCourses } from '../features/courses/hooks/useCourses';
import { levels, statuses } from '../features/courses/types';
import { filterCourses } from '../features/courses/utils';

export function CoursesPage() {
  const { state, mode, load, addCourse } = useCourses();
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [status, setStatus] = useState('all');
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState('');
  const addButton = useRef<HTMLDivElement>(null);
  const courses = state.status === 'success' ? state.data : [];
  const filtered = filterCourses(courses, search, level, status);
  function clearFilters() {
    setSearch('');
    setLevel('all');
    setStatus('all');
  }
  function closeForm() {
    setAdding(false);
    addButton.current?.querySelector('button')?.focus();
  }
  return (
    <section id="courses" aria-labelledby="courses-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">BUILD. TEACH. INSPIRE.</p>
          <h1 id="courses-title">
            Khóa học của bạn<span className="title-dot">.</span>
          </h1>
          <p className="muted">
            Nơi những ý tưởng trở thành hành trình học tập.
          </p>
        </div>
        <div ref={addButton}>
          <Button
            disabled={state.status !== 'success'}
            aria-expanded={adding}
            onClick={() => {
              setAdding((value) => !value);
              setNotice('');
            }}
          >
            ＋ Thêm khóa học
          </Button>
        </div>
      </div>
      <div className="stats-grid" aria-label="Tổng quan khóa học">
        <article className="stat">
          <span>Tổng khóa học</span>
          <strong>{courses.length.toString().padStart(2, '0')}</strong>
          <small>Trong thư viện của bạn</small>
        </article>
        <article className="stat">
          <span>Đang xuất bản</span>
          <strong>
            {courses
              .filter((course) => course.status === 'Published')
              .length.toString()
              .padStart(2, '0')}
          </strong>
          <small>
            <span className="green-dot">●</span> Sẵn sàng để khám phá
          </small>
        </article>
        <article className="stat">
          <span>Tổng lượt học viên</span>
          <strong>
            {courses
              .reduce((sum, course) => sum + course.learners, 0)
              .toLocaleString('vi')}
          </strong>
          <small>Cùng nhau phát triển mỗi ngày</small>
        </article>
      </div>
      <p role="status" className="notice">
        {notice}
      </p>
      {adding && state.status === 'success' && (
        <CourseForm
          onCancel={closeForm}
          onAdd={(data) => {
            addCourse(data);
            clearFilters();
            closeForm();
            setNotice(`Đã thêm khóa học “${data.name.trim()}”.`);
          }}
        />
      )}
      <div className="section-heading">
        <h2>
          Thư viện khóa học <span className="count">{courses.length}</span>
        </h2>
        <span className="muted">Kiến thức tốt, khởi đầu tốt.</span>
      </div>
      <div className="filters">
        <label className="search-field" htmlFor="course-search">
          Tìm kiếm
          <input
            id="course-search"
            type="search"
            placeholder="Tên khóa học hoặc giảng viên…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div>
          <label htmlFor="level-filter">Trình độ</label>
          <select
            id="level-filter"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="all">Tất cả trình độ</option>
            {levels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status-filter">Trạng thái</label>
          <select
            id="status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            {statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div aria-busy={state.status === 'loading'}>
        {(state.status === 'idle' || state.status === 'loading') && (
          <StatePanel title="Đang tải khóa học…">
            <p>Đang chuẩn bị thư viện của bạn.</p>
          </StatePanel>
        )}
        {state.status === 'error' && (
          <StatePanel error title="Chưa thể tải khóa học">
            <p>{state.message}</p>
            <Button onClick={() => void load('local')}>
              Thử lại với dữ liệu mẫu
            </Button>
          </StatePanel>
        )}
        {state.status === 'success' && (
          <>
            <p className="result-count" role="status">
              Hiển thị {filtered.length} / {courses.length} khóa học
            </p>
            {filtered.length ? (
              <CourseList courses={filtered} />
            ) : (
              <StatePanel
                title={
                  courses.length
                    ? 'Không tìm thấy khóa học'
                    : 'Thư viện chưa có khóa học'
                }
              >
                <p>
                  {courses.length
                    ? 'Thử từ khóa khác hoặc xóa bộ lọc.'
                    : 'Thêm khóa học đầu tiên để bắt đầu.'}
                </p>
                {courses.length > 0 && (
                  <Button variant="secondary" onClick={clearFilters}>
                    Xóa bộ lọc
                  </Button>
                )}
              </StatePanel>
            )}
          </>
        )}
      </div>
      <details className="demo-tools">
        <summary>Phòng kiểm thử dữ liệu · loading / error / empty</summary>
        <p>
          Chọn nguồn để quan sát trạng thái. Mỗi lần tải thay thế dữ liệu trong
          phiên, bao gồm khóa học vừa thêm.
        </p>
        <div className="row wrap">
          {(
            [
              ['local', 'Dữ liệu mẫu'],
              ['fetch', 'Fetch JSON'],
              ['error', 'Giả lập lỗi'],
              ['empty', 'Danh sách rỗng'],
            ] as const
          ).map(([value, label]) => (
            <Button
              key={value}
              variant="secondary"
              aria-pressed={mode === value}
              onClick={() => {
                setAdding(false);
                setNotice('');
                void load(value);
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      </details>
    </section>
  );
}
