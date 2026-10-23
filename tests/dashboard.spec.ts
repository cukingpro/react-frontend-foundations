import { expect, test } from '@playwright/test';

test('selection, child status updates, derived filters and selection reset', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Chưa chọn khóa học' }),
  ).toBeVisible();
  const reactCard = page
    .locator('.course-card')
    .filter({ hasText: 'Your First React Application' });
  await reactCard.getByRole('button', { name: /Xem chi tiết/ }).click();
  await expect(reactCard).toHaveClass(/course-card--selected/);
  await expect(reactCard.getByRole('button')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const details = page.locator('#course-details');
  await expect(details).toContainText('Huy Nguyễn');
  await expect(details).toContainText('Beginner');
  await expect(details).toContainText('0');
  await page.getByLabel('Trạng thái', { exact: true }).selectOption('Draft');
  await page.getByLabel('Cập nhật trạng thái').selectOption('Open');
  await expect(page.locator('.course-card')).toHaveCount(0);
  await expect(details.getByLabel('Cập nhật trạng thái')).toHaveValue('Open');
  await expect(
    page.getByRole('status').filter({ hasText: 'Đã cập nhật' }),
  ).toContainText('Open');
  await page.getByRole('button', { name: 'Xóa bộ lọc' }).click();
  await expect(reactCard).toContainText('Open');
  await page.getByLabel('Cập nhật trạng thái').selectOption('Closed');
  await expect(reactCard).toContainText('Closed');
  await page.getByRole('button', { name: 'Bỏ chọn' }).click();
  await expect(
    page.getByRole('heading', { name: 'Chưa chọn khóa học' }),
  ).toBeVisible();
  await reactCard.getByRole('button').click();
  await page
    .getByText('Phòng kiểm thử dữ liệu · loading / error / empty')
    .click();
  await page.getByRole('button', { name: 'Danh sách rỗng' }).click();
  await expect(
    page.getByRole('heading', { name: 'Thư viện chưa có khóa học' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Chưa chọn khóa học' }),
  ).toBeVisible();
});

test('negative counts, create first course and reset controlled form', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.course-card')).toHaveCount(6);
  await page
    .getByText('Phòng kiểm thử dữ liệu · loading / error / empty')
    .click();
  await page.getByRole('button', { name: 'Danh sách rỗng' }).click();
  await expect(
    page.getByRole('heading', { name: 'Thư viện chưa có khóa học' }),
  ).toBeVisible();
  await page.getByRole('button', { name: '＋ Thêm khóa học' }).click();
  await page.getByLabel('Tên khóa học', { exact: true }).fill('Module 2 React');
  await page.getByLabel('Giảng viên', { exact: true }).fill('Huy Nguyễn');
  await page
    .getByLabel('Mô tả', { exact: true })
    .fill('Thực hành components, props và state.');
  await page.getByLabel('Số học viên', { exact: true }).fill('-1');
  await page.getByRole('button', { name: 'Lưu khóa học' }).click();
  await expect(
    page.getByText('Số học viên phải là số nguyên không âm hợp lệ.'),
  ).toBeVisible();
  await expect(page.locator('.course-card')).toHaveCount(0);
  await page.getByLabel('Số học viên', { exact: true }).fill('12');
  await page.locator('#course-status').selectOption('Open');
  await page.getByRole('button', { name: 'Lưu khóa học' }).click();
  await expect(page.locator('.course-card')).toHaveCount(1);
  await expect(page.locator('.course-card')).toContainText('12 học viên');
  await page.getByRole('button', { name: '＋ Thêm khóa học' }).click();
  await expect(page.getByLabel('Tên khóa học', { exact: true })).toHaveValue(
    '',
  );
  await expect(page.getByLabel('Số học viên', { exact: true })).toHaveValue(
    '0',
  );
});

test('search, combined filters, empty results and validated course creation', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.course-card')).toHaveCount(6);
  await page.getByLabel('Tìm kiếm', { exact: true }).fill('Linh');
  await page
    .getByLabel('Trình độ', { exact: true })
    .selectOption('Intermediate');
  await page.getByLabel('Trạng thái', { exact: true }).selectOption('Open');
  await expect(page.locator('.course-card')).toHaveCount(1);
  await expect(page.locator('.course-card')).toContainText('TypeScript');
  await page.getByLabel('Tìm kiếm', { exact: true }).fill('not-found');
  await expect(
    page.getByRole('heading', { name: 'Không tìm thấy khóa học' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Xóa bộ lọc' }).click();
  await page.getByRole('button', { name: '＋ Thêm khóa học' }).click();
  await page.getByRole('button', { name: 'Lưu khóa học' }).click();
  await expect(page.getByLabel('Tên khóa học', { exact: true })).toBeFocused();
  await expect(
    page.getByText('Tên khóa học cần từ 3 đến 100 ký tự.'),
  ).toBeVisible();
  await page
    .getByLabel('Tên khóa học', { exact: true })
    .fill('React Testing Workshop');
  await page.getByLabel('Giảng viên', { exact: true }).fill('Huy Nguyễn');
  await page
    .getByLabel('Mô tả', { exact: true })
    .fill('Thực hành kiểm thử giao diện React với Playwright.');
  await page.getByRole('button', { name: 'Lưu khóa học' }).click();
  await expect(page.locator('.course-card')).toHaveCount(7);
  await expect(page.locator('.course-card').first()).toContainText(
    'React Testing Workshop',
  );
  await expect(
    page.getByRole('button', { name: '＋ Thêm khóa học' }),
  ).toBeFocused();
  expect(errors).toEqual([]);
});

test('loading, error, retry, empty and real JSON fetch states', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Đang tải khóa học…' }),
  ).toBeVisible();
  await expect(page.locator('.course-card')).toHaveCount(6);
  await page
    .getByText('Phòng kiểm thử dữ liệu · loading / error / empty')
    .click();
  await page.getByRole('button', { name: 'Giả lập lỗi' }).click();
  await expect(
    page.getByRole('heading', { name: 'Chưa thể tải khóa học' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Thử lại với dữ liệu mẫu' }).click();
  await expect(page.locator('.course-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Danh sách rỗng' }).click();
  await expect(
    page.getByRole('heading', { name: 'Thư viện chưa có khóa học' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Fetch JSON' }).click();
  await expect(page.locator('.course-card')).toHaveCount(2);
  await expect(page.locator('.course-card').first()).toContainText(
    'React API Workshop',
  );
  await page.route('**/api/courses.json', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '[{"bad":true}]',
    }),
  );
  await page.getByRole('button', { name: 'Fetch JSON' }).click();
  await expect(page.getByRole('alert')).toContainText('định dạng');
});

test('latest source wins when a stale request completes later', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.course-card')).toHaveCount(6);
  await page
    .getByText('Phòng kiểm thử dữ liệu · loading / error / empty')
    .click();
  await page.getByRole('button', { name: 'Giả lập lỗi' }).click();
  await page.getByRole('button', { name: 'Dữ liệu mẫu', exact: true }).click();
  await expect(page.locator('.course-card')).toHaveCount(6);
  await expect(
    page.getByRole('heading', { name: 'Chưa thể tải khóa học' }),
  ).toHaveCount(0);
});

test('practice todos, user search and public API failure/retry', async ({
  page,
}) => {
  await page.goto('/#practice');
  await page.getByLabel('Công việc mới').fill('Viết type guard');
  await page.getByRole('button', { name: 'Thêm', exact: true }).click();
  await expect(page.getByText('2 công việc chưa hoàn thành')).toBeVisible();
  await page.getByLabel('Viết type guard', { exact: true }).check();
  await page.getByRole('button', { name: 'Xóa Viết type guard' }).click();
  await expect(page.getByText('Viết type guard', { exact: true })).toHaveCount(
    0,
  );
  await page.getByLabel('Tìm người dùng theo tên hoặc email').fill('no-user');
  await expect(page.getByText('Không tìm thấy người dùng.')).toBeVisible();
  await page.route('https://jsonplaceholder.typicode.com/**', (route) =>
    route.fulfill({ status: 503, body: 'Unavailable' }),
  );
  await page
    .getByRole('button', { name: 'Tải bài viết từ public API' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Không tải được bài viết' }),
  ).toBeVisible();
  await page.route('https://jsonplaceholder.typicode.com/**', (route) =>
    route.fulfill({
      json: [{ id: 1, title: 'Public API sample', body: 'Validated response' }],
    }),
  );
  await page.getByRole('button', { name: 'Thử tải lại bài viết' }).click();
  await expect(
    page.getByRole('heading', { name: 'Public API sample' }),
  ).toBeVisible();
});

test('responsive layout, semantic landmarks, keyboard and contact form', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Bỏ qua điều hướng' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await expect(
    page.getByRole('navigation', { name: 'Điều hướng chính' }),
  ).toBeVisible();
  await expect(page.getByRole('table')).toHaveCount(1);
  await page.getByLabel('Họ và tên', { exact: true }).fill('Huy Nguyễn');
  await page.getByLabel('Email', { exact: true }).fill('huy@example.com');
  await page.getByLabel('Số điện thoại', { exact: true }).fill('0901234567');
  await page.getByLabel('Chủ đề', { exact: true }).fill('Học React');
  await page
    .getByLabel('Lời nhắn', { exact: true })
    .fill('Tôi muốn tìm hiểu thêm về khóa học React.');
  await page.getByRole('button', { name: 'Kiểm tra & gửi mẫu' }).click();
  await expect(
    page.getByText('Cảm ơn Huy Nguyễn! Form hợp lệ, đã hoàn thành bài tập.'),
  ).toBeVisible();
  const widths =
    testInfo.project.name === 'mobile' ? [320, 390, 768] : [1280, 1440];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});
