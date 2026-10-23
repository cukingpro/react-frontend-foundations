const curriculum = [
  'Semantic HTML & Accessibility',
  'CSS & Responsive Layouts',
  'Modern JavaScript & Immutable Data',
  'Events, Forms & Fetch APIs',
  'TypeScript Fundamentals',
  'Generics & Safe API States',
  'React + Vite Tooling',
  'Scalable Codebase Structure',
];
export function LandingPage() {
  return (
    <section
      id="landing"
      className="page-section"
      aria-labelledby="landing-title"
    >
      <div className="landing-hero">
        <div>
          <p className="eyebrow">YOUR REACT JOURNEY STARTS HERE</p>
          <h2 id="landing-title">
            Nền tảng tốt.
            <br />
            Khả năng vô hạn.
          </h2>
          <p>
            Học frontend từ những điều cốt lõi. Xây dựng sản phẩm thật bằng
            React và TypeScript, từng bước một.
          </p>
          <a className="button button--primary" href="#practice">
            Bắt đầu thực hành ↗
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span>React</span>
          <strong>{'{ }'}</strong>
          <span>from foundations to creation</span>
        </div>
      </div>
      <h3>Bạn sẽ mang theo điều gì?</h3>
      <ul className="benefits">
        <li>
          <strong>01 / Giao diện có ý nghĩa</strong>
          <p>Semantic HTML, accessibility và responsive trên mọi thiết bị.</p>
        </li>
        <li>
          <strong>02 / Dữ liệu an toàn</strong>
          <p>JavaScript hiện đại, immutable updates và TypeScript strict.</p>
        </li>
        <li>
          <strong>03 / Sẵn sàng phát triển</strong>
          <p>Vite, linting, formatting và tổ chức code theo feature.</p>
        </li>
      </ul>
      <h3>Lộ trình 8 chủ đề</h3>
      <ol className="curriculum">
        {curriculum.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ol>
    </section>
  );
}
