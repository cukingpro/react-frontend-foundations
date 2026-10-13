import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import type { Todo } from './types';
import { addTodo, removeTodo, toggleTodo } from './utils';

export function TodoLab() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 'read', title: 'Đọc cấu trúc semantic HTML', completed: true },
    { id: 'build', title: 'Xây dựng Course Dashboard', completed: false },
  ]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  return (
    <article className="panel">
      <p className="eyebrow">03 + 04 / IMMUTABLE EVENTS</p>
      <h3>Todo tương tác</h3>
      <form
        className="row align-end"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim()) {
            setError('Nhập nội dung công việc.');
            return;
          }
          setTodos((previous) =>
            addTodo(previous, {
              id: crypto.randomUUID(),
              title: title.trim(),
              completed: false,
            }),
          );
          setTitle('');
          setError('');
        }}
      >
        <label className="grow" htmlFor="todo-title">
          Công việc mới
          <input
            id="todo-title"
            required
            maxLength={120}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <Button type="submit">Thêm</Button>
      </form>
      {error && <p role="alert">{error}</p>}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <label className="check-label">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  setTodos((previous) => toggleTodo(previous, todo.id))
                }
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.title}
              </span>
            </label>
            <Button
              variant="danger"
              aria-label={`Xóa ${todo.title}`}
              onClick={() =>
                setTodos((previous) => removeTodo(previous, todo.id))
              }
            >
              Xóa
            </Button>
          </li>
        ))}
      </ul>
      <p role="status" className="muted">
        {todos.filter((todo) => !todo.completed).length} công việc chưa hoàn
        thành
      </p>
    </article>
  );
}
