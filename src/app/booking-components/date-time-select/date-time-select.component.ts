import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-date-time-select',
  standalone: true,
  imports: [ CommonModule, FullCalendarModule],
  templateUrl: './date-time-select.component.html',
  styleUrl: './date-time-select.component.scss'
})
export class DateTimeSelectComponent {
  calendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridWeek',
    weekends: true
  };
}
