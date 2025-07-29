import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {

  private treatmentIdSubject = new BehaviorSubject<string | null>(null);
  private treatmentNameSubject = new BehaviorSubject<string | null>(null);
  private subOptionNameSubject = new BehaviorSubject<string | null>(null);
  private timeDateSubject = new BehaviorSubject<string | null>(null);

  setTreatment(treatmentId: string, treatmentName: string, subOptionName: string) {
    this.treatmentIdSubject.next(treatmentId);
    this.treatmentNameSubject.next(treatmentName);
    this.subOptionNameSubject.next(subOptionName);

    console.log('treatment chosen ', treatmentId, treatmentName, subOptionName);
  }

  getTreatmentId(): Observable<string | null> {
    return this.treatmentIdSubject.asObservable();
  }

  getTreatmentName(): Observable<string | null> {
    return this.treatmentNameSubject.asObservable();
  }

  getSubOptionName(): Observable<string | null> {
    return this.subOptionNameSubject.asObservable();
  }

  setTimeDate(dateTime: string) {
    this.timeDateSubject.next(dateTime);
    console.log('date and time chosen', dateTime);
  }

  getTimeDate(): Observable<string | null> {
    return this.timeDateSubject.asObservable();
  }

  clear() {
    this.treatmentIdSubject.next(null);
    this.treatmentNameSubject.next(null);
    this.timeDateSubject.next(null);
  }
}