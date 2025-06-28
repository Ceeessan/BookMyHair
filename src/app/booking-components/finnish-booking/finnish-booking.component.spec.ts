import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinnishBookingComponent } from './finnish-booking.component';

describe('FinnishBookingComponent', () => {
  let component: FinnishBookingComponent;
  let fixture: ComponentFixture<FinnishBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinnishBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinnishBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
