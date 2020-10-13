import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActDetailComponent } from './act-detail.component';

describe('ActDetailComponent', () => {
  let component: ActDetailComponent;
  let fixture: ComponentFixture<ActDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
