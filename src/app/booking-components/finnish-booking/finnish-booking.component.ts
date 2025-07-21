import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { BookingDataService } from '../services/booking-data.service';
import { BookingService } from '../services/booking.service';
import { BookingOption } from '../../models/booking.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArrowButtonComponent } from '../../components/arrow-button/arrow-button.component';

@Component({
  selector: 'app-finnish-booking',
  standalone: true,
  imports: [ButtonComponent, FormsModule, CommonModule, ArrowButtonComponent],
  templateUrl: './finnish-booking.component.html',
  styleUrls: ['./finnish-booking.component.scss']
})
export class FinnishBookingComponent implements OnInit {

@Output() backStep = new EventEmitter<void>();

name ='';
email ='';
message ='';

selectedTreatmentId: string | null = null;
selectedTreatmentName: string | null = null;
subOptionName: string | null = null;
selectedDateTime: string | null = null;

successMessage ='';
errorMessage ='';

constructor(
  private bookingDataService: BookingDataService,
  private bookingService: BookingService,
){}

ngOnInit(): void {
  this.selectedTreatmentId = this.bookingDataService.getTreatmentId();
  this.selectedTreatmentName = this.bookingDataService.getTreatmentName();
  this.subOptionName = this.bookingDataService.getSubOptionName();
  this.selectedDateTime = this.bookingDataService.getTimeDate();
}

goBack() {
  this.backStep.emit();
}

submitBooking(): void {
  if (!this.selectedTreatmentId || !this.selectedDateTime || !this.name || !this.email) {
    this.errorMessage = 'Vänligen fyll i alla obligtoriska fält.';

    console.log('book');
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
      this.successMessage = 'Du har bokat din tid, välkommen!';
      this.errorMessage= '';
      console.log('Booking saved', res);
    },
    error: (err) => {
      this.errorMessage = 'Något gick fel. Försök igen.';
      this.successMessage= '';
      console.log(err);
    }
  });
  }
}