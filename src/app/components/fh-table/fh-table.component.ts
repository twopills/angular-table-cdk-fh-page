import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';

enum CYCLE {
  'INITIAL_SET_INPUT' = 0,
  'NG_ON_DESTROY' = 1,
}

@Component({
  selector: 'app-fh-table',
  templateUrl: './fh-table.component.html',
  styleUrls: ['./fh-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhTableComponent {
  private _destroy$ = new Subject<any>();
  private isInside = false;
  actionTable$ = new Subject<any>();
  config: any;
  hoverRow = null;
  displaySort = false;
  @Output() tableEmitter$? = this.actionTable$.asObservable().pipe(
    takeUntil(this._destroy$),
    filter((value) => !!value),
    distinctUntilChanged()
  );

  @Output() tableEmitter? = new EventEmitter<any>();

  @Input() set configTable(value: any) {
    this._emitValue({ cycleComponent: CYCLE.INITIAL_SET_INPUT });
    const { payload, displayedColumns, paginationOptions } = value;
    this.config = value;
    console.log('initial display', displayedColumns);
    this.config.displayedColumns = this._initDisplayedColumns(displayedColumns);
    this.config.dataSource = new BehaviorSubject<any>(payload);
    this.config.payload = payload;
    this.config.paginationOptions = paginationOptions;
  }

  @HostListener('click')
  clickInside() {
    this.isInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.isInside) {
      // this.config.displayedColumns = this._restoreAllDirectionToDefault(
      //   this.config.displayedColumns
      // );
      // this._updateDataSource(this.config.payload);
    }
    this.isInside = false;
  }

  identify = (_, item) => {
    return item.name;
  };

  sortElement(elem, direction) {
    this.config.displayedColumns = this._setSortingValueDataSource(
      elem,
      this.config.displayedColumns,
      direction,
      'name'
    );
    const displayedColumns = this.config.displayedColumns;
    /* FE SORTING

    this._updateDataSource(
      sortData(this.config.payload, elem.bind, {
        active: elem.name,
        direction: direction,
      })
    );*/
    this.config.activeSortElement = { elem, direction };
    const { pageSize, currentPage } = this.config.paginationOptions;
    this._emitValue({
      sortElement: { active: elem, direction, pageSize, currentPage },
      displayedColumns,
    });
  }

  private _setSortingValueDataSource(
    selectedElem: any,
    displayedColumns: Array<any>,
    direction: string,
    prop: string
  ): Array<any> {
    return displayedColumns.map((elem) =>
      elem[prop] === selectedElem[prop]
        ? { ...elem, direction }
        : { ...elem, direction: null }
    );
  }

  private _restoreAllDirectionToDefault(displayedColumns: Array<any>) {
    this._emitValue({ direction: { restoreAll: true } });
    return displayedColumns.map((elem) => {
      elem.direction = null;
      return elem;
    });
  }

  private _updateDataSource(newDataSource) {
    this._emitValue({ updateDataSource: newDataSource });
    (this.config.dataSource as BehaviorSubject<any>).next(newDataSource);
  }

  selectedCell(elem) {
    this._emitValue({ selectedCell: elem });
  }

  selectedRow(elem) {
    this._emitValue({ selectedRow: elem });
  }

  highlightElem(row) {
    this.hoverRow = row;
  }

  private _emitValue(value: any) {
    this.actionTable$.next(value);
    this.tableEmitter.emit(value);
  }

  private _initialOrder<T>(source: Array<T>, property: string): Array<T> {
    this._emitValue({ source, property });
    return source.sort((one: T, two: T) =>
      one[property] > two[property] ? 1 : -1
    );
  }

  private _initDisplayedColumns(displayedColumns): Array<any> {
    const _addDirectionProperty = (
      displayedColumns,
      property: string,
      initialValue: any
    ) => displayedColumns.map((e) => (e = { ...e, [property]: initialValue }));
    const existProperty = (v: Array<any>, prop) => v.every((e) => e[prop]);
    displayedColumns = existProperty(displayedColumns, 'direction')
      ? _addDirectionProperty(displayedColumns, 'direction', null)
      : displayedColumns;
    displayedColumns = existProperty(displayedColumns, 'iconIsVisible')
      ? _addDirectionProperty(displayedColumns, 'iconIsVisible', false)
      : displayedColumns;
    displayedColumns = this._initialOrder(displayedColumns, 'order');
    console.log('situa init displayedColumns ', displayedColumns);
    return displayedColumns;
  }

  takeEventFromPaginator(event) {
    const { pageSize } = event;
    this.config.paginationOptions = {
      ...this.config.paginationOptions,
      pageSize,
    };
    const sortElement = this.config.activeSortElement;
    console.log('pagi: ', event);
    this._emitValue({
      pagination: event,
      sortElement,
    });
  }

  arrowSortIconStyle(dcElem, type?: any) {
    if (type == 'opacity') {
      switch (dcElem) {
        case true:
          return '100';
        case false:
          return '0';
        case null:
          return '0';
      }
    }
    if (type == 'color') {
      switch (dcElem) {
        case 'asc':
          return 'red';
        case 'desc':
          return 'blue';
      }
    }
    //console.log('qui come siamo messi?: ', this.config.displayedColumns)
  }

  ngOnDestroy() {
    this._destroy$.complete();
    this._emitValue({ cycleComponent: CYCLE.NG_ON_DESTROY });
  }
}
