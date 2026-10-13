import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '../../../components/ui/Button';
import { levels, statuses } from '../types';
import type { CourseFormData, FormErrors } from '../types';
import { isLevel, isStatus, validateCourse } from '../utils';

const initialForm: CourseFormData = {
  name: '',
  instructor: '',
  level: 'Beginner',
  learners: '0',
  status: 'Draft',
  description: '',
};

export function CourseForm({
  onAdd,
  onCancel,
}: {
  onAdd: (data: CourseFormData) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  function update<K extends keyof CourseFormData>(
    key: K,
    value: CourseFormData[K],
  ) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCourse(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    onAdd(form);
  }
  const fieldError = (field: keyof CourseFormData) =>
    errors[field] ? (
      <small className="field-error" id={`${field}-error`}>
        {errors[field]}
      </small>
    ) : null;
  return (
    <section className="panel add-panel" aria-labelledby="add-title">
      <div className="row spread">
        <div>
          <p className="eyebrow">GROW YOUR CATALOG</p>
          <h2 id="add-title">Thêm khóa học mới</h2>
        </div>
        <Button variant="secondary" onClick={onCancel}>
          Đóng
        </Button>
      </div>
      <p className="muted">
        Tất cả trường đều bắt buộc. Khóa học mới được lưu trong phiên hiện tại.
      </p>
      <form ref={formRef} onSubmit={submit} noValidate className="form-grid">
        <div>
          <label htmlFor="course-name">Tên khóa học</label>
          <input
            id="course-name"
            name="name"
            required
            minLength={3}
            maxLength={100}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor="course-instructor">Giảng viên</label>
          <input
            id="course-instructor"
            name="instructor"
            required
            maxLength={80}
            value={form.instructor}
            onChange={(e) => update('instructor', e.target.value)}
            aria-invalid={!!errors.instructor}
            aria-describedby={
              errors.instructor ? 'instructor-error' : undefined
            }
          />
          {fieldError('instructor')}
        </div>
        <div>
          <label htmlFor="course-level">Trình độ</label>
          <select
            id="course-level"
            name="level"
            value={form.level}
            onChange={(e) => {
              if (isLevel(e.target.value)) update('level', e.target.value);
            }}
          >
            {levels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="course-status">Trạng thái</label>
          <select
            id="course-status"
            name="status"
            value={form.status}
            onChange={(e) => {
              if (isStatus(e.target.value)) update('status', e.target.value);
            }}
          >
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="course-learners">Số học viên</label>
          <input
            id="course-learners"
            name="learners"
            type="number"
            min="0"
            step="1"
            required
            value={form.learners}
            onChange={(e) => update('learners', e.target.value)}
            aria-invalid={!!errors.learners}
            aria-describedby={errors.learners ? 'learners-error' : undefined}
          />
          {fieldError('learners')}
        </div>
        <div className="full-width">
          <label htmlFor="course-description">Mô tả</label>
          <textarea
            id="course-description"
            name="description"
            required
            minLength={10}
            maxLength={600}
            rows={3}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            aria-invalid={!!errors.description}
            aria-describedby={
              errors.description ? 'description-error' : undefined
            }
          />
          {fieldError('description')}
        </div>
        <div className="row full-width">
          <Button type="submit">Lưu khóa học</Button>
          <Button variant="secondary" onClick={onCancel}>
            Hủy
          </Button>
        </div>
      </form>
    </section>
  );
}
