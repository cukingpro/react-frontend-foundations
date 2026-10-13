import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { CoursesPage } from './pages/CoursesPage';
import { LandingPage } from './pages/LandingPage';
import { PracticePage } from './pages/PracticePage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Bỏ qua điều hướng
      </a>
      <div className="app-shell">
        <Sidebar />
        <div className="workspace">
          <Header />
          <main id="main" tabIndex={-1}>
            <CoursesPage />
            <LandingPage />
            <PracticePage />
            <ProfilePage />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
