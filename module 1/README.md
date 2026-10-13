# Course Studio · Module 1

Project **React + TypeScript + Vite** theo [Module 1 trên Notion](https://app.notion.com/p/3f8266843376800a97ced2d6cdf9cdc3), đã đọc Definition of Done và toàn bộ 8 trang con qua Notion MCP ngày 13/10/2026.

## Chạy ứng dụng

Yêu cầu Node.js **22.12+** và npm.

```sh
cd "module 1"
npm ci
npm run dev
```

Mở URL Vite in ra (mặc định `http://127.0.0.1:5173`). Toàn bộ code, dữ liệu, cấu hình và tài liệu của project nằm trong thư mục này.

| Lệnh                   | Công dụng                                                            |
| ---------------------- | -------------------------------------------------------------------- |
| `npm run dev`          | Dev server, cập nhật giao diện bằng HMR                              |
| `npm run build`        | Type-check strict rồi tạo production bundle trong `dist/`            |
| `npm run preview`      | Xem production build sau khi build                                   |
| `npm run lint`         | ESLint + TypeScript + React Hooks, không cho phép warning            |
| `npm run format`       | Định dạng code bằng Prettier                                         |
| `npm run format:check` | Kiểm tra định dạng                                                   |
| `npm test`             | Unit tests cho validation, runtime guards, HTTP và immutable updates |
| `npm run check`        | Lint → format check → unit tests → build                             |
| `npm run test:e2e`     | Playwright desktop + mobile; tự khởi động Vite cổng 4173             |

Lần đầu chạy browser tests:

```sh
npx playwright install chromium
npm run test:e2e
```

## Các khu vực

- **Khóa học** (`#courses`): 6 khóa học mẫu, tìm theo tên/giảng viên, lọc trình độ + trạng thái đồng thời, xem toàn bộ thông tin trong card, thêm khóa học có validation.
- **Lộ trình React** (`#landing`): landing page có hero, lợi ích và curriculum 8 mục.
- **Phòng thực hành** (`#practice`): todo thêm/hoàn thành/xóa, sinh viên ≥ 80 điểm, tìm email, tìm người dùng, giỏ hàng, null safety, generic API responses và public API.
- **Hồ sơ & liên hệ** (`#profile`): semantic profile, kỹ năng, dự án, contact form và bảng lịch học.

### Cách kiểm tra loading / error / empty

Mở **Phòng kiểm thử dữ liệu** phía dưới thư viện:

1. **Dữ liệu mẫu**: Promise-based mock đọc `src/features/courses/data.ts`, delay 450 ms để quan sát loading.
2. **Fetch JSON**: `fetch('/api/courses.json')` qua HTTP thật, kiểm tra `response.ok`, parse JSON và runtime type guard. Mặc định có 2 khóa học khác bộ dữ liệu TS.
3. **Giả lập lỗi**: hiển thị error + nút thử lại với dữ liệu mẫu.
4. **Danh sách rỗng**: empty state và cho phép thêm khóa học đầu tiên.
5. Tìm từ khóa không có: empty search state với nút xóa bộ lọc.

Khóa học thêm mới và todo chỉ lưu **trong bộ nhớ phiên đang mở**. Reload trang sẽ reset; thay nguồn dữ liệu sẽ thay thế danh sách khóa học. Đây là mock frontend, không có backend. Contact form chỉ xác nhận dữ liệu hợp lệ, không gửi email.

Public API tại phòng thực hành là `https://jsonplaceholder.typicode.com/posts?_limit=3`, cần mạng và CORS của dịch vụ. Có error/retry khi không truy cập được; E2E dùng response mô phỏng để kết quả ổn định. Dashboard không phụ thuộc dịch vụ ngoài.

## Environment

`.env` và `.env.example` khai báo `VITE_API_BASE_URL=/api`. Có thể tạo `.env.local` để ghi đè, rồi khởi động lại Vite. Dev console in giá trị cấu hình trong `src/main.tsx`.

`VITE_*` được đóng gói vào frontend và **công khai với trình duyệt**, không dùng để chứa secret. API base khác phải phục vụ `courses.json` đúng kiểu `Course[]`. Kiểu TypeScript không thay thế kiểm tra JSON ở runtime.

## Cấu trúc

```text
src/
├── App.tsx                 # Chỉ compose layout và pages
├── main.tsx                # Entry point, StrictMode, CSS, env logging
├── assets/                 # SVG dùng trong profile, có alt
├── components/
│   ├── common/             # Header, Sidebar, Footer dùng chung
│   └── ui/                 # Button variants, StatePanel
├── constants/              # API base URL
├── features/
│   ├── courses/
│   │   ├── components/     # CourseCard, CourseList, CourseForm
│   │   ├── hooks/          # useCourses: request lifecycle, cancellation, add
│   │   ├── services/       # Mock/local JSON data access
│   │   ├── data.ts         # Typed course seed data
│   │   ├── types.ts        # Course, CourseFormData, literal unions
│   │   └── utils.ts        # Validation, search/filter, runtime guards
│   ├── practice/           # Todo, students, cart, API exercises
│   └── profile/            # Contact form
├── pages/                  # Compose feature-level screens/sections
├── services/               # Generic fetchJson<T>
├── styles/                 # Layered, mobile-first CSS
├── types/                  # Shared ApiState<T>, ApiResponse<T>
└── utils/                  # Unknown error handling, record guard
public/api/                 # Static JSON served over HTTP
tests/                      # Playwright behavioral tests
docs/                       # Requirements map, learning notes, code review
```

**Quy ước:** React component/PascalCase; hàm & hook/camelCase (`use…` cho hook); type/interface/PascalCase; hằng cấu hình/UPPER_SNAKE_CASE. Named exports mặc định, `App` là ví dụ default export. Dùng `import type` cho type và relative import rõ ràng; shared code không import ngược vào feature.

**Dependencies** (`react`, `react-dom`) chạy cùng ứng dụng. **DevDependencies** (Vite, TypeScript, ESLint, Prettier, Vitest, Playwright) phục vụ build, phân tích và kiểm thử. `package-lock.json` khóa dependency để `npm ci` tái lập môi trường.

## Tài liệu & bằng chứng yêu cầu

- [Đối chiếu Definition of Done và mục 1–8](docs/REQUIREMENTS.md)
- [Ghi chú lý thuyết và bài tập](docs/LEARNING-NOTES.md)
- [Bài tập code review/refactor](docs/CODE-REVIEW.md)

Các checklist trong tài liệu đối chiếu **phần triển khai**; không thay thế việc học viên tự đánh giá mình đã hiểu kiến thức hay chưa.

## Git workflow gợi ý

Chạy từ root repository hiện tại (project dùng chung Git repo cha):

```sh
git switch -c feat/module-1-course-studio
git status --short
git add "module 1"
git diff --cached
git commit -m "feat: build module 1 course dashboard and practice labs"
```

Trước commit, chạy `npm run check` và `npm run test:e2e` trong `module 1`. Review diff, mở pull request và merge sau review. Không cần tạo repository lồng nhau.
