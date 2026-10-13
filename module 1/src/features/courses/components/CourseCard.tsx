import type { Course } from '../types';

export function CourseCard({
  course,
  index,
}: {
  course: Course;
  index: number;
}) {
  const { name, instructor, level, learners, status, description } = course;
  return (
    <article className="course-card">
      <div className={`course-art art-${index % 4}`} aria-hidden="true">
        <span>{name.split(' ')[0]}</span>
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
        <h3>{name}</h3>
        <p className="course-description">{description}</p>
        <div className="course-meta">
          <span>
            <span className="mini-avatar" aria-hidden="true">
              {instructor[0]}
            </span>
            {instructor}
          </span>
          <span>{learners.toLocaleString('vi')} học viên</span>
        </div>
      </div>
    </article>
  );
}
