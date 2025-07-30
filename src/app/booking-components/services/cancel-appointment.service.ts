import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancelAppointmentService  {

    // private apiUrl = 'https://bookmyhair-backend.onrender.com/api/booking/cancel';

    private apiUrl = 'http://localhost:5000/api/booking/cancel';

  constructor(private http: HttpClient) { }

  cancelBooking( token: string, email: string): Observable<any> {
    const url = `${this.apiUrl}?token=${token}&email=${email}`;
    return this.http.delete(url);
  }
}
