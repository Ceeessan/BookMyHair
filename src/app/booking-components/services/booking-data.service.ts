import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService {

  treatmentId: string | null = null;
  treatmentName: string | null = null;
  subOptionName: string | null = null;
  timeDate: string | null = null;

  setTreatment(treatmentId: string, treatmentName: string, subOptionName: string) {
    this.treatmentId = treatmentId;
    this.treatmentName = treatmentName;
    this.subOptionName = subOptionName;

    console.log('treatment chosen ', treatmentId, treatmentName, subOptionName);
  }

  getTreatmentId(): string | null {
    return this.treatmentId;
  }

  getTreatmentName(): string | null {
    return this.treatmentName;
  }

  getSubOptionName(): string | null {
    return this.subOptionName;
  }

  setTimeDate(dateTime: string) {
    this.timeDate = dateTime;
    console.log('date and time chosen', dateTime);
  }

  getTimeDate(): string | null {
    return this.timeDate;
  }

  clear() {
    this.treatmentId = null;
    this.treatmentName = null;
    this.timeDate = null;
  }
}