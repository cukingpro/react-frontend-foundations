export function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'Có lỗi không xác định. Vui lòng thử lại.';
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
