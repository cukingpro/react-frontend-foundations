import type { ReactNode } from 'react';
export function StatePanel({
  title,
  children,
  error = false,
}: {
  title: string;
  children?: ReactNode;
  error?: boolean;
}) {
  return (
    <div className="state-panel" role={error ? 'alert' : 'status'}>
      <span className="state-symbol" aria-hidden="true">
        {error ? '!' : '◌'}
      </span>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
