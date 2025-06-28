import { CommonModule} from '@angular/common';
import { Component, ViewChild, OnInit, Output,EventEmitter  } from '@angular/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateTimeService } from '../services/date-time.service';
import { DateTimeOption } from '../../models/date-time.model';
import { ButtonComponent } from '../../components/button/button.component';
import svLocale from '@fullcalendar/core/locales/sv';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-date-time-select',
  standalone: true,
  imports: [ CommonModule, FullCalendarModule, ButtonComponent],
  templateUrl: './date-time-select.component.html',
  styleUrls: ['./date-time-select.component.scss']
})

export class DateTimeSelectComponent implements OnInit {
  @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;

  selectedDate: string | null = null;
  selectedTimes: string[] = [];
  allAvailableTimes: DateTimeOption[] = [];
  isLoaded = false;

  @Output() nextStep = new EventEmitter<any>();

  calendarOptions!: CalendarOptions;

  constructor( private dateTimeService: DateTimeService) {}

  ngOnInit() {

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridWeek'
    }

    this.dateTimeService.getAvailableTimes().subscribe((times) => {

      console.log('Tider från backend:', times);
      this.allAvailableTimes = times || [];
      console.log('Alla tider:', this.allAvailableTimes);
      this.isLoaded = true;
      const formattedEvents = this.formatEvents(times);

      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridWeek',
        locales: [svLocale],
        locale: 'sv',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: ''
        },
        selectable:true,
        weekends: true,
        events: formattedEvents,
        dateClick: this.onDateClick.bind(this)
      };
    });
  }

  getUpcomingDateForWeekday(weekday: string) : string {
    const weekdayMap: { [key: string]: number } = {
      'SÖN': 0, 'MÅN': 1, 'TIS': 2, 'ONS': 3, 'TOR': 4, 'FRE': 5, 'LÖR': 6,
    };

    const targetDay = weekdayMap[weekday.toUpperCase()];
    const today = new Date();
    const todayDay = today.getDay();

    const daysUntil = (targetDay - todayDay + 7) % 7;

    const resultDate = new Date(today);
    resultDate.setDate(today.getDate() + daysUntil);

    return resultDate.toISOString().split('T')[0];
  }

  onDateClick(arg: any) {
    if(!this.isLoaded){
      console.warn('Tider har inte laddats än.');
      return;
    }
    this.selectedDate = arg.dateStr;

    const clickadDate = new Date(arg.dateStr);
    const dayOfWeek = this.getSwedishDayOfWeek(clickadDate);
    console.log('Vald veckodag:', dayOfWeek);

    const match = this.allAvailableTimes.find(t => t.dayOfWeek === dayOfWeek.toUpperCase());
    console.log('Söker efter dag:', dayOfWeek.toUpperCase(), typeof dayOfWeek);

      this.selectedTimes = match ? match.times : [];

      console.log('matchhhh', match);

      console.log('Vald dag:', this.selectedDate, 'Tider:', this.selectedTimes);
  }

  getSwedishDayOfWeek(date: Date): string {
    const days = ['SÖN', 'MÅN', 'TIS', 'ONS', 'TOR', 'FRE', 'LÖR'];
    return days[date.getDay()];
  }

  
  formatEvents(data: DateTimeOption[]): any {
    const events: any [] = [];

    data.forEach((entry) => {
      const date = this.getUpcomingDateForWeekday(entry.dayOfWeek);
      entry.times.forEach((time) => {
        events.push({
          title: time,
          start: `${date}T${time}`,
          allDat: false
        });
      });
    });

    return events;
  }

  goToFinnishBooking(){
    console.log('Going to finnishBooking!');
    this.nextStep.emit();
  }
}
