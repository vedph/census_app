import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataEntityType, LookupItem } from '../models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-lookup-list',
  templateUrl: './lookup-list.component.html',
  styleUrls: ['./lookup-list.component.css'],
})
export class LookupListComponent implements OnInit {
  @Input()
  public entityType: DataEntityType;
  @Input()
  public limit: number;

  @Output()
  public itemsChange: EventEmitter<LookupItem[]>;

  public form: FormGroup;
  public lookup: FormControl;
  public items$: Observable<LookupItem[]>;
  public pickedItems: LookupItem[];

  constructor(formBuilder: FormBuilder, private _apiService: ApiService) {
    // events
    this.itemsChange = new EventEmitter<LookupItem[]>();
    // form
    this.lookup = formBuilder.control(null);
    this.form = formBuilder.group({
      lookup: this.lookup,
    });
    this.pickedItems = [];
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

  public pickItem(item: LookupItem): void {
    if (!this.pickedItems.find((i) => i.id === item.id)) {
      this.pickedItems.push(item);
    }
    this.lookup.setValue(null);
    this.itemsChange.emit(this.pickedItems);
  }

  public removeItem(index: number): void {
    this.pickedItems = [
      ...this.pickedItems.splice(0, index),
      ...this.pickedItems.splice(index + 1),
    ];
    this.itemsChange.emit(this.pickedItems);
  }

  public clear(): void {
    this.pickedItems = [];
    this.itemsChange.emit(this.pickedItems);
  }
}
