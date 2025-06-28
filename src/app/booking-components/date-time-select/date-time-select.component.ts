import { CommonModule} from '@angular/common';
import { Component, ViewChild, OnInit  } from '@angular/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateTimeService } from '../services/date-time.service';
import { DateTimeOption } from '../../models/date-time.model';


@Component({
  selector: 'app-date-time-select',
  standalone: true,
  imports: [ CommonModule, FullCalendarModule],
  templateUrl: './date-time-select.component.html',
  styleUrls: ['./date-time-select.component.scss']
})
export class DateTimeSelectComponent implements OnInit {
  @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;

  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridWeek',
    weekends: true,
    events: []
  };

  constructor( private dateTimeService: DateTimeService) {}

  ngOnInit(){
    this.dateTimeService.getAvailableTimes().subscribe((times: DateTimeOption[]) => {
      const events = this.formatEvents(times);
      this.calendarOptions = {
        ...this.calendarOptions,
        events: events
      };
    });
  }

  formatEvents(data: DateTimeOption[]): any[] {
    const events: any[] = []

    data.forEach((entry) => {
      entry.times.forEach((time) => {
        events.push({
          title: 'Ledig tid',
          start: `${entry.day}T${time}`,
          allDay: false
        })
      })
    });
    return events;
  }
}
