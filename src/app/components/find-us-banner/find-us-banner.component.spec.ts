import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindUsBannerComponent } from './find-us-banner.component';

describe('FindUsBannerComponent', () => {
  let component: FindUsBannerComponent;
  let fixture: ComponentFixture<FindUsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindUsBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindUsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
