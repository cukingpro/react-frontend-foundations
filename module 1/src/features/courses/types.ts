export const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;
export const statuses = ['Draft', 'Published', 'Archived'] as const;
export type Level = (typeof levels)[number];
export type CourseStatus = (typeof statuses)[number];
export interface Course {
  id: string;
  name: string;
  instructor: string;
  level: Level;
  learners: number;
  status: CourseStatus;
  description: string;
}
export interface CourseFormData {
  name: string;
  instructor: string;
  level: Level;
  learners: string;
  status: CourseStatus;
  description: string;
}
export type FormErrors = Partial<Record<keyof CourseFormData, string>>;
export type DataMode = 'local' | 'fetch' | 'error' | 'empty';
