export function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#courses">
        <span className="brand-icon" aria-hidden="true">
          C.
        </span>
        course<span className="brand-light">studio</span>
      </a>
      <p className="eyebrow">WORKSPACE</p>
      <nav aria-label="Điều hướng chính">
        <a href="#courses">
          ▦ <span>Khóa học</span>
        </a>
        <a href="#landing">
          ↗ <span>Lộ trình React</span>
        </a>
        <a href="#practice">
          ⌘ <span>Phòng thực hành</span>
        </a>
        <a href="#profile">
          ◉ <span>Hồ sơ & liên hệ</span>
        </a>
      </nav>
      <section className="sidebar-note">
        <span className="eyebrow">YOUR NEXT CHAPTER</span>
        <h2>
          Bắt đầu từ
          <br />
          nền tảng vững chắc.
        </h2>
        <p>
          8 chủ đề. Một hành trình.
          <br />
          Từng bước làm chủ frontend.
        </p>
        <a href="#practice">Khám phá bài tập →</a>
      </section>
      <p className="sidebar-bottom">● Learning by building</p>
    </aside>
  );
}
