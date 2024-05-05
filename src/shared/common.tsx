export function createId() {
  return Math.random().toString(36).slice(2);
}

/**
 * @description 跟 Object.assign 类似，只是这个方法会忽略值为 undefined 或 null 的 key
 */
export function assign<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Partial<T>>
): T {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const val = source[key];
      if (val !== undefined && val !== null) {
        target[key as keyof T] = val!;
      }
    }
  }
  return target;
}
