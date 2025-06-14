import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreatmentOption } from '../../models/treatment-option.model';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private apiUrl = "http://localhost:5000/api/treatments";

  constructor(private http: HttpClient) { }

  getTreatments(): Observable<TreatmentOption[]> {
    return this.http.get<TreatmentOption[]>(this.apiUrl);
  }
}
