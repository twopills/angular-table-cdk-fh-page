export interface PayloadConfig {
  payload: {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }[];
  displayedColumns: DisplayedColumns[];
}

export interface IConfigTable {
  displayedColumns: DisplayedColumns[];
  dataSource: any;
  payload: any;
}

export interface DisplayedColumns {
  name: string;
  sorting: boolean;
  type: 'text' | 'number' | 'date';
  order: number;
  bind?: string;
}

export interface Sort {
  /** The id of the column being sorted. */
  active: string;
  /** The sort direction. */
  direction: SortDirection;
}

export declare type SortDirection = 'asc' | 'desc' | '';

export enum PageOperation {
  PAGE = '?_page',
}
