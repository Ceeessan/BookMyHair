import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreatmentService } from '../services/treatment.service';
import { TreatmentOption } from '../../models/treatment-option.model';
import { ButtonComponent } from '../../components/button/button.component';
import { BookingDataService } from '../services/booking-data.service';

@Component({
  selector: 'app-treatment-select',
  standalone: true,
  imports: [ FormsModule, CommonModule, ButtonComponent ],
  animations: [
    trigger('expandCollapse', [
      state('void', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('*', style({
        height: '*',
        opacity: 1,
        overflow: 'hidden'
      })),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('250ms ease-out')
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ height: '0', opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './treatment-select.component.html',
  styleUrls: ['./treatment-select.component.scss']
})

export class TreatmentSelectComponent {

  @Output() nextStep = new EventEmitter<void>();

  selectedTreatment: string | null = null;
  selectedSubOption: {name:string; time: string; cost: number} | null = null;

  constructor(
    private treatmentService: TreatmentService,
    private bookingDataService: BookingDataService
  ){}

  treatments: TreatmentOption[] = [];

  ngOnInit() {
    this.treatmentService.getTreatments().subscribe({next: data => {
      console.log(data);
      this.treatments = data},
      error: err => console.log("API error", err)
    })
  }  

  get selectedSubOptions() {
    return this.treatments.find(t => t.name === this.selectedTreatment)?.subOptions || [];
  }

  onTreatmentChange(treatmentName: string) {
    if (this.selectedTreatment === treatmentName) {
      this.selectedTreatment = null;
    } else {
      this.selectedTreatment = treatmentName;
    }
  }

  selectTreatmentBtn(option: {
    name:string; 
    time:string; 
    cost:number},
    event: MouseEvent){
      event.stopPropagation();
      this.selectedSubOption = option;
      console.log('Vald subOption, ', option);

      const selectedTreatment = this.treatments.find(t => t.name === this.selectedTreatment);
      if (selectedTreatment) {
        this.bookingDataService.setTreatment(selectedTreatment._id, selectedTreatment.name, option.name)
      }
  }

  goToDateTime() {
    if (!this.selectedSubOption) return;
    
    console.log('Going to date and time!');
    this.nextStep.emit();
  }
}