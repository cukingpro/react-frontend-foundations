import { describe, expect, it } from 'vitest';
import { initialCourses } from './data';
import type { CourseFormData } from './types';
import { filterCourses, isCourseList, validateCourse } from './utils';

const valid: CourseFormData = {
  title: 'React Basics',
  instructor: 'Huy Nguyễn',
  description: 'Khóa học React dành cho người mới.',
  level: 'Beginner',
  status: 'Draft',
  studentCount: '0',
};
describe('course boundaries', () => {
  it('combines instructor/title search with both filters without mutating source', () => {
    const before = structuredClone(initialCourses);
    expect(
      filterCourses(initialCourses, ' LINH ', 'Intermediate', 'Open').map(
        (course) => course.id,
      ),
    ).toEqual(['ts']);
    expect(
      filterCourses(initialCourses, 'responsive', 'all', 'all'),
    ).toHaveLength(1);
    expect(filterCourses(initialCourses, 'missing', 'all', 'all')).toEqual([]);
    expect(initialCourses).toEqual(before);
  });
  it('validates whitespace, bounds, fractional and unsafe learner counts', () => {
    expect(validateCourse(valid)).toEqual({});
    expect(
      validateCourse({
        ...valid,
        title: '   ',
        instructor: ' ',
        description: ' short ',
        studentCount: '-1',
      }),
    ).toHaveProperty('title');
    for (const studentCount of [
      '',
      '1.5',
      '-1',
      'Infinity',
      '9007199254740992',
    ])
      expect(validateCourse({ ...valid, studentCount })).toHaveProperty(
        'studentCount',
      );
    expect(
      validateCourse({ ...valid, description: 'x'.repeat(601) }),
    ).toHaveProperty('description');
  });
  it('rejects untrusted JSON, invalid literals and duplicate ids', () => {
    expect(isCourseList(initialCourses)).toBe(true);
    expect(isCourseList([])).toBe(true);
    expect(isCourseList(null)).toBe(false);
    expect(isCourseList([{ ...initialCourses[0], level: 'Expert' }])).toBe(
      false,
    );
    expect(isCourseList([{ ...initialCourses[0], studentCount: NaN }])).toBe(
      false,
    );
    expect(isCourseList([initialCourses[0], initialCourses[0]])).toBe(false);
  });
});
