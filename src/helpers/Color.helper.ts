const colors = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'green',
  4: 'blue',
  5: 'indigo',
  6: 'violet',
  7: 'pink',
  8: 'brown',
  9: 'grey',
  10: 'black',
};

export function getColorByIndex(index: number): string {
  const colorKeys = Object.keys(colors);
  const adjustedIndex = index % colorKeys.length;
  // @ts-ignore
  return colors[adjustedIndex];
}
