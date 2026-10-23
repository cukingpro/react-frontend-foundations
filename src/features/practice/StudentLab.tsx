import { useState } from 'react';
import { cart, students, userResponse } from './data';
import { countGraded, displayUser, greetStudent, summarizeCart } from './utils';

export function StudentLab() {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('an@example.com');
  const [signedIn, setSignedIn] = useState(true);
  const search = query.trim().toLocaleLowerCase('vi');
  const filtered = students.filter(({ name, email }) =>
    `${name} ${email}`.toLocaleLowerCase('vi').includes(search),
  );
  const found = students.find(
    (student) => student.email.toLowerCase() === email.trim().toLowerCase(),
  );
  const [firstStudent] = students;
  const summary = summarizeCart(cart);
  return (
    <article className="panel">
      <p className="eyebrow">03 + 05 / DATA & TYPES</p>
      <h3>Sinh viên & giỏ hàng</h3>
      <p>{firstStudent ? greetStudent(firstStudent) : 'Chưa có sinh viên.'}</p>
      <label htmlFor="student-search">
        Tìm người dùng theo tên hoặc email
        <input
          id="student-search"
          type="search"
          value={query}
          onInput={(event) => setQuery(event.currentTarget.value)}
        />
      </label>
      <ul>
        {filtered.map(({ id, name, email, score }) => (
          <li key={id}>
            {name} · {email} · {score ?? 'Chưa chấm'}
          </li>
        ))}
      </ul>
      {!filtered.length && <p role="status">Không tìm thấy người dùng.</p>}
      <p>
        Điểm ≥ 80:{' '}
        <strong>
          {students
            .filter(({ score }) => (score ?? 0) >= 80)
            .map(({ name }) => name)
            .join(', ')}
        </strong>
      </p>
      <p>Mảng tên (map): {students.map(({ name }) => name).join(', ')}</p>
      <p>
        {countGraded(students)} sinh viên đã có điểm. Có điểm ≥ 90 (some):{' '}
        {students.some(({ score }) => (score ?? 0) >= 90) ? 'Có' : 'Không'}. Tất
        cả đã chấm (every):{' '}
        {students.every(({ score }) => score !== undefined) ? 'Có' : 'Chưa'}.
      </p>
      <label htmlFor="find-email">
        Tìm chính xác email (find)
        <input
          id="find-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <p role="status">
        {found ? greetStudent(found) : 'Không có sinh viên với email này.'}
      </p>
      <h4>Null safety</h4>
      <label className="check-label">
        <input
          type="checkbox"
          checked={signedIn}
          onChange={(event) => setSignedIn(event.target.checked)}
        />
        Đăng nhập mẫu
      </label>
      <p>{displayUser(signedIn ? userResponse.data : null)}</p>
      <h4>Giỏ hàng (reduce)</h4>
      <ul>
        {cart.map(({ product, quantity }) => (
          <li key={product.id}>
            {product.name} × {quantity} · {product.price.toLocaleString('vi')} ₫
            / sản phẩm
          </li>
        ))}
      </ul>
      <p>
        <strong>
          {summary.quantity} sản phẩm · {summary.total.toLocaleString('vi')} ₫
        </strong>
      </p>
    </article>
  );
}
