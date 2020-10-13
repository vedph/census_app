import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataEntityType, LookupItem } from '../models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-lookup-item',
  templateUrl: './lookup-item.component.html',
  styleUrls: ['./lookup-item.component.css']
})
export class LookupItemComponent implements OnInit {
  @Input()
  public entityType: DataEntityType;
  @Input()
  public label: string;
  @Input()
  public limit: number;

  @Output()
  public itemChange: EventEmitter<LookupItem>;

  public form: FormGroup;
  public lookup: FormControl;
  public items$: Observable<LookupItem[]>;
  public item: LookupItem;

  constructor(formBuilder: FormBuilder, private _apiService: ApiService) {
    // events
    this.itemChange = new EventEmitter<LookupItem>();
    // form
    this.lookup = formBuilder.control(null);
    this.form = formBuilder.group({
      lookup: this.lookup,
    });
    this.limit = 10;
  }

  ngOnInit(): void {
    this.items$ = this.lookup.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: LookupItem | string) => {
        if (typeof value === 'string') {
          return this._apiService.lookup(
            this.entityType,
            value,
            this.limit || 10
          );
        } else {
          return of([value]);
        }
      })
    );
  }

  public getLookupName(item: LookupItem): string {
    return item?.name;
  }

  public clear(): void {
    this.item = null;
    this.lookup.setValue(null);
    this.itemChange.emit(null);
  }

  public pickItem(item: LookupItem): void {
    this.item = item;
    this.itemChange.emit(item);
  }
}
