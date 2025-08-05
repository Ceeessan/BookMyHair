import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CancelAppointmentService } from '../booking-components/services/cancel-appointment.service';

@Component({
  selector: 'app-cancel-appointment',
  imports: [],
  templateUrl: './cancel-appointment.component.html',
  styleUrl: './cancel-appointment.component.scss'
})
export class CancelAppointmentComponent implements OnInit {
  message: string ='';
  isLoading: boolean = true;
  showInfoMessage: boolean = false;
  isCancelled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cancelService: CancelAppointmentService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    const email = this.route.snapshot.queryParamMap.get('email');

    if( !token || !email ) {
      this.message= 'Ogiltlig avbokningslänk.';
      this.isLoading = false;
      this.showInfoMessage = true
      return;
    }

    this.cancelService.cancelBooking(token, email).subscribe({
      next: (response) => {
        console.log('Avbokning lyckades, svar:', response);
        this.isCancelled = true;
        this.message = response.message;
        this.isLoading = false;
        this.showInfoMessage = false;
      },
      error: (err) => {
        console.error(err);
        this.isCancelled = false;
        this.message = err.error?.error || 'Avbokningen misslyckades.';
        this.isLoading = false;
        this.showInfoMessage = false;
      }
    })
  }

  showInfo() {
    this.isLoading = false;
    this.showInfoMessage = true;
  }
}
