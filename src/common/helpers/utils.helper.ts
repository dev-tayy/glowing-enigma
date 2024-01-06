export function errorIfNull<T>(item: T | null, error_message?: string) {
  if (item === null || item === undefined || item === '') {
    throw new Error(error_message || 'Item is null or undefined');
  }
  return item;
}
