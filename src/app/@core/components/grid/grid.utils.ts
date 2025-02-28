import { IFilter, IPaginator, ISorting, SortDirection } from '.';

const prepareComparison = (value: any) =>
  ((value === undefined || value === null ? '' : value) as string)
    .toString()
    .toLocaleLowerCase();

const getPropertyFromKey = <T>(keys: string, obj: T) => {
  const arrayKeys = keys.split('.');
  let value = obj;

  for (const key of arrayKeys) {
    value = value[key];
    if (!value) {
      break;
    }
  }

  return value;
};

export const sortItems = (
  a,
  b,
  sortColumn: string,
  sortDirection: SortDirection
) => {
  let compareResult: number;

  const aValue = getPropertyFromKey(sortColumn, a);
  const bValue = getPropertyFromKey(sortColumn, b);

  if (
    (typeof aValue === 'number' && !isNaN(aValue)) ||
    (typeof bValue === 'number' && !isNaN(bValue))
  ) {
    compareResult = Number(aValue) - Number(bValue);
  } else {
    const atxt: string = prepareComparison(aValue);
    const btxt: string = prepareComparison(bValue);

    compareResult = atxt.localeCompare(btxt);
  }

  return sortDirection === SortDirection.ASC ? compareResult : -compareResult;
};

export const sortAndFilterItems = <T>(
  items: T[],
  sortAndPaginator: ISorting<T> & IPaginator,
  filters: IFilter,
  especialFilters: { [key: string]: (item: T, filter: string) => boolean } = {}
) => {
  items = items.filter((item) => {
    let matches = true;

    for (const key of Object.keys(filters)) {
      if (key.indexOf('.DateDe') >= 0) {
        const originalKey = key.replace('.DateDe', '');
        const filterDate = filters[key].substring(0, 10);
        matches = filterDate.localeCompare(item[originalKey]) <= 0;
      } else if (key.indexOf('.DateAte') >= 0) {
        const originalKey = key.replace('.DateAte', '');
        const filterDate = filters[key].substring(0, 10);
        matches = filterDate.localeCompare(item[originalKey]) >= 0;
      } else if (especialFilters[key]) {
        matches = especialFilters[key](item, filters[key]);
      } else {
        const exactly = key.endsWith('.Exact');
        const originalKey = key.replace('.Exact', '');
        const value = getPropertyFromKey(originalKey, item);
        const source = prepareComparison(value);
        const target = prepareComparison(filters[key]);

        if (source.indexOf(target) < 0 || (source !== target && exactly)) {
          matches = false;
        }
      }
      if (!matches) {
        break;
      }
    }

    return matches;
  });

  items.sort((a, b) =>
    sortItems(
      a,
      b,
      sortAndPaginator.SortColumn as string,
      sortAndPaginator.SortDirection
    )
  );

  return items;
};

export const paginateItems = <T>(
  items: T[],
  sortAndPaginator: ISorting<T> & IPaginator
) => ({
  Items: sortAndPaginator.PageSize
    ? items.slice(
        (sortAndPaginator.Page - 1) * sortAndPaginator.PageSize,
        sortAndPaginator.Page * sortAndPaginator.PageSize
      )
    : items,
  Total: items.length,
});

export const sortFilterAndPaginateItems = <T>(
  items: T[],
  sortAndPaginator: ISorting<T> & IPaginator,
  filters: IFilter
) => {
  items = sortAndFilterItems(items, sortAndPaginator, filters);

  return paginateItems(items, sortAndPaginator);
};
