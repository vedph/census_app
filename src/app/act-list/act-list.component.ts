import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { ActFilter, ActInfo, DataPage } from '../models';
import { ApiService } from '../services/api.service';
import { ACTS_PAGINATOR } from './services/acts-paginator';
import { ActsState } from './state/acts.store';

@Component({
  selector: 'app-act-list',
  templateUrl: './act-list.component.html',
  styleUrls: ['./act-list.component.css'],
})
export class ActListComponent implements OnInit {
  public pagination$: Observable<PaginationResponse<ActInfo>>;
  public pageSize: FormControl;
  private _filter$: BehaviorSubject<ActFilter>;
  private _refresh$: BehaviorSubject<number>;

  constructor(
    @Inject(ACTS_PAGINATOR) public paginator: PaginatorPlugin<ActsState>,
    private _router: Router,
    private _apiService: ApiService,
    formBuilder: FormBuilder
  ) {
    this.pageSize = formBuilder.control(20);
  }

  private getRequest(
    filter: ActFilter
  ): () => Observable<PaginationResponse<ActInfo>> {
    return () =>
      this._apiService.getActs(filter).pipe(
        // adapt server results to the paginator plugin
        map((p: DataPage<ActInfo>) => {
          return {
            currentPage: p.pageNumber,
            perPage: p.pageSize,
            lastPage: p.pageCount,
            data: p.items,
            total: p.total,
          };
        })
      );
  }

  public onFilterChange(filter: ActFilter): void {
    this._filter$.next(filter);
  }

  ngOnInit(): void {
    // refresh
    this._refresh$ = new BehaviorSubject<number>(0);
    // filter
    const initialPageSize = 20;
    this._filter$ = new BehaviorSubject<ActFilter>(
      this.paginator.metadata.get('filter') || {
        pageNumber: 1,
        pageSize: initialPageSize,
      }
    );
    this.pageSize.setValue(initialPageSize);

    // combine and get latest:
    // -page number changes from paginator
    // -page size changes from control
    // -filter changes from filter (in this case, clearing the cache)
    // -refresh request (in this case, clearing the cache)
    this.pagination$ = combineLatest([
      this.paginator.pageChanges,
      this.pageSize.valueChanges.pipe(
        // we are required to emit at least the initial value
        // as combineLatest emits only if ALL observables have emitted
        startWith(initialPageSize),
        // clear the cache when page size changes
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
      this._filter$.pipe(
        // clear the cache when filters changed
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
      this._refresh$.pipe(
        // clear the cache when forcing refresh
        tap((_) => {
          this.paginator.clearCache();
        })
      ),
    ]).pipe(
      // for each emitted value, combine into a filter and use it
      // to request the page from server
      switchMap(([pageNumber, pageSize, filter, refresh]) => {
        filter.pageNumber = pageNumber;
        filter.pageSize = pageSize;
        const request = this.getRequest(filter);
        // update saved filters
        this.paginator.metadata.set('filter', filter);
        return this.paginator.getPage(request);
      })
    );
  }

  public pageChanged(event: PageEvent): void {
    // https://material.angular.io/components/paginator/api
    this.paginator.setPage(event.pageIndex + 1);
    if (event.pageSize !== this.pageSize.value) {
      this.pageSize.setValue(event.pageSize);
    }
  }

  public viewAct(act: ActInfo): void {
    this._router.navigate(['/acts', act.id]);
  }
}
