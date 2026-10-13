import type { Course } from '../types';
import { CourseCard } from './CourseCard';
export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="course-grid">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  );
}
