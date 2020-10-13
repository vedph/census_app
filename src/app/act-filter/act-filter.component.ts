import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LookupItem } from '../models';

@Component({
  selector: 'app-act-filter',
  templateUrl: './act-filter.component.html',
  styleUrls: ['./act-filter.component.css'],
})
export class ActFilterComponent implements OnInit {
  public partners$: Observable<LookupItem[]>;

  public form: FormGroup;

  public family: LookupItem;
  public company: LookupItem;
  public place: LookupItem;
  public book: LookupItem;
  public categories: LookupItem[];
  public partners: LookupItem[];
  public professions: LookupItem[];

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
  }

  public onFamilyChange(item: LookupItem): void {
    this.family = item;
  }

  public onCompanyChange(item: LookupItem): void {
    this.company = item;
  }

  public onPlaceChange(item: LookupItem): void {
    this.place = item;
  }

  public onBookChange(item: LookupItem): void {
    this.book = item;
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
