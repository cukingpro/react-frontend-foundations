import type { CartItem, Student, Todo, User } from './types';

export function greetStudent({ name }: Student): string {
  return `Xin chào, ${name}!`;
}
export function displayUser(user: User | null): string {
  return user
    ? `${user.name} · ${user.email}`
    : 'Chưa có người dùng đăng nhập.';
}
export function summarizeCart(items: CartItem[]): {
  quantity: number;
  total: number;
} {
  return items.reduce(
    (summary, { product, quantity }) => ({
      quantity: summary.quantity + quantity,
      total: summary.total + product.price * quantity,
    }),
    { quantity: 0, total: 0 },
  );
}
export const addTodo = (todos: Todo[], todo: Todo): Todo[] => [...todos, todo];
export const toggleTodo = (todos: Todo[], id: string): Todo[] =>
  todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
export const removeTodo = (todos: Todo[], id: string): Todo[] =>
  todos.filter((todo) => todo.id !== id);

export function countGraded(students: Student[]): number {
  let count = 0; // let because the accumulator is reassigned; prefer const elsewhere.
  for (const { score } of students) if (score !== undefined) count += 1;
  return count;
}
