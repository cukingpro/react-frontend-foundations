import type { Course } from './types';

export const initialCourses: Course[] = [
  {
    id: 'html',
    title: 'Semantic HTML & Accessibility',
    instructor: 'Linh Nguyễn',
    level: 'Beginner',
    studentCount: 128,
    status: 'Open',
    description:
      'Xây dựng cấu trúc web có ý nghĩa, form dễ sử dụng và trải nghiệm bàn phím thân thiện.',
  },
  {
    id: 'css',
    title: 'Responsive CSS Essentials',
    instructor: 'Minh Trần',
    level: 'Beginner',
    studentCount: 96,
    status: 'Open',
    description:
      'Làm chủ cascade, box model, Flexbox và Grid với tư duy thiết kế mobile-first.',
  },
  {
    id: 'js',
    title: 'Modern JavaScript',
    instructor: 'An Phạm',
    level: 'Intermediate',
    studentCount: 84,
    status: 'Open',
    description:
      'Biến dữ liệu thành trải nghiệm tương tác với array methods, ES Modules và async/await.',
  },
  {
    id: 'ts',
    title: 'TypeScript, Confidently',
    instructor: 'Linh Nguyễn',
    level: 'Intermediate',
    studentCount: 62,
    status: 'Open',
    description:
      'Viết code an toàn với interfaces, generics, discriminated unions và runtime type guards.',
  },
  {
    id: 'react',
    title: 'Your First React Application',
    instructor: 'Huy Nguyễn',
    level: 'Beginner',
    studentCount: 0,
    status: 'Draft',
    description:
      'Khởi tạo React cùng Vite, tách component và xây dựng dashboard đầu tiên của bạn.',
  },
  {
    id: 'architecture',
    title: 'Frontend Architecture',
    instructor: 'Minh Trần',
    level: 'Advanced',
    studentCount: 45,
    status: 'Closed',
    description:
      'Tổ chức features, services, hooks và shared UI để codebase dễ mở rộng và review.',
  },
];
