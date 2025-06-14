import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentSelectComponent } from './treatment-select.component';

describe('TreatmentSelectComponent', () => {
  let component: TreatmentSelectComponent;
  let fixture: ComponentFixture<TreatmentSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
