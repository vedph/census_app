import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupItemComponent } from './lookup-item.component';

describe('LookupItemComponent', () => {
  let component: LookupItemComponent;
  let fixture: ComponentFixture<LookupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
