import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTimeOption } from '../../models/date-time.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  private apiUrl = 'https://bookmyhair-backend.onrender.com/api/dateTime';


  constructor( private http: HttpClient) { }

  getAvailableTimes(): Observable<DateTimeOption[]> {
    return this.http.get<DateTimeOption[]>(this.apiUrl)
  }
}
