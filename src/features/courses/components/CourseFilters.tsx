import { Button } from '../../../components/ui/Button';
import { levels, statuses } from '../types';

interface CourseFiltersProps {
  search: string;
  level: string;
  status: string;
  onSearchChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export function CourseFilters({
  search,
  level,
  status,
  onSearchChange,
  onLevelChange,
  onStatusChange,
  onReset,
}: CourseFiltersProps) {
  return (
    <>
      <div className="filters">
        <label className="search-field" htmlFor="course-search">
          Tìm kiếm
          <input
            id="course-search"
            type="search"
            placeholder="Tên khóa học hoặc giảng viên…"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
        <div>
          <label htmlFor="level-filter">Trình độ</label>
          <select
            id="level-filter"
            value={level}
            onChange={(event) => onLevelChange(event.target.value)}
          >
            <option value="all">Tất cả trình độ</option>
            {levels.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status-filter">Trạng thái</label>
          <select
            id="status-filter"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            {statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      {(search || level !== 'all' || status !== 'all') && (
        <Button variant="secondary" onClick={onReset}>
          Đặt lại tìm kiếm và bộ lọc
        </Button>
      )}
    </>
  );
}
