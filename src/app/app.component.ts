import { Component } from '@angular/core';
import { delay, Observable, of, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { PERFECT_DATA } from './components/fh-table/persistence/mock';
import { FHDataService } from './fhdata.service';
import { PayloadConfig } from './structures';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  elem: Observable<any> = of(PERFECT_DATA).pipe(delay(0));
  private _destroy$ = new Subject();
  receiverTableEmitter$ = new Subject();
  config: any;

  constructor(private _fhService: FHDataService) {}

  ngOnInit() {
    this._callServiceAndSetConfig('?_page=1&_limit=10');
    this._manipulateTableEmitter();
  }

  private _manipulateTableEmitter() {
    this.receiverTableEmitter$
      .pipe(
        takeUntil(this._destroy$),
        tap((e: any) => {
          if (e?.pagination) this._manipulatePagination(e);
          if (e?.sortElement) this._manipulateSorting(e);
          if (e?.selectedCell) console.log(e);
          if (e?.selectedRow) console.log(e);
        })
      )
      .subscribe();
  }

  private _manipulateSorting({ sortElement, displayedColumns }) {
    console.log('Sorting: ', sortElement, displayedColumns); 
    this._callServiceAndSetConfig(
      `?_page=${sortElement.currentPage}&_limit=${sortElement.pageSize}&_sort=${sortElement.active.bind}&_order=${sortElement.direction}`,
      displayedColumns
    );
  }

  private _manipulatePagination({ pagination, sortElement }) {
    console.log('Pagination: ', pagination, 'sorting: ', sortElement);
    this._callServiceAndSetConfig(
      `?_page=${pagination.pageIndex + 1}&_limit=${pagination.pageSize}&_sort=${
        sortElement?.active.bind
      }&_order=${sortElement?.direction}`
    );
  }

  receiverOutput($event) {
    // console.log($event);
  }

  private _callServiceAndSetConfig(data: any, displayedColumns?: any) {
    this._fhService
      .getData(data, displayedColumns)
      .pipe(
        takeUntil(this._destroy$),
        tap((config: PayloadConfig) => {
          this.config = config;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._destroy$.complete();
  }
}
