import { useEffect, useRef, useState } from 'react';
import type { ApiState } from '../../../types/api';
import { getErrorMessage } from '../../../utils/errors';
import { getCourses } from '../services/courseService';
import type { Course, CourseFormData, CourseStatus, DataMode } from '../types';

export function useCourses() {
  const [state, setState] = useState<ApiState<Course[]>>({ status: 'loading' });
  const [mode, setMode] = useState<DataMode>('local');
  const controller = useRef<AbortController | null>(null);

  async function requestData(nextMode: DataMode) {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    try {
      const data = await getCourses(nextMode, request.signal);
      if (!request.signal.aborted) setState({ status: 'success', data });
    } catch (error: unknown) {
      if (!request.signal.aborted)
        setState({ status: 'error', message: getErrorMessage(error) });
    } finally {
      if (controller.current === request) controller.current = null;
    }
  }

  function load(nextMode: DataMode) {
    setMode(nextMode);
    setState({ status: 'loading' });
    return requestData(nextMode);
  }

  useEffect(() => {
    const request = new AbortController();
    controller.current = request;
    // Subscribe to the initial request; state updates occur in async callbacks.
    void getCourses('local', request.signal)
      .then((data) => {
        if (!request.signal.aborted) setState({ status: 'success', data });
      })
      .catch((error: unknown) => {
        if (!request.signal.aborted)
          setState({ status: 'error', message: getErrorMessage(error) });
      })
      .finally(() => {
        if (controller.current === request) controller.current = null;
      });
    return () => controller.current?.abort();
  }, []);

  function addCourse(data: CourseFormData) {
    const course: Course = {
      ...data,
      id: crypto.randomUUID(),
      title: data.title.trim(),
      instructor: data.instructor.trim(),
      description: data.description.trim(),
      studentCount: Number(data.studentCount),
    };
    setState((previous) =>
      previous.status === 'success'
        ? { status: 'success', data: [course, ...previous.data] }
        : previous,
    );
  }
  function updateCourseStatus(id: string, status: CourseStatus) {
    setState((previous) =>
      previous.status === 'success'
        ? {
            ...previous,
            data: previous.data.map((course) =>
              course.id === id ? { ...course, status } : course,
            ),
          }
        : previous,
    );
  }
  return { state, mode, load, addCourse, updateCourseStatus };
}
