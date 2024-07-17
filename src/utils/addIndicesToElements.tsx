export type ElementWithIndex<T> = T & { index: number };

export function addIndicesToElements<T>(elements: T[]): ElementWithIndex<T>[] {
  if (!elements) return [];
  return elements.map((element: T, index: number) => ({
    ...element,
    index: index + 1,
  }));
}
