# Module 2 · Definition of Done

Nguồn: [Definition of Done](https://app.notion.com/p/40226684337680cb8b9bd866e8c35913), đọc ngày 23/10/2026.

## Đối chiếu triển khai

| Yêu cầu                               | Code / cách kiểm tra                                                                                                                                        |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Function components, props, callbacks | `CourseDashboardPage` compose `CourseFilters`, `CourseList` → `CourseCard`, `CourseForm`, `CourseDetails`                                                   |
| Course đúng schema                    | `features/courses/types.ts`: `title`, `instructor`, `level`, `status`, `studentCount`, `description`, `id`; status Draft/Open/Closed                        |
| Danh sách, stable keys                | `CourseList`: `courses.map()`, `key={course.id}`; index chỉ dùng trang trí card                                                                             |
| Search / filters / reset              | `CourseFilters`: controlled props; tìm title hoặc instructor, lọc level và status; nút đặt lại                                                              |
| Derived state                         | `filterCourses(courses, search, level, status)` tính trong render, không có state filteredCourses                                                           |
| Chọn và xem chi tiết                  | Parent lưu `selectedCourseId`, derive selected course bằng `find`; card có outline và `aria-pressed`; details hiển thị đủ thông tin                         |
| Controlled add form                   | `CourseForm`: state field values và errors; preventDefault, validation required title/instructor, studentCount nguyên không âm, reset sau submit thành công |
| Immutable add / status update         | `useCourses`: functional setters, spread và map; `CourseDetails` gọi callback của parent, không mutate props                                                |
| Conditional states                    | Loading/error, thư viện rỗng, không có kết quả, chưa chọn, validation errors                                                                                |
| Shared UI                             | `Button` (variant, native button props, children), `StatePanel` (title, error, children)                                                                    |

## State ownership và data flow

- `CourseDashboardPage` sở hữu danh sách thông qua `useCourses`; đây là nguồn dữ liệu duy nhất của list, details và thống kê.
- Parent giữ search, level, status, selected ID, form visibility và notice; truyền dữ liệu xuống, callbacks lên.
- `CourseForm` giữ draft và validation riêng. Không đồng bộ form qua effect, không tự cập nhật danh sách.
- Khi đổi trạng thái, parent map tạo object mới cho course được đổi. List, details, thống kê và kết quả lọc cùng cập nhật. Nếu course không còn khớp bộ lọc, details vẫn giữ lựa chọn để người dùng thấy kết quả cập nhật.
- Đổi nguồn dữ liệu xóa selection; bỏ chọn hiển thị empty state. Tải lại trang reset dữ liệu phiên, không có backend/persistence.

## Rendering, identity và refactoring

- React render tính JSX; commit mới thay DOM cần đổi. Không tạo ID hoặc gọi cập nhật state trong render.
- `course.id` giữ component identity khi thêm đầu danh sách/lọc; không dùng index làm key.
- Tránh code smell lưu cả selected object và selected ID: chỉ giữ ID, derive object nên status trong details không bị stale.
- Tách `CourseFilters` khỏi page để page tập trung điều phối state; không tạo generic abstraction cho logic khóa học.
- Form unmount khi đóng nên draft được reset khi mở lại; form cũng reset state rõ ràng sau submit thành công. Không khai báo component lồng bên trong component khác.
- `main.tsx` giữ StrictMode. Effect tải dữ liệu có AbortController và cleanup để tránh request cũ ghi đè state; event handlers không bị StrictMode tự gọi hai lần.

## Kiểm thử

```sh
npm run check
npm run test:e2e
```

Unit tests kiểm tra filters, validation, runtime schema. Playwright chạy desktop/mobile cho selection/highlight, status Draft → Open → Closed, derived filters, reset selection, tạo course từ thư viện rỗng, số học viên âm và reset form; giữ regression tests Module 1.

Checklist này đối chiếu code, không thay thế việc học viên tự giải thích data flow và các khái niệm React.
