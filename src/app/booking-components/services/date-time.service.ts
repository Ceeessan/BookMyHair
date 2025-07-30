import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTimeOption } from '../../models/date-time.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  private apiUrl = 'https://bookmyhair-backend.onrender.com/api/dateTime';
  // private apiUrl = 'http://localhost:5000/api/dateTime';

  constructor( private http: HttpClient) { }

  getAvailableTimes(): Observable<DateTimeOption[]> {
    console.log('Hämtar tider från API med URL:', this.apiUrl);

    return this.http.get<DateTimeOption[]>(this.apiUrl)
  }
}