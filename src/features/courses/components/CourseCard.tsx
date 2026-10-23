import type { Course } from '../types';
import { Button } from '../../../components/ui/Button';

export function CourseCard({
  course,
  index,
  selected,
  onSelect,
}: {
  course: Course;
  index: number;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const { title, instructor, level, studentCount, status, description } =
    course;
  return (
    <article
      className={`course-card${selected ? ' course-card--selected' : ''}`}
    >
      <div className={`course-art art-${index % 4}`} aria-hidden="true">
        <span>{title.split(' ')[0]}</span>
        <span className="art-orbit" />
        <span className="art-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="course-body">
        <div className="row spread">
          <span className="level">{level}</span>
          <span className={`badge badge--${status.toLowerCase()}`}>
            {status}
          </span>
        </div>
        <h3>{title}</h3>
        <p className="course-description">{description}</p>
        <div className="course-meta">
          <span>
            <span className="mini-avatar" aria-hidden="true">
              {instructor[0]}
            </span>
            {instructor}
          </span>
          <span>{studentCount.toLocaleString('vi')} học viên</span>
        </div>
        <Button
          variant="secondary"
          aria-pressed={selected}
          aria-controls="course-details"
          onClick={() => onSelect(course.id)}
        >
          {selected ? 'Đang chọn' : 'Xem chi tiết'}
          <span className="sr-only">: {title}</span>
        </Button>
      </div>
    </article>
  );
}
