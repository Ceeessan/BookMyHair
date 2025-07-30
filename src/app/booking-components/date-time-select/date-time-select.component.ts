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
import { ArrowButtonComponent } from '../../components/arrow-button/arrow-button.component';
import { BookingDataService } from '../services/booking-data.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-date-time-select',
  standalone: true,
  imports: [ CommonModule, FullCalendarModule, ButtonComponent, ArrowButtonComponent],
  templateUrl: './date-time-select.component.html',
  styleUrls: ['./date-time-select.component.scss']
})

export class DateTimeSelectComponent implements OnInit {
  @ViewChild(FullCalendarComponent) calendarComponent!: FullCalendarComponent;
  @Output() backStep = new EventEmitter<void>();

  selectedDate: string | null = null;
  selectedTimes: string[] = [];
  allAvailableTimes: DateTimeOption[] = [];
  isLoaded = false;
  selectedTime: string | null = null;
  bookedDates: string[] = [];
  bookedDateTimes: string[] = [];

  @Output() nextStep = new EventEmitter<any>();

  calendarOptions!: CalendarOptions;

  constructor( 
    private dateTimeService: DateTimeService,
    private bookingDataService: BookingDataService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridWeek'
    }

    this.dateTimeService.getAvailableTimes().subscribe((times) => {
      this.allAvailableTimes = times || [];
      this.isLoaded = true;

    this.bookingService.getBookedDates().subscribe((bookedTimes: string[]) => {
      
      this.bookedDateTimes = bookedTimes;
    });

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
      validRange: {
        start: new Date().toISOString().split('T')[0]
      },
      selectable:true,
      weekends: true,
      events: [],
      dateClick: this.onDateClick.bind(this),
      dayCellClassNames: (arg) => {
        const dateStr = arg.date.toISOString().split('T')[0];
        if (this.bookedDates.includes(dateStr)) {
          return ['booked-date'];
        }
        return [];
      }
    };
    this.onTodaysAppointment();
  });
}

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  goBack() {
    this.backStep.emit();
  }

  selectTime(time: string) {
    this.selectedTime = time;

    if(this.selectedDate) {
      const dateTime = `${this.selectedDate} ${time}`;
      this.bookingDataService.setTimeDate(dateTime);
    }
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
  
  private isSameDate(d1: Date, d2:Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  private loadAppointmentsForDate(date: Date) {
    const dayOfWeek = this.getSwedishDayOfWeek(date);
    const match = this.allAvailableTimes.find(t => t.dayOfWeek === dayOfWeek.toUpperCase());

    this.selectedDate = date.toISOString().split('T')[0];

    const currentTime = new Date();
    const isToday = this.isSameDate(date, currentTime);

    if(match) {
      this.selectedTimes = match.times.filter(timeStr => {
        if (!isToday) return true;

        if(isToday) {
          const [hours, minutes] = timeStr.split(':').map(Number);
          const timeAsDate = new Date(date);
          timeAsDate.setHours(hours,minutes, 0, 0);

          if (timeAsDate <= currentTime) return false;
        }

        const fullDateTime = `${this.selectedDate} ${timeStr}`;
        if(this.bookedDateTimes.includes(fullDateTime)) {
          return false;
        }
        return true;
      });
    } else {
      this.selectedTimes = [];
    }

    this.calendarOptions.events = [
      {
        title: '',
        start: this.selectedDate,
        allDay: true,
        display: 'background', 
        backgroundColor: '#40659c' 
      }
    ];
  }

  onTodaysAppointment() {
    if(!this.isLoaded){
      console.warn('Appointments is not acessible');
      return;
    }
    this.loadAppointmentsForDate(new Date());
  }

  onDateClick(arg: any) {
    if(!this.isLoaded){
      console.warn('Appointments did not load correctly.');
      return;
    }
    this.loadAppointmentsForDate(new Date(arg.dateStr))
  }

  getSwedishDayOfWeek(date: Date): string {
    const days = ['SÖN', 'MÅN', 'TIS', 'ONS', 'TOR', 'FRE', 'LÖR'];
    return days[date.getDay()];
  }

  goToFinnishBooking(){
    if(!this.selectedTime) return;
    this.nextStep.emit();
  }
}