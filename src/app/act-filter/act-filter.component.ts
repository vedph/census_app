import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { from, observable, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataEntityType, LookupItem } from '../models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-act-filter',
  templateUrl: './act-filter.component.html',
  styleUrls: ['./act-filter.component.css'],
})
export class ActFilterComponent implements OnInit {
  public partners$: Observable<LookupItem[]>;

  public form: FormGroup;
  public partner: FormControl;

  public partners: LookupItem[];

  constructor(formBuilder: FormBuilder, private _apiService: ApiService) {
    this.partner = formBuilder.control(null);
    this.form = formBuilder.group({
      partner: this.partner,
    });

    this.partners$ = this.partner.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: LookupItem | string) => {
        if (typeof value === 'string') {
          return this._apiService.lookup(DataEntityType.partner, value, 10);
        } else {
          return of([value]);
        }
      })
    );
    this.partners = [];
  }

  ngOnInit(): void {}

  public getLookupName(item: LookupItem): string {
    return item?.name;
  }

  public addToPartners(partner: LookupItem): void {
    if (!this.partners.find((p) => p.id === partner.id)) {
      this.partners.push(partner);
    }
    this.partner.setValue(null);
  }

  public removePartner(index: number): void {
    this.partners = this.partners.splice(index, 1);
  }

  public apply(): void {
    // TODO
  }
}
