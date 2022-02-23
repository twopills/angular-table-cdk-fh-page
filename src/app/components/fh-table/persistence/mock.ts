export const PERFECT_DATA = {
  displayedColumns: [
    {
      name: 'No.',
      order: 1,
      sorting: true,
      type: 'number',
      bind: 'position',
    },
    {
      name: 'Name',
      order: 2,
      sorting: true,
      type: 'text',
      bind: 'name',
    },
    {
      name: 'Weight',
      order: 3,
      sorting: true,
      type: 'number',
      bind: 'weight',
    },
    {
      name: 'Symbol',
      order: 4,
      sorting: false,
      type: 'text',
      bind: 'symbol',
    },
  ],
  payload: [
    { position: 1, name: '', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 20, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 2, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 3, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 4, symbol: 'Ne' },
  ],
  paginationOptions: {
    currentPage: 1,
    length: 40,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 25, 40],
  },
};

export const displayedColumns = [
  {
    name: 'Id',
    order: 1,
    sorting: true,
    type: 'number',
    bind: 'id',
  },
  {
    name: 'User Id',
    order: 2,
    sorting: true,
    type: 'text',
    bind: 'userId',
  },
  {
    name: 'Title',
    order: 3,
    sorting: true,
    type: 'number',
    bind: 'title',
  },
  {
    name: 'Body',
    order: 4,
    sorting: false,
    type: 'text',
    bind: 'body',
  },
];

export const paginationOptions = {
  currentPage: 1,
  length: 40,
  pageSize: 10,
  pageSizeOptions: [5, 10, 20, 25, 40],
};
