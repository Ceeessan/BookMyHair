import { Component, ViewChild } from '@angular/core';
import { TreatmentSelectComponent } from '../booking-components/treatment-select/treatment-select.component';
import { DateTimeSelectComponent } from '../booking-components/date-time-select/date-time-select.component';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [TreatmentSelectComponent, DateTimeSelectComponent, CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  animations: [
    trigger('slideLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ],
})
export class BookingComponent {
  currentStep: 'treatment' | 'dateTime' | 'finnishBooking' = 'treatment';

  @ViewChild(DateTimeSelectComponent)
  dateTimeComponent!: DateTimeSelectComponent;

  goToDateTime() {
    this.currentStep = 'dateTime';
    setTimeout(() => {
      this.dateTimeComponent?.calendarComponent?.getApi().updateSize();
    }, 50)
  }

}
