import { Sort } from '../../structures';

export function sortData(
  array: Array<any>,
  property: string,
  sort: Sort
): Array<any> {
  const data = array.slice();
  if (!sort.active || sort.direction === '') {
    return data;
  }

  return data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    if (sort.active) {
      return compare(a[property], b[property], isAsc);
    }
    return 0;
  });
}

export function choiseDirection(direction): string {
  switch (direction) {
    case 'asc':
      return 'desc';
    case 'desc':
      return 'asc';
    default:
      return 'desc';
  }
}

const compare = (a: number | string, b: number | string, isAsc: boolean) =>
  (a < b ? -1 : 1) * (isAsc ? 1 : -1);
