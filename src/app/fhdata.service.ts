import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  displayedColumns,
  paginationOptions,
} from './components/fh-table/persistence/mock';
import { PageOperation } from './structures';

@Injectable()
export class FHDataService {
  constructor(private _httpClient: HttpClient) {}

  getData(elem?: string, _displayedColumns?: any): Observable<any> {
    // FIXME: _displayedColumns serve solo per trasformare la risposta be in quanto non ho un servizio apposito
    return this._httpClient
      .get(`https://jsonplaceholder.typicode.com/posts${elem ? elem : ''}`, {
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          response.body.map((v) => (v.body = v.body.substring(0, 10)));
          return response;
        }),
        map(
          (response) =>
            (response = {
              payload: response.body,
              displayedColumns: _displayedColumns
                ? _displayedColumns
                : displayedColumns,
              paginationOptions: {
                ...paginationOptions,
                length: parseInt(response.headers.get('x-total-count')),
              },
            })
        )
      );
  }
}
