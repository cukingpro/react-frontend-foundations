import { Button } from '../../../components/ui/Button';
import { StatePanel } from '../../../components/ui/StatePanel';
import { statuses } from '../types';
import type { Course, CourseStatus } from '../types';
import { isStatus } from '../utils';

interface CourseDetailsProps {
  course: Course | undefined;
  onStatusChange: (id: string, status: CourseStatus) => void;
  onDeselect: () => void;
}

export function CourseDetails({
  course,
  onStatusChange,
  onDeselect,
}: CourseDetailsProps) {
  return (
    <section
      id="course-details"
      aria-labelledby="course-details-title"
      className="course-details"
    >
      <h2 id="course-details-title">Chi tiết khóa học</h2>
      {course ? (
        <div className="panel">
          <div className="row spread">
            <h3>{course.title}</h3>
            <Button variant="secondary" onClick={onDeselect}>
              Bỏ chọn
            </Button>
          </div>
          <dl className="course-facts">
            <div>
              <dt>Mã khóa học</dt>
              <dd>{course.id}</dd>
            </div>
            <div>
              <dt>Giảng viên</dt>
              <dd>{course.instructor}</dd>
            </div>
            <div>
              <dt>Trình độ</dt>
              <dd>{course.level}</dd>
            </div>
            <div>
              <dt>Trạng thái</dt>
              <dd>{course.status}</dd>
            </div>
            <div>
              <dt>Số học viên</dt>
              <dd>{course.studentCount.toLocaleString('vi')}</dd>
            </div>
            <div>
              <dt>Mô tả</dt>
              <dd>{course.description}</dd>
            </div>
          </dl>
          <label htmlFor="detail-status">Cập nhật trạng thái</label>
          <select
            id="detail-status"
            value={course.status}
            onChange={(event) => {
              if (isStatus(event.target.value))
                onStatusChange(course.id, event.target.value);
            }}
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      ) : (
        <StatePanel title="Chưa chọn khóa học">
          <p>
            Chọn “Xem chi tiết” trong thư viện để xem thông tin và cập nhật
            trạng thái.
          </p>
        </StatePanel>
      )}
    </section>
  );
}
