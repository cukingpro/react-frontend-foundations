import type { Course } from '../types';
import { CourseCard } from './CourseCard';
export function CourseList({
  courses,
  selectedCourseId,
  onSelect,
}: {
  courses: Course[];
  selectedCourseId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="course-grid">
      {courses.map((course, index) => (
        <CourseCard
          key={course.id}
          course={course}
          index={index}
          selected={course.id === selectedCourseId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
