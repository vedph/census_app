import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Act,
  ActFilter,
  ActInfo,
  DataEntityType,
  DataPage,
  LookupItem,
} from '../models';
import { EnvService } from './env.service';
import { ErrorService } from './error.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private _http: HttpClient,
    private _error: ErrorService,
    private _env: EnvService
  ) {}

  public getActs(filter: ActFilter): Observable<DataPage<ActInfo>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', filter.pageNumber.toString());
    httpParams = httpParams.set('pageSize', filter.pageSize.toString());

    if (filter.archiveId) {
      httpParams = httpParams.set('archiveId', filter.archiveId.toString());
    }
    if (filter.bookId) {
      httpParams = httpParams.set('bookId', filter.bookId.toString());
    }
    if (filter.bookYearMin) {
      httpParams = httpParams.set('bookYearMin', filter.bookYearMin.toString());
    }
    if (filter.bookYearMax) {
      httpParams = httpParams.set('bookYearMax', filter.bookYearMax.toString());
    }
    if (filter.description) {
      httpParams = httpParams.set('description', filter.description);
    }
    if (filter.actTypeId) {
      httpParams = httpParams.set('actTypeId', filter.actTypeId.toString());
    }
    if (filter.familyId) {
      httpParams = httpParams.set('familyId', filter.familyId.toString());
    }
    if (filter.companyId) {
      httpParams = httpParams.set('companyId', filter.companyId.toString());
    }
    if (filter.placeId) {
      httpParams = httpParams.set('placeId', filter.placeId.toString());
    }
    if (filter.label) {
      httpParams = httpParams.set('label', filter.label);
    }
    if (filter.categoryIds) {
      httpParams = httpParams.set('categoryIds', filter.categoryIds.join(','));
    }
    if (filter.professionIds) {
      httpParams = httpParams.set(
        'professionIds',
        filter.categoryIds.join(',')
      );
    }
    if (filter.partnerIds) {
      httpParams = httpParams.set('partnerIds', filter.partnerIds.join(','));
    }

    return this._http
      .get<DataPage<ActInfo>>(`${this._env.apiUrl}acts`, {
        params: httpParams,
      })
      .pipe(retry(3), catchError(this._error.handleError));
  }

  public getAct(id: number): Observable<Act> {
    return this._http
      .get<Act>(`${this._env.apiUrl}acts/${id}`)
      .pipe(retry(3), catchError(this._error.handleError));
  }

  public lookup(
    type: DataEntityType,
    filter: string,
    limit: number
  ): Observable<LookupItem[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('tableId', type.toString());
    httpParams = httpParams.set('limit', limit.toString());
    if (filter) {
      httpParams = httpParams.set('filter', filter);
    }

    return this._http
      .get<LookupItem[]>(`${this._env.apiUrl}lookup`, {
        params: httpParams,
      })
      .pipe(retry(3), catchError(this._error.handleError));
  }
}
