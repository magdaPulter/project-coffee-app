import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { QueryParamsQueryModel } from '../querymodels/query-params.querymodel';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  getQueryParams(): Observable<Params> {
    return this._activatedRoute.queryParams.pipe(shareReplay(1));
  }

  getQueryParamsValues(): Observable<QueryParamsQueryModel> {
    return this.getQueryParams().pipe(
      map((queryParams) => {
        return {
          category: queryParams['category'],
          price: queryParams['price'],
          discount: queryParams['discount'],
          published: queryParams['published'],
        };
      }),
      map((values) => {
        return {
          category: values.category,
          price: +values.price,
          discount: values.discount === 'true' ? true : false,
          published: values.published === 'true' ? true : false,
        };
      })
    );
  }
  constructor(private _activatedRoute: ActivatedRoute) {}
}
