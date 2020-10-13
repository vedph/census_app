import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActFilter, DataEntityType, LookupItem } from '../models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-act-filter',
  templateUrl: './act-filter.component.html',
  styleUrls: ['./act-filter.component.css'],
})
export class ActFilterComponent implements OnInit {
  public partners$: Observable<LookupItem[]>;

  public form: FormGroup;
  public label: FormControl;
  public yearMin: FormControl;
  public yearMax: FormControl;
  public description: FormControl;
  public archive: FormControl;

  public family: LookupItem;
  public company: LookupItem;
  public place: LookupItem;
  public book: LookupItem;
  public categories: LookupItem[];
  public partners: LookupItem[];
  public professions: LookupItem[];

  public archives$: Observable<LookupItem[]>;

  @Output()
  public filterChange: EventEmitter<ActFilter>;

  constructor(formBuilder: FormBuilder, private _apiService: ApiService) {
    // event
    this.filterChange = new EventEmitter<ActFilter>();
    // form
    this.label = formBuilder.control(null);
    this.yearMin = formBuilder.control(0);
    this.yearMax = formBuilder.control(0);
    this.description = formBuilder.control(null);
    this.archive = formBuilder.control(0);
    this.form = formBuilder.group({
      label: this.label,
      yearMin: this.yearMin,
      yearMax: this.yearMax,
      description: this.description,
      archive: this.archive
    });
  }

  ngOnInit(): void {
    this.archives$ = this._apiService.lookup(DataEntityType.archive, null, 0);
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
    const filter: ActFilter = {
      pageNumber: 0,
      pageSize: 0,
      familyId: this.family?.id,
      companyId: this.company?.id,
      placeId: this.place?.id,
      label: this.label.value,
      archiveId: this.archive.value,
      bookId: this.book?.id,
      bookYearMin: this.yearMin.value,
      bookYearMax: this.yearMax.value,
      description: this.description.value,
      categoryIds: this.categories?.map(c => c.id),
      professionIds: this.professions?.map(c => c.id),
      partnerIds: this.partners?.map(c => c.id)
    };
    this.filterChange.emit(filter);
  }
}
