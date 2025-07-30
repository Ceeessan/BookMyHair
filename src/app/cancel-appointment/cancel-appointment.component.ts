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
      return;
    }

    this.cancelService.cancelBooking(token, email).subscribe({
      next: () => {
        this.message = `Din bokning har avbokats!`;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.message = `Avbokningen misslyckades. Bokningen kan vara ogiltlig eller avbokad.`;
        this.isLoading = false;
      }
    })

  }

}
