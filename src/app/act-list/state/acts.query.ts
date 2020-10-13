import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ActsState, ActsStore } from './acts.store';

@Injectable({ providedIn: 'root' })
export class ActsQuery extends QueryEntity<ActsState> {
  constructor(protected store: ActsStore) {
    super(store);
  }
}
