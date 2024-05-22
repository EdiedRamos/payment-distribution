export function deepClone<T>(obj: T, visited = new WeakMap()): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (visited.has(obj)) {
    return visited.get(obj);
  }

  if (Array.isArray(obj)) {
    const newArray: T[] = [];
    visited.set(obj, newArray);
    for (const item of obj) {
      newArray.push(deepClone(item, visited));
    }
    return newArray as T;
  }

  const newObj: Partial<T> = {};
  visited.set(obj, newObj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepClone(obj[key], visited);
    }
  }
  return newObj as T;
}
