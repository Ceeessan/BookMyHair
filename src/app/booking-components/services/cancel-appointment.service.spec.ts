import { TestBed } from '@angular/core/testing';

import { CancelAppointmentService } from './cancel-appointment.service';

describe('CancelAppointmentService', () => {
  let service: CancelAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
