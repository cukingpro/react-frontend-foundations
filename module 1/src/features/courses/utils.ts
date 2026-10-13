import { isRecord } from '../../utils/errors';
import { levels, statuses } from './types';
import type {
  Course,
  CourseFormData,
  FormErrors,
  Level,
  CourseStatus,
} from './types';

export function isLevel(value: unknown): value is Level {
  return levels.some((level) => level === value);
}
export function isStatus(value: unknown): value is CourseStatus {
  return statuses.some((status) => status === value);
}
export function isCourse(value: unknown): value is Course {
  return (
    isRecord(value) &&
    'id' in value &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.instructor === 'string' &&
    typeof value.description === 'string' &&
    isLevel(value.level) &&
    isStatus(value.status) &&
    typeof value.learners === 'number' &&
    Number.isSafeInteger(value.learners) &&
    value.learners >= 0
  );
}
export function isCourseList(value: unknown): value is Course[] {
  return (
    Array.isArray(value) &&
    value.every(isCourse) &&
    new Set(value.map((course) => course.id)).size === value.length
  );
}
export function filterCourses(
  courses: Course[],
  search: string,
  level: string,
  status: string,
): Course[] {
  const query = search.trim().toLocaleLowerCase('vi');
  return courses.filter(
    (course) =>
      `${course.name} ${course.instructor}`
        .toLocaleLowerCase('vi')
        .includes(query) &&
      (level === 'all' || course.level === level) &&
      (status === 'all' || course.status === status),
  );
}
export function validateCourse(data: CourseFormData): FormErrors {
  const errors: FormErrors = {};
  if (data.name.trim().length < 3 || data.name.trim().length > 100)
    errors.name = 'Tên khóa học cần từ 3 đến 100 ký tự.';
  if (data.instructor.trim().length < 2 || data.instructor.trim().length > 80)
    errors.instructor = 'Tên giảng viên cần từ 2 đến 80 ký tự.';
  if (
    data.description.trim().length < 10 ||
    data.description.trim().length > 600
  )
    errors.description = 'Mô tả cần từ 10 đến 600 ký tự.';
  if (
    !/^\d+$/.test(data.learners) ||
    !Number.isSafeInteger(Number(data.learners))
  )
    errors.learners = 'Số học viên phải là số nguyên không âm hợp lệ.';
  if (!isLevel(data.level)) errors.level = 'Vui lòng chọn trình độ hợp lệ.';
  if (!isStatus(data.status))
    errors.status = 'Vui lòng chọn trạng thái hợp lệ.';
  return errors;
}
