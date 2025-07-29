import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { BookingDataService } from '../services/booking-data.service';
import { BookingService } from '../services/booking.service';
import { BookingOption } from '../../models/booking.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArrowButtonComponent } from '../../components/arrow-button/arrow-button.component';
import { filter, take } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-finnish-booking',
  standalone: true,
  imports: [ButtonComponent, FormsModule, CommonModule, ArrowButtonComponent],
  templateUrl: './finnish-booking.component.html',
  styleUrls: ['./finnish-booking.component.scss']
})
export class FinnishBookingComponent implements OnInit {

@Output() nextStep = new EventEmitter<any>();
@Output() backStep = new EventEmitter<void>();

name ='';
email ='';
message ='';

selectedTreatmentId: string | null = null;
selectedTreatmentName: string | null = null;
subOptionName: string | null = null;
selectedDateTime: string | null = null;
bookingConfirmation: string | null = null;
errorMessage ='';

constructor(
  private bookingDataService: BookingDataService,
  private bookingService: BookingService,
  private cdr: ChangeDetectorRef
){}

ngOnInit(): void {
  this.bookingDataService.getTreatmentId()
  .pipe(
    filter((id): id is string => id !== null), // vänta tills det finns
    take(1)
  )
  .subscribe(id => this.selectedTreatmentId = id);

this.bookingDataService.getTreatmentName()
  .pipe(
    filter((name): name is string => name !== null),
    take(1)
  )
  .subscribe(name => this.selectedTreatmentName = name);

this.bookingDataService.getSubOptionName()
  .pipe(
    filter((sub): sub is string => sub !== null),
    take(1)
  )
  .subscribe(sub => this.subOptionName = sub);

this.bookingDataService.getTimeDate()
  .pipe(
    filter((time): time is string => time !== null),
    take(1)
  )
  .subscribe(time => this.selectedDateTime = time);
}

goBack() {
  this.backStep.emit();
}

submitBooking(): void {
  if (!this.selectedTreatmentId || !this.selectedDateTime || !this.name || !this.email) {
    this.errorMessage = 'Vänligen fyll i alla obligtoriska fält.';
    return;
  }

  const booking: BookingOption = {
    treatment: this.selectedTreatmentId!,
    dateTime: this.selectedDateTime!,
    customerName: this.name,
    customerEmail: this.email,
    message: this.message || ''
  };

  this.bookingService.bookAnAppointment(booking).subscribe({
    next: (res) => {
      this.errorMessage= '';
      console.log('Booking saved ', res);
      this.goToBookingConfirmation();
    },
    error: (err) => {
      this.errorMessage = 'Något gick fel. Försök igen.';
      console.log(err);
    }
  });
  }

  goToBookingConfirmation(){
    this.nextStep.emit();
  }
}