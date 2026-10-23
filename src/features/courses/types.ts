export const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;
export const statuses = ['Draft', 'Open', 'Closed'] as const;
export type CourseLevel = (typeof levels)[number];
export type CourseStatus = (typeof statuses)[number];
export interface Course {
  id: string;
  title: string;
  instructor: string;
  level: CourseLevel;
  studentCount: number;
  status: CourseStatus;
  description: string;
}
export interface CourseFormData {
  title: string;
  instructor: string;
  level: CourseLevel;
  studentCount: string;
  status: CourseStatus;
  description: string;
}
export type FormErrors = Partial<Record<keyof CourseFormData, string>>;
export type DataMode = 'local' | 'fetch' | 'error' | 'empty';
