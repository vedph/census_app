import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ActInfo } from 'src/app/models';

export interface ActsState extends EntityState<ActInfo, number> {}

const initialState = {};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'acts' })
export class ActsStore extends EntityStore<ActsState> {
  constructor() {
    super(initialState);
  }
}
