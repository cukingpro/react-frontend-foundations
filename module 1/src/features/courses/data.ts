import type { Course } from './types';

export const initialCourses: Course[] = [
  {
    id: 'html',
    name: 'Semantic HTML & Accessibility',
    instructor: 'Linh Nguyễn',
    level: 'Beginner',
    learners: 128,
    status: 'Published',
    description:
      'Xây dựng cấu trúc web có ý nghĩa, form dễ sử dụng và trải nghiệm bàn phím thân thiện.',
  },
  {
    id: 'css',
    name: 'Responsive CSS Essentials',
    instructor: 'Minh Trần',
    level: 'Beginner',
    learners: 96,
    status: 'Published',
    description:
      'Làm chủ cascade, box model, Flexbox và Grid với tư duy thiết kế mobile-first.',
  },
  {
    id: 'js',
    name: 'Modern JavaScript',
    instructor: 'An Phạm',
    level: 'Intermediate',
    learners: 84,
    status: 'Published',
    description:
      'Biến dữ liệu thành trải nghiệm tương tác với array methods, ES Modules và async/await.',
  },
  {
    id: 'ts',
    name: 'TypeScript, Confidently',
    instructor: 'Linh Nguyễn',
    level: 'Intermediate',
    learners: 62,
    status: 'Published',
    description:
      'Viết code an toàn với interfaces, generics, discriminated unions và runtime type guards.',
  },
  {
    id: 'react',
    name: 'Your First React Application',
    instructor: 'Huy Nguyễn',
    level: 'Beginner',
    learners: 0,
    status: 'Draft',
    description:
      'Khởi tạo React cùng Vite, tách component và xây dựng dashboard đầu tiên của bạn.',
  },
  {
    id: 'architecture',
    name: 'Frontend Architecture',
    instructor: 'Minh Trần',
    level: 'Advanced',
    learners: 45,
    status: 'Archived',
    description:
      'Tổ chức features, services, hooks và shared UI để codebase dễ mở rộng và review.',
  },
];
