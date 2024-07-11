export interface ElementWithIndex {
  index: number;
  [key: string]: any; // Other properties can be of any type
}

export function addIndicesToElements(elements: any[]): ElementWithIndex[] {
  if (!elements) return [];
  return elements.map((element: any, index: number) => ({
    ...element,
    index: index + 1,
  }));
}
