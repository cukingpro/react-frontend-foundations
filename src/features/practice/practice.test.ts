import { describe, expect, it } from 'vitest';
import { getErrorMessage } from '../../utils/errors';
import { describeState } from '../../types/api';
import { cart } from './data';
import type { Todo } from './types';
import {
  addTodo,
  displayUser,
  removeTodo,
  summarizeCart,
  toggleTodo,
} from './utils';

describe('practice data operations', () => {
  it('adds, toggles and removes without mutating frozen todos', () => {
    const first = Object.freeze({ id: '1', title: 'Read', completed: false });
    const original: Todo[] = [first];
    Object.freeze(original);
    const added = addTodo(original, {
      id: '2',
      title: 'Build',
      completed: false,
    });
    const toggled = toggleTodo(added, '1');
    expect(original).toHaveLength(1);
    expect(first.completed).toBe(false);
    expect(toggled[0]?.completed).toBe(true);
    expect(removeTodo(toggled, '1').map((todo) => todo.id)).toEqual(['2']);
  });
  it('calculates cart quantity and total and handles empty data', () => {
    expect(summarizeCart(cart)).toEqual({ quantity: 3, total: 320000 });
    expect(summarizeCart([])).toEqual({ quantity: 0, total: 0 });
    expect(displayUser(null)).toContain('Chưa có');
  });
  it('narrows unknown errors and models all API states', () => {
    expect(getErrorMessage(new Error('offline'))).toBe('offline');
    expect(getErrorMessage({ message: 'unsafe' })).toContain('không xác định');
    expect(describeState({ status: 'idle' })).toContain('Chưa');
    expect(describeState({ status: 'loading' })).toContain('Đang tải');
    expect(describeState({ status: 'success', data: [] })).toContain(
      'thành công',
    );
    expect(describeState({ status: 'error', message: 'offline' })).toBe(
      'offline',
    );
  });
});
