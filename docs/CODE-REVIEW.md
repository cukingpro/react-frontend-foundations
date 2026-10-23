# Bài tập review & refactor (mục 8)

## Before: ví dụ cần review

Đoạn minh họa dưới đây cố tình có lỗi, không phải code được chạy:

```tsx
function App() {
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/courses.json')
      .then((response) => response.json())
      .then(setCourses);
  }, []);
  function add(name: string) {
    courses.push({ name });
    setCourses(courses);
  }
  return (
    <div>{/* header, form, filters, list, styles, footer in one file */}</div>
  );
}
```

## Review findings

1. **App quá nhiều trách nhiệm:** composition, HTTP, state lifecycle, form, list và layout.
2. **any làm mất contract:** JSON không được kiểm tra, có thể thiếu id/instructor/learners.
3. **Fetch thiếu error/loading/cancellation:** không kiểm tra HTTP status, parse lỗi không catch, response cũ có thể cập nhật sau unmount.
4. **Mutate array:** push + set cùng reference; thiếu validation và ID ổn định.
5. **UI chưa semantic/a11y:** cần header/nav/main, labels, button actions, table semantics, focus và status.

## After: implementation thực tế

| Trách nhiệm                          | File sau refactor                                                  |
| ------------------------------------ | ------------------------------------------------------------------ |
| Compose main parts                   | `src/App.tsx`                                                      |
| Header/footer/navigation             | `src/components/common/`                                           |
| Search/filter/add-form visibility    | `src/pages/CoursesPage.tsx`                                        |
| Course presentation                  | `src/features/courses/components/CourseCard.tsx`, `CourseList.tsx` |
| Controlled form + error focus        | `src/features/courses/components/CourseForm.tsx`                   |
| Request lifecycle + immutable insert | `src/features/courses/hooks/useCourses.ts`                         |
| Data source                          | `src/features/courses/services/courseService.ts`                   |
| HTTP status/JSON validation          | `src/services/http.ts`                                             |
| Domain types                         | `src/features/courses/types.ts`                                    |
| Shared API contracts                 | `src/types/api.ts`                                                 |
| Pure search/validation/guards        | `src/features/courses/utils.ts`                                    |
| Shared buttons/states                | `src/components/ui/`                                               |

Luồng: UI chọn nguồn → hook chuyển loading và hủy request cũ → service đọc local/fetch → runtime guard → hook success/error → list hoặc state panel. Form valid → callback typed → functional setter tạo array mới → card render với stable id.

## Thực hành review tiếp

- Theo dõi một lần submit từ CourseForm đến card mới, giải thích vì sao dữ liệu cũ không bị mutate.
- Đổi nguồn nhanh từ Error sang Local; giải thích request cancellation tránh trạng thái cũ ghi đè.
- Thêm field vào Course: xác định thay đổi cần thiết ở types, seed/JSON, guard, form, validator và card.
- Giải thích vì sao Button ở shared UI còn CourseCard thuộc courses feature.
- Chạy tests trước/sau refactor để kiểm tra hành vi người dùng còn đúng.
