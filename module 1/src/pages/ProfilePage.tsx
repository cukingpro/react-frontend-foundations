import avatar from '../assets/profile.svg';
import { ContactForm } from '../features/profile/ContactForm';
export function ProfilePage() {
  return (
    <section
      id="profile"
      className="page-section"
      aria-labelledby="profile-title"
    >
      <p className="eyebrow">01 / SEMANTIC HTML IN PRACTICE</p>
      <h2 id="profile-title">Người xây dựng phía sau.</h2>
      <div className="profile-intro panel">
        <img
          src={avatar}
          width="112"
          height="112"
          alt="Ảnh minh họa hồ sơ học viên frontend"
        />
        <div>
          <h3>Xin chào, mình là Huy.</h3>
          <p>
            Mình đang học React bằng cách xây dựng những giao diện có ý nghĩa,
            dễ sử dụng và dễ bảo trì.
          </p>
          <a href="#contact-title">Gửi lời nhắn →</a>
        </div>
      </div>
      <div className="practice-grid">
        <div className="stack">
          <section className="panel" aria-labelledby="skills-title">
            <h3 id="skills-title">Kỹ năng</h3>
            <ul className="tags">
              <li>Semantic HTML</li>
              <li>Responsive CSS</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>React + Vite</li>
            </ul>
          </section>
          <section className="panel" aria-labelledby="projects-title">
            <h3 id="projects-title">Dự án</h3>
            <article>
              <h4>Course Studio</h4>
              <p>
                Dashboard quản lý khóa học với tìm kiếm, bộ lọc và form có
                validation.
              </p>
              <a href="#courses">Xem dashboard →</a>
            </article>
            <article>
              <h4>Frontend Playground</h4>
              <p>
                Thực hành todo immutable, xử lý sinh viên và API có type guard.
              </p>
              <a href="#practice">Mở phòng thực hành →</a>
            </article>
          </section>
        </div>
        <ContactForm />
      </div>
      <section className="panel schedule" aria-labelledby="schedule-title">
        <h3 id="schedule-title">Lịch học gợi ý</h3>
        <div
          className="table-scroll"
          role="region"
          aria-label="Bảng lịch học, có thể cuộn ngang"
          tabIndex={0}
        >
          <table>
            <caption>Lịch học Module 1 · mỗi buổi 2 giờ</caption>
            <thead>
              <tr>
                <th scope="col">Ngày học</th>
                <th scope="col">Chủ đề</th>
                <th scope="col">Giảng viên</th>
                <th scope="col">Thời lượng</th>
              </tr>
            </thead>
            <tbody>
              {[
                'HTML & CSS',
                'JavaScript & Events',
                'TypeScript & API',
                'Vite & Architecture',
              ].map((topic, index) => (
                <tr key={topic}>
                  <th scope="row">Buổi {index + 1}</th>
                  <td>{topic}</td>
                  <td>{index % 2 ? 'Minh Trần' : 'Linh Nguyễn'}</td>
                  <td>120 phút</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
