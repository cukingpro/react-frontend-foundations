# Đối chiếu yêu cầu Notion

Nguồn: [Module 1](https://app.notion.com/p/3f8266843376800a97ced2d6cdf9cdc3). Các trang con được đọc đầy đủ, bao gồm What You Will Learn, What You Need to Understand, Hands-on Practice và Completion Checklist.

## Definition of Done

| Yêu cầu                                    | Triển khai                                                                                                                     | Cách kiểm chứng                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Responsive desktop/mobile                  | CSS mobile-first, media queries 600/1000/1250px, sidebar chuyển thành navigation trên cùng ở mobile                            | E2E viewport 320, 390, 768, 1280, 1440; không overflow toàn trang  |
| Semantic HTML & accessibility              | Header/nav/main/section/article/aside/footer, skip link, heading hierarchy, label, alt, focus, live status/errors, table scope | E2E keyboard/landmarks/form; tự Tab qua controls                   |
| Danh sách khóa học local/API               | Typed TS seed + Promise mock + static JSON qua fetch                                                                           | 6 seed courses, 2 JSON courses                                     |
| Search + filter                            | Tên/giảng viên, kết hợp level và status                                                                                        | E2E search/filter/clear                                            |
| Form thêm khóa học, validation             | Tên 3–100, giảng viên 2–80, mô tả 10–600, học viên nguyên không âm, enum validation                                            | Unit boundary tests + E2E submit invalid/valid, focus lỗi đầu tiên |
| Loading/error/empty                        | Discriminated union, mock controls, retry, no-result state                                                                     | E2E trạng thái, invalid JSON, latest-request-wins                  |
| Types course/form/API                      | `features/courses/types.ts`, `types/api.ts`                                                                                    | `tsc --noEmit`, không dùng `any`                                   |
| Immutable updates                          | Functional state setters, array/object spread, map/filter                                                                      | Tests trên frozen todo data, tìm kiếm không mutate input           |
| Vite + TypeScript                          | `vite.config.ts`, `tsconfig.json`, `main.tsx`                                                                                  | `npm run build` và dev server                                      |
| Lint + format                              | ESLint, React Hooks rules, Prettier                                                                                            | `npm run lint`, `npm run format:check`                             |
| Tổ chức components/features/services/types | README tree, App chỉ compose                                                                                                   | `docs/CODE-REVIEW.md`                                              |

Core details được hiển thị trên mỗi `CourseCard`: **name, instructor, level, learners, status, description**. Không cần mở modal để xem thông tin cơ bản.

## 1. HTML: semantic & accessible structures

Nguồn: [Mục 1](https://app.notion.com/p/04d26684337682daa18801df0590e77c).

- **Cấu trúc HTML:** `index.html` có doctype, lang, charset, viewport, title, description; `main.tsx` mount React vào root.
- **Semantic elements:** `Header`, `Sidebar` (aside + nav), `App` (main), pages (section), cards/projects (article), `Footer`.
- **Headings, paragraphs, lists, links, images:** h1 của dashboard; h2 cho sections; h3 cards/labs; h4 tiểu mục. Không ép dùng h5/h6 nếu không có cấp nội dung phù hợp. Profile có SVG minh họa + alt mô tả.
- **Form elements:** CourseForm + ContactForm chứa form/label/input/textarea/select/button; input có id/label liên kết, email/tel, required và bounds.
- **Bảng:** ProfilePage dùng caption/thead/tbody/tr/th/td; `scope="col"` và `scope="row"`. Bảng có vùng scroll riêng, focus được.
- **A11y:** buttons làm actions, anchors điều hướng section, Tab dùng native controls, skip link, focus visible, aria-invalid/describedby, status và alert.
- **Hands-on 1 Profile:** ProfilePage có giới thiệu, kỹ năng, dự án (mỗi dự án article), dùng header/nav/footer của app.
- **Hands-on 2 Contact:** đủ full name/email/phone/subject/message, HTML validation và thông báo kết quả.
- **Hands-on 3 Schedule:** ngày/buổi, topic, instructor, duration trong bảng semantic.

## 2. CSS: cascade, box model, Flexbox, Grid, media queries, reuse

Nguồn: [Mục 2](https://app.notion.com/p/06326684337682bdb61301e940ffca46).

- `styles/global.css`: cascade layers `base → components → utilities`, kế thừa font/color; variables cho màu, spacing và radius; `border-box` toàn cục.
- **Flexbox** cho toolbar/nav/row/card metadata; **Grid** cho dashboard shell/cards/forms/labs.
- Mobile-first: 1 cột mặc định, thêm 2/3 cột ở breakpoint; sidebar chuyển vị trí ở mobile.
- States `:hover`, `:focus`/`:focus-visible`, `:active`, `:disabled`; reduced-motion.
- Reuse Button primary/secondary/danger, panel/card styles, input styles, badges, utility row/spread/wrap/full-width.
- **Hands-on landing:** LandingPage có hero/benefits/curriculum; dùng footer app.
- **Hands-on reusable UI:** Button được dùng trong dashboard, form, todo và API lab; danger thực sự xóa todo.
- **Hands-on dashboard:** Sidebar + Header + main, responsive.
- Giải thích specificity/cascade/box model trong `LEARNING-NOTES.md`.

## 3. JavaScript Basic

Nguồn: [Mục 3](https://app.notion.com/p/01b266843376836e87c40120fb8293ef).

- `const` mặc định; `countGraded` dùng `let` cho accumulator thay đổi.
- Function declarations trong utils, arrow functions cho callbacks; typed params/return vẫn là các phép toán JavaScript thông thường.
- Objects/arrays, primitives, object destructuring (`{ name }`), array destructuring (`[firstStudent]`), spread.
- `map` render/name list/toggle; `filter` search/high scores/delete; `find` email lookup; `some` điểm ≥90/enum guards; `every` score completion/JSON guards; `reduce` cart totals/dashboard learner count.
- **Students:** array records, ≥80, tìm email, mảng names trong StudentLab.
- **Todo operations:** add/toggle/remove bằng pure functions, original không đổi.
- **Cart:** Product + CartItem, tổng quantity + total price bằng reduce, hiển thị trong StudentLab.
- React state dùng setter callback để tính trên phiên bản state mới nhất; notes giải thích reference identity.

## 4. JavaScript for React

Nguồn: [Mục 4](https://app.notion.com/p/35c26684337683aa8b3401bf5be14402).

- `onClick` buttons; `onInput` user search; `onChange` filters/forms; `onSubmit` + `preventDefault` CourseForm/TodoLab/ContactForm.
- Controlled form đọc state; contact form đọc `FormData`; validation trước update.
- ES Modules: named exports hầu hết files; default App; `import type` tách types.
- Promise-based mock + async/await; `services/http.ts` dùng fetch, response.ok, JSON parse; public API riêng tại practice/services.ts.
- `try/catch/finally` trong useCourses/ApiLab; abort stale requests và khi unmount; cleanup request ref trong finally.
- **Interactive Todo:** form thêm, checkbox complete, delete, incomplete count.
- **User Search:** filter name/email qua input event.
- **Public API:** ApiLab fetch JSONPlaceholder posts, idle/loading/success/error và retry.

## 5. TypeScript Basic

Nguồn: [Mục 5](https://app.notion.com/p/eef266843376834785a201efe027b762).

- `tsconfig.json`: strict, noUncheckedIndexedAccess, noUnusedLocals/Parameters, noFallthroughCasesInSwitch, noEmit.
- string/number/boolean, typed arrays/objects, inferred locals, typed function params/returns.
- Interfaces Student/Course/User, aliases Product/CartItem/FormErrors; optional `Student.score?: number`.
- Null safety: displayUser(User | null), score `??`, optional chaining find/ref, guarded root, guarded first array item.
- **Student:** typed array + greetStudent.
- **Product/Cart:** typed products/cart items + summarizeCart.
- **Safe user display:** checkbox điều khiển user/null trong StudentLab; hiện tên/email hoặc fallback.
- Không dùng any; TS chỉ kiểm tra lúc build, runtime guards kiểm tra JSON thật.

## 6. TypeScript for React

Nguồn: [Mục 6](https://app.notion.com/p/0fd2668433768253a29e017cfd2e1d96).

- Literal unions Level/CourseStatus/DataMode; discriminated `ApiState<T>` đủ idle/loading/success/error.
- `describeState<T>` switch theo discriminator, render đúng từng trạng thái tại ApiLab.
- Generic `ApiResponse<T>` áp dụng User/Post/Course[] tại practice/data.ts; `fetchJson<T>` generic dùng custom guard.
- JSON và catch là unknown, chỉ đọc sau narrowing.
- `typeof`, `instanceof`, `in`, custom `isRecord/isCourse/isCourseList/isLevel/isStatus/isPosts`.
- **API State Modeling:** ApiState + describeState + UI tương tác.
- **Generic API Response:** đủ 3 domain models, hiển thị trong lab.
- **Safe Error Message:** Error → message, giá trị khác → fallback, có unit test.

## 7. Vite + TypeScript project setup

Nguồn: [Mục 7](https://app.notion.com/p/ded266843376828fa4028169899887c4).

- Vite React plugin, React entry, TS strict, scripts dev/build/preview/lint và format.
- Dependencies/devDependencies phân nhóm; có npm lockfile.
- `.env`, `.env.example`, config đọc `import.meta.env.VITE_API_BASE_URL`, dev console log trong main.
- README hướng dẫn chạy dev/build/preview, env conventions, import conventions, basic Git branch/stage/review/commit workflow.
- **Initial application:** Header/CourseList/CourseCard/Footer tách file; initial course data từ local TypeScript file.
- Nội dung mặc định thay bằng Course Studio; assets không phụ thuộc CDN.

## 8. Scalable codebase

Nguồn: [Mục 8](https://app.notion.com/p/7bf26684337683d8b1a78118e092eaf4).

- Có assets/components/pages/features/hooks/services/types/utils/constants với nội dung thực tế.
- Props typed, shared Button/StatePanel khác feature-specific CourseForm/Card/List.
- Course types ở feature/types, shared API types ở src/types.
- HTTP transport ở services/http, course data access ở feature service, lifecycle ở hook, presentation ở component.
- App chỉ compose; không fetch, validate hoặc xử lý business logic.
- **Refactor Course Application:** Header/Footer/Card/List và Course/service tách riêng.
- **Feature Organization:** courses feature chứa components/types/services/hooks/data/utils.
- **Code Review:** `CODE-REVIEW.md` có monolithic before sample, phân tích extraction và after mapping.

## Kiểm tra thủ công đề xuất

1. Chạy dev, nhìn console xác nhận env; Tab → skip link → main → search/filter/buttons/forms. Focus phải rõ.
2. Mở mobile/desktop: sidebar chuyển thành menu trên, card không bị cắt, bảng scroll riêng.
3. Search theo giảng viên, kết hợp level/status; thử từ khóa không tồn tại rồi reset.
4. Submit khóa học trắng → lỗi có mô tả, focus trường đầu; nhập hợp lệ → card mới, thông báo và focus trả về nút thêm.
5. Mở data tools, kiểm tra đủ loading/error/retry/empty/fetch.
6. Kiểm tra todo, sinh viên, cart, null user, API lab và contact form.
7. Đọc notes và tự trả lời Completion Checklist trên Notion. Việc có implementation không tự chứng minh học viên đã hiểu.
