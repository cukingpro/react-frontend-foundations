import { useRef, useState } from 'react';
import { Button } from '../components/ui/Button';
import { StatePanel } from '../components/ui/StatePanel';
import { CourseForm } from '../features/courses/components/CourseForm';
import { CourseList } from '../features/courses/components/CourseList';
import { CourseDetails } from '../features/courses/components/CourseDetails';
import { CourseFilters } from '../features/courses/components/CourseFilters';
import { useCourses } from '../features/courses/hooks/useCourses';
import { filterCourses } from '../features/courses/utils';

export function CourseDashboardPage() {
  const { state, mode, load, addCourse, updateCourseStatus } = useCourses();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('all');
  const [status, setStatus] = useState('all');
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState('');
  const addButton = useRef<HTMLDivElement>(null);
  const courses = state.status === 'success' ? state.data : [];
  const filtered = filterCourses(courses, search, level, status);
  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId,
  );
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
          <span>Đang mở</span>
          <strong>
            {courses
              .filter((course) => course.status === 'Open')
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
              .reduce((sum, course) => sum + course.studentCount, 0)
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
            setNotice(`Đã thêm khóa học “${data.title.trim()}”.`);
          }}
        />
      )}
      <div className="section-heading">
        <h2>
          Thư viện khóa học <span className="count">{courses.length}</span>
        </h2>
        <span className="muted">Kiến thức tốt, khởi đầu tốt.</span>
      </div>
      <CourseFilters
        search={search}
        level={level}
        status={status}
        onSearchChange={setSearch}
        onLevelChange={setLevel}
        onStatusChange={setStatus}
        onReset={clearFilters}
      />
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
              <CourseList
                courses={filtered}
                selectedCourseId={selectedCourseId}
                onSelect={setSelectedCourseId}
              />
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
      {state.status === 'success' && (
        <CourseDetails
          course={selectedCourse}
          onDeselect={() => setSelectedCourseId(null)}
          onStatusChange={(id, nextStatus) => {
            updateCourseStatus(id, nextStatus);
            setNotice(`Đã cập nhật trạng thái thành ${nextStatus}.`);
          }}
        />
      )}
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
                setSelectedCourseId(null);
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
