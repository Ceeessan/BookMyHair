import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-finnish-booking',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './finnish-booking.component.html',
  styleUrl: './finnish-booking.component.scss'
})
export class FinnishBookingComponent {

  bookTime() {
    
  }

}
