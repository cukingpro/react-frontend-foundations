import { useState } from 'react';
import { Button } from '../../components/ui/Button';
export function ContactForm() {
  const [message, setMessage] = useState('');
  return (
    <section className="panel" aria-labelledby="contact-title">
      <h3 id="contact-title">Liên hệ</h3>
      <p className="muted">
        Bài tập form HTML — mô phỏng xác nhận tại chỗ, không gửi email.
      </p>
      <form
        className="form-grid"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const name = data.get('fullName');
          if (typeof name !== 'string' || !name.trim()) {
            setMessage('Vui lòng nhập họ tên hợp lệ.');
            return;
          }
          setMessage(
            `Cảm ơn ${name.trim()}! Form hợp lệ, đã hoàn thành bài tập.`,
          );
          form.reset();
        }}
      >
        <label htmlFor="full-name">
          Họ và tên
          <input
            id="full-name"
            name="fullName"
            autoComplete="name"
            required
            maxLength={100}
          />
        </label>
        <label htmlFor="contact-email">
          Email
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label htmlFor="phone">
          Số điện thoại
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            pattern="[+0-9 ()-]{8,20}"
            title="8–20 ký tự: chữ số, dấu +, khoảng trắng, ngoặc hoặc gạch nối"
          />
        </label>
        <label htmlFor="subject">
          Chủ đề
          <input id="subject" name="subject" required maxLength={120} />
        </label>
        <label htmlFor="message" className="full-width">
          Lời nhắn
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={1000}
            rows={4}
          />
        </label>
        <div>
          <Button type="submit">Kiểm tra & gửi mẫu</Button>
        </div>
      </form>
      <p role="status">{message}</p>
    </section>
  );
}
