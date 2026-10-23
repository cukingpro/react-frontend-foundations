# Ghi chú nền tảng (1–8)

## 1. HTML mô tả ý nghĩa

`header` mở đầu trang/vùng, `nav` nhóm điều hướng, `main` nội dung chính duy nhất, `section` một chủ đề có heading, `article` nội dung độc lập, `aside` nội dung phụ, `footer` phần kết. Semantic tags giúp người đọc code, screen reader và công cụ tìm kiếm hiểu cấu trúc. Dùng div khi chỉ cần wrapper layout không có ý nghĩa riêng.

Headings phản ánh phân cấp, không chọn heading theo cỡ chữ. `button` thực hiện action, `a href` điều hướng. Label kết nối bằng htmlFor/id; placeholder không thay label. Ảnh có ý nghĩa cần alt, hình trang trí dùng aria-hidden hoặc alt rỗng. Bảng dành cho dữ liệu dạng hàng/cột, không dùng dựng layout. Keyboard cần thứ tự DOM hợp lý, focus rõ và không bẫy focus.

## 2. CSS cascade, inheritance, specificity, box model

Cascade chọn declaration theo origin/importance/layer trước specificity rồi source order. Trong cùng layer, `.card h3` cụ thể hơn `h3`; khi specificity bằng nhau, rule phía sau thắng. Layer `utilities` đứng sau `components` để utility override có chủ đích. Font và color được kế thừa, margin/padding không tự kế thừa. Hạn chế specificity cao; trạng thái invalid dùng override rõ ràng duy nhất.

Content + padding + border tạo kích thước box; margin tạo khoảng cách bên ngoài. Với `content-box`, width chưa gồm padding/border; `border-box` tính chúng trong width, nên card/form dễ kiểm soát kích thước.

Flexbox phù hợp **một chiều** (toolbar row), Grid phù hợp **hai chiều** (course gallery). Mobile-first: viết layout hẹp trước rồi dùng min-width để tăng cột. Responsive còn là đổi bố trí navigation, chiều rộng form và cho bảng cuộn riêng. Focus phải hiển thị tương đương hover, disabled cho biết action chưa sẵn sàng. Variables làm màu/radius/spacing nhất quán, component classes tái sử dụng thay vì copy CSS.

## 3. Dữ liệu JavaScript và immutable updates

`const` không cho gán lại biến nhưng không làm object bất biến. `let` chỉ dùng khi cần gán lại. Primitive types gồm string/number/boolean/null/undefined/bigint/symbol; arrays và objects là reference values. Function nhận tham số, trả kết quả; declaration hữu ích cho hàm độc lập, arrow gọn cho callbacks.

`map` biến mỗi item thành item mới; `filter` giữ items thỏa điều kiện; `find` lấy item đầu hoặc undefined; `some` hỏi có ít nhất một; `every` hỏi tất cả; `reduce` gom danh sách thành một kết quả. Destructuring đọc trường/phần tử ngắn gọn.

Spread chỉ **shallow copy**. Khi sửa nested field, cần copy từng cấp bị thay đổi. Todo toggle copy array bằng map và copy object được sửa bằng spread; items không đổi giữ reference. React dùng identity để nhận biết state mới; mutate có thể làm render bỏ sót hoặc phá snapshots cũ. Functional setter `setState(previous => ...)` không dựa vào closure state đã cũ.

## 4. Events, modules, asynchronous requests

React handlers nhận event wrapper cho DOM events. `preventDefault()` chặn native submit reload nhưng vẫn phải tự validate/process dữ liệu. Controlled inputs đọc state qua value/onChange; native ContactForm minh họa FormData.

Named export import bằng đúng tên trong `{ }`; default export có một giá trị mặc định mỗi module. ES Modules tạo ranh giới trách nhiệm, test và tái sử dụng thuận tiện.

Promise biểu diễn kết quả tương lai; async trả Promise, await đợi trong hàm async mà không chặn main thread. Fetch không tự throw cho HTTP 404/500 nên cần `response.ok`. JSON parsing cũng có thể lỗi. `try/catch` đưa lỗi vào UI; `finally` cleanup bất kể thành công/thất bại. AbortController hủy fetch và ngăn response cũ ghi đè nguồn mới. Mock delay không phải mạng thật; HTTP JSON mode và public API mới thực hiện fetch.

Loading/success/error là các trạng thái riêng; empty là success với danh sách rỗng. Cho phép retry để người dùng phục hồi. Không giả vờ dữ liệu đã tải thành công khi gặp lỗi.

## 5. TypeScript là JavaScript có kiểm tra kiểu

Compiler phát hiện lỗi trước runtime, không biến external JSON thành dữ liệu đáng tin cậy. Interface phù hợp object contract có tên; type còn mô tả primitives, unions và mapped types. Inference giảm annotation thừa; public function boundaries có parameter/return types rõ ràng.

Optional `score?: number` có thể undefined. `User | null` buộc check trước khi đọc. `??` chỉ fallback với null/undefined (khác `||` làm mất cả 0); optional chaining trả undefined nếu base thiếu. `noUncheckedIndexedAccess` buộc kiểm tra phần tử mảng không tồn tại. `strict` gồm strict null checks và unknown catch variables; `noEmit` giao transpile/bundle cho Vite.

## 6. Unions, generics, narrowing

Literal union hạn chế giá trị như `'Draft' | 'Published' | 'Archived'`. Discriminated union dùng `status` để chỉ cho phép data ở success hoặc message ở error, tránh tổ hợp bất hợp lý kiểu loading nhưng có error/data cũ.

`ApiResponse<T>` dùng lại cấu trúc response và vẫn giữ kiểu từng domain. `fetchJson<T>` nhận guard để chuyển unknown thành T sau kiểm tra runtime. Không cast JSON thành Course[] rồi tin ngay.

`any` tắt kiểm tra kiểu; `unknown` nhận mọi giá trị nhưng không cho đọc trường trước khi narrow. Dùng typeof cho primitives, instanceof Error cho error, `in` kiểm tra key sau khi biết là object, custom predicate `value is Course` cho domain. Lưu ý `typeof null === 'object'`, nên guard phải loại null. Catch có thể nhận string/null/object, không chỉ Error.

## 7. Tooling & workflow

`index.html → main.tsx → App.tsx → pages → features`. Vite phục vụ ES Modules/HMR lúc dev và bundle assets lúc build. TypeScript compiler chạy trước build để phát hiện lỗi type. Preview phục vụ dist để xem build, không phải backend production.

Linter phát hiện vấn đề code (unused, hooks, unsafe any); formatter thống nhất trình bày. Chúng bổ sung nhau. Dependencies chạy trong sản phẩm; devDependencies phục vụ phát triển/build/test. Lockfile đảm bảo versions nhất quán.

Env Vite được thay lúc build, không đọc động secret từ server. `.env.local` dành cấu hình máy cá nhân và không commit; public `.env` chỉ có API URL. Git workflow: branch → thay đổi nhỏ → check → review diff → commit → pull request.

## 8. Code organization

Shared components không chứa domain logic. Feature components chỉ phục vụ domain đó. Page compose và điều phối hiển thị. Hook quản lý lifecycle/stateful behavior. Service gọi data source; utility xử lý thuần; type định nghĩa contract. Assets chứa hình; constants chứa config không đổi.

Không cần thêm abstraction cho mọi dòng code. Tách khi có trách nhiệm khác, logic tái dùng hoặc cần test độc lập. Trong project này App chỉ compose, CourseForm chỉ xử lý form, useCourses điều phối data, service tách khỏi JSX. Đọc CODE-REVIEW.md để thực hành phân tích monolith.
