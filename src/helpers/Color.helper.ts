import { TaskStatus } from '../types/enums/status.enums';

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
export function getColorByStatus(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.PENDING:
      return 'blue';
    case TaskStatus.IN_PROGRESS:
      return 'green';
    case TaskStatus.CANCELLED:
      return 'red';
    default:
      return 'grey';
  }
}
export function getColorByTime(hours: number): string {
  if (hours > 24) {
    return 'green';
  } else if (hours > 12) {
    return 'blue';
  } else if (hours > 4) {
    return 'yellow';
  } else {
    return 'red';
  }
}
