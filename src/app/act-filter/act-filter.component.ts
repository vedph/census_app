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

  public categories: LookupItem[];
  public partners: LookupItem[];
  public professions: LookupItem[];

  constructor(formBuilder: FormBuilder, private _apiService: ApiService) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
  }

  public onCategoriesChange(items: LookupItem[]): void {
    this.categories = items;
  }

  public onPartnersChange(items: LookupItem[]): void {
    this.partners = items;
  }

  public onProfessionsChange(items: LookupItem[]): void {
    this.professions = items;
  }

  public apply(): void {
    // TODO
  }
}
