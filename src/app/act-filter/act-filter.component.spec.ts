import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActFilterComponent } from './act-filter.component';

describe('ActFilterComponent', () => {
  let component: ActFilterComponent;
  let fixture: ComponentFixture<ActFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
