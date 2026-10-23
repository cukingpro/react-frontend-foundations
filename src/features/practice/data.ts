import type { ApiResponse } from '../../types/api';
import { initialCourses } from '../courses/data';
import type { Course } from '../courses/types';
import type { CartItem, Post, Student, User } from './types';

export const students: Student[] = [
  { id: 1, name: 'An Phạm', email: 'an@example.com', score: 92 },
  { id: 2, name: 'Bình Trần', email: 'binh@example.com', score: 76 },
  { id: 3, name: 'Chi Nguyễn', email: 'chi@example.com', score: 85 },
  { id: 4, name: 'Dũng Lê', email: 'dung@example.com' },
];
export const cart: CartItem[] = [
  {
    product: { id: 'book', name: 'Sổ tay JavaScript', price: 120000 },
    quantity: 2,
  },
  {
    product: { id: 'cards', name: 'Thẻ học TypeScript', price: 80000 },
    quantity: 1,
  },
];
// One generic contract, three different domain models. No loss of type information.
export const userResponse: ApiResponse<User> = {
  data: { id: 1, name: 'An Phạm', email: 'an@example.com' },
  total: 1,
};
export const postResponse: ApiResponse<Post> = {
  data: {
    id: 1,
    title: 'Học bằng cách xây dựng',
    body: 'Bắt đầu từ một component nhỏ.',
  },
  total: 1,
};
export const courseResponse: ApiResponse<Course[]> = {
  data: initialCourses,
  total: initialCourses.length,
};
