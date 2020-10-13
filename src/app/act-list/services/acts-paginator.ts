import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { ActsQuery } from '../state/acts.query';

// create a factory provider for the acts paginator
export const ACTS_PAGINATOR = new InjectionToken('ACTS_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    const actsQuery = inject(ActsQuery);
    return new PaginatorPlugin(actsQuery).withControls().withRange();
  }
});
