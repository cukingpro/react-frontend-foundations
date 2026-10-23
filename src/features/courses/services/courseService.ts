import { API_BASE_URL } from '../../../constants/config';
import { fetchJson } from '../../../services/http';
import { initialCourses } from '../data';
import type { Course, DataMode } from '../types';
import { isCourseList } from '../utils';

export async function getCourses(
  mode: DataMode,
  signal: AbortSignal,
): Promise<Course[]> {
  await new Promise<void>((resolve) => setTimeout(resolve, 450));
  signal.throwIfAborted();
  if (mode === 'error')
    throw new Error(
      'Không thể kết nối với nguồn khóa học. Hãy thử lại với dữ liệu mẫu.',
    );
  if (mode === 'empty') return [];
  if (mode === 'fetch')
    return fetchJson(`${API_BASE_URL}/courses.json`, isCourseList, signal);
  return initialCourses.map((course) => ({ ...course }));
}
