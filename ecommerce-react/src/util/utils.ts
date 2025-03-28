
// check not null or undefined
export function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }
  