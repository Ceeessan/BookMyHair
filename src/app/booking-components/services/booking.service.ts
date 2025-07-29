import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingOption } from '../../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  // private apiUrl = 'https://bookmyhair-backend.onrender.com/api/booking';

  private apiUrl = 'http://localhost:5000/api/booking';

  constructor( private http: HttpClient) { }

  bookAnAppointment( data: BookingOption): Observable<BookingOption> {
    console.log('Booked an appointment data:', data);

    return this.http.post<BookingOption>(this.apiUrl, data);
  }

  getBookedDates(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}