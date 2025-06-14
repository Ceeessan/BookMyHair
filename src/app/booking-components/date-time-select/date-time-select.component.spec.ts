import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeSelectComponent } from './date-time-select.component';

describe('DateTimeSelectComponent', () => {
  let component: DateTimeSelectComponent;
  let fixture: ComponentFixture<DateTimeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
